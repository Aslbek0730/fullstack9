from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    SidebarItem, AIInteraction, SidebarLog, Course, Lesson, Test, Question, UserProgress, TestResult,
    Book, ForumQuestion, ForumAnswer, Notification, PaymentMethod, Transaction,
    TeacherProfile, TeacherDashboard, CourseAnalytics, UserRole
)

User = get_user_model()

class SidebarItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SidebarItem
        fields = ['label', 'route', 'icon']

class AIAssistantRequestSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    role = serializers.CharField(max_length=20)
    current_page = serializers.CharField(max_length=100)
    query = serializers.CharField()

class AIAssistantResponseSerializer(serializers.Serializer):
    reply = serializers.CharField()

class AIInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIInteraction
        fields = ['user', 'role', 'current_page', 'query', 'reply', 'created_at']
        read_only_fields = ['created_at']

class SidebarLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = SidebarLog
        fields = ['user', 'item', 'timestamp']
        read_only_fields = ['timestamp']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'text', 'options']

class TestSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True)

    class Meta:
        model = Test
        fields = ['id', 'title', 'description', 'time_limit', 'passing_score', 'course_title', 'questions']

class LessonSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = ['id', 'title', 'content', 'video_url', 'materials', 'order', 'course_title', 'is_completed']

    def get_is_completed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return UserProgress.objects.filter(
                user=request.user,
                lesson=obj,
                completed=True
            ).exists()
        return False

class CourseSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    lessons = LessonSerializer(many=True, read_only=True)
    tests = TestSerializer(many=True, read_only=True)
    progress = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'description', 'level', 'duration',
            'author_name', 'is_free', 'views', 'lessons', 'tests',
            'progress'
        ]

    def get_progress(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            completed_lessons = UserProgress.objects.filter(
                user=request.user,
                course=obj,
                completed=True
            ).count()
            total_lessons = obj.lessons.count()
            return int((completed_lessons / total_lessons * 100)) if total_lessons > 0 else 0
        return 0

class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProgress
        fields = ['id', 'lesson', 'completed', 'completed_at']
        read_only_fields = ['user', 'course']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        validated_data['course'] = validated_data['lesson'].course
        return super().create(validated_data)

class TestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestResult
        fields = ['id', 'test', 'score', 'completed_at', 'answers']
        read_only_fields = ['user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = [
            'id', 'title', 'author', 'description', 'category',
            'price_type', 'price', 'discount_price', 'cover_image',
            'views', 'created_at'
        ]
        read_only_fields = ['views', 'created_at']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            if instance.price_type == 'free' or request.user.has_purchased_book(instance):
                representation['pdf_file'] = request.build_absolute_uri(instance.pdf_file.url)
        return representation

class ForumAnswerSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = ForumAnswer
        fields = [
            'id', 'user', 'content', 'is_best_answer',
            'likes_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['user', 'likes_count', 'created_at', 'updated_at']

    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'username': obj.user.username,
            'full_name': obj.user.get_full_name()
        }

    def get_likes_count(self, obj):
        return obj.likes

class ForumQuestionSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    answers = ForumAnswerSerializer(many=True, read_only=True)
    answers_count = serializers.SerializerMethodField()

    class Meta:
        model = ForumQuestion
        fields = [
            'id', 'user', 'title', 'content', 'category',
            'tags', 'views', 'answers_count', 'answers',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['user', 'views', 'answers_count', 'created_at', 'updated_at']

    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'username': obj.user.username,
            'full_name': obj.user.get_full_name()
        }

    def get_answers_count(self, obj):
        return obj.answers.count()

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = [
            'id', 'notification_type', 'title',
            'message', 'is_read', 'created_at'
        ]
        read_only_fields = ['created_at']

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = [
            'id', 'payment_type', 'card_number',
            'card_expiry', 'is_default', 'created_at'
        ]
        read_only_fields = ['created_at']

    def validate_card_number(self, value):
        # Basic card number validation
        if not value.isdigit() or len(value) != 16:
            raise serializers.ValidationError("Invalid card number")
        return value

    def validate_card_expiry(self, value):
        # Basic expiry date validation (MM/YY format)
        try:
            month, year = value.split('/')
            if not (1 <= int(month) <= 12):
                raise serializers.ValidationError("Invalid month")
            if not (0 <= int(year) <= 99):
                raise serializers.ValidationError("Invalid year")
        except:
            raise serializers.ValidationError("Invalid expiry date format (MM/YY)")
        return value

class TransactionSerializer(serializers.ModelSerializer):
    payment_method = PaymentMethodSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = [
            'id', 'payment_method', 'amount', 'status',
            'description', 'transaction_id', 'created_at', 'updated_at'
        ]
        read_only_fields = ['status', 'transaction_id', 'created_at', 'updated_at']

    def create(self, validated_data):
        # Generate unique transaction ID
        validated_data['transaction_id'] = f"TRX{timezone.now().strftime('%Y%m%d%H%M%S')}{random.randint(1000, 9999)}"
        return super().create(validated_data)

class TeacherProfileSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    courses_count = serializers.SerializerMethodField()

    class Meta:
        model = TeacherProfile
        fields = [
            'id', 'user', 'bio', 'specialization',
            'experience', 'rating', 'is_verified',
            'courses_count', 'created_at'
        ]
        read_only_fields = ['rating', 'created_at']

    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'username': obj.user.username,
            'full_name': obj.user.get_full_name(),
            'email': obj.user.email
        }

    def get_courses_count(self, obj):
        return obj.user.courses.count()

class TeacherDashboardSerializer(serializers.ModelSerializer):
    teacher = TeacherProfileSerializer(read_only=True)
    recent_courses = serializers.SerializerMethodField()
    recent_students = serializers.SerializerMethodField()

    class Meta:
        model = TeacherDashboard
        fields = [
            'id', 'teacher', 'total_students', 'total_courses',
            'total_earnings', 'monthly_earnings', 'recent_courses',
            'recent_students', 'last_updated'
        ]
        read_only_fields = ['last_updated']

    def get_recent_courses(self, obj):
        courses = obj.teacher.user.courses.order_by('-created_at')[:5]
        return CourseSerializer(courses, many=True).data

    def get_recent_students(self, obj):
        # Get recent students from course enrollments
        recent_enrollments = UserProgress.objects.filter(
            course__author=obj.teacher.user
        ).order_by('-completed_at')[:5]
        return [
            {
                'id': enrollment.user.id,
                'username': enrollment.user.username,
                'full_name': enrollment.user.get_full_name(),
                'course': enrollment.course.title,
                'completed_at': enrollment.completed_at
            }
            for enrollment in recent_enrollments
        ]

class CourseAnalyticsSerializer(serializers.ModelSerializer):
    course = serializers.SerializerMethodField()
    recent_enrollments = serializers.SerializerMethodField()

    class Meta:
        model = CourseAnalytics
        fields = [
            'id', 'course', 'total_enrollments', 'completion_rate',
            'average_rating', 'total_revenue', 'recent_enrollments',
            'last_updated'
        ]
        read_only_fields = ['last_updated']

    def get_course(self, obj):
        return {
            'id': obj.course.id,
            'title': obj.course.title,
            'level': obj.course.level,
            'author': obj.course.author.get_full_name()
        }

    def get_recent_enrollments(self, obj):
        recent_progress = UserProgress.objects.filter(
            course=obj.course
        ).order_by('-completed_at')[:5]
        return [
            {
                'user': progress.user.get_full_name(),
                'completed': progress.completed,
                'completed_at': progress.completed_at
            }
            for progress in recent_progress
        ]

class UserRoleSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = UserRole
        fields = ['id', 'user', 'role', 'permissions', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'username': obj.user.username,
            'full_name': obj.user.get_full_name(),
            'email': obj.user.email
        } 
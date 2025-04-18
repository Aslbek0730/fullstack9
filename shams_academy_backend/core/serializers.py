from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Course, Lesson, Test, Question, Answer,
    Book, ForumPost, ForumComment, Payment, Notification
)

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 
                 'role', 'profile_picture', 'date_of_birth', 'age_level')
        read_only_fields = ('id', 'role')

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'confirm_password',
                 'first_name', 'last_name', 'date_of_birth', 'age_level')

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords don't match")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user

class CourseSerializer(serializers.ModelSerializer):
    teacher = UserSerializer(read_only=True)
    is_enrolled = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ('id', 'name', 'short_description', 'full_description',
                 'image', 'age_range', 'price', 'teacher', 'created_at',
                 'is_enrolled')

    def get_is_enrolled(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.payments.filter(user=request.user, status='success').exists()
        return False

class LessonSerializer(serializers.ModelSerializer):
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = ('id', 'name', 'description', 'video_url', 'course',
                 'order', 'is_completed')

    def get_is_completed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.completions.filter(user=request.user).exists()
        return False

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('id', 'text', 'is_correct')

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ('id', 'text', 'image', 'order', 'answers')

class TestSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Test
        fields = ('id', 'topic', 'course', 'created_at', 'questions')

class BookSerializer(serializers.ModelSerializer):
    is_accessible = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'cover', 'price_type',
                 'price', 'description', 'is_accessible')

    def get_is_accessible(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            if obj.price_type == 'free':
                return True
            return obj.payments.filter(user=request.user, status='success').exists()
        return False

class ForumCommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = ForumComment
        fields = ('id', 'post', 'author', 'text', 'created_at')
        read_only_fields = ('author', 'created_at')

class ForumPostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    comments = ForumCommentSerializer(many=True, read_only=True)
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = ForumPost
        fields = ('id', 'title', 'content', 'author', 'created_at',
                 'updated_at', 'comments', 'comment_count')
        read_only_fields = ('author', 'created_at', 'updated_at')

    def get_comment_count(self, obj):
        return obj.comments.count()

class PaymentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    course = CourseSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = ('id', 'user', 'course', 'payment_type', 'status',
                 'amount', 'payment_date')
        read_only_fields = ('user', 'status', 'payment_date')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('id', 'message_type', 'message', 'is_read', 'created_at')
        read_only_fields = ('created_at',) 
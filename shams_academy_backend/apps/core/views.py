from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets
from django.contrib.auth import get_user_model
from django.db.models import Q
from .models import SidebarItem, AIInteraction, Course, Lesson, Test, Question, UserProgress, TestResult, Book, ForumQuestion, ForumAnswer, Notification, PaymentMethod, Transaction, TeacherProfile, TeacherDashboard, CourseAnalytics, UserRole
from .serializers import (
    SidebarItemSerializer,
    AIAssistantRequestSerializer,
    AIAssistantResponseSerializer,
    AIInteractionSerializer,
    CourseSerializer,
    LessonSerializer,
    TestSerializer,
    UserProgressSerializer,
    TestResultSerializer,
    BookSerializer,
    ForumQuestionSerializer,
    ForumAnswerSerializer,
    NotificationSerializer,
    PaymentMethodSerializer,
    TransactionSerializer,
    TeacherProfileSerializer,
    TeacherDashboardSerializer,
    CourseAnalyticsSerializer,
    UserRoleSerializer
)
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action

User = get_user_model()

class SidebarMenuView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get user role from JWT token
        user_role = request.user.role  # Assuming role is stored in user model
        
        # Get sidebar items visible for the user's role
        sidebar_items = SidebarItem.objects.filter(roles_visible__contains=[user_role])
        
        # Serialize the items
        serializer = SidebarItemSerializer(sidebar_items, many=True)
        
        return Response(serializer.data)

class AIAssistantView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Validate request data
        request_serializer = AIAssistantRequestSerializer(data=request.data)
        if not request_serializer.is_valid():
            return Response(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Get validated data
        data = request_serializer.validated_data
        user_id = data['user_id']
        role = data['role']
        current_page = data['current_page']
        query = data['query']

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": "Foydalanuvchi topilmadi"},
                status=status.HTTP_404_NOT_FOUND
            )

        # TODO: Implement your AI logic here
        # This is a placeholder response
        reply = self._generate_ai_response(query, role, current_page)

        # Save the interaction
        interaction = AIInteraction.objects.create(
            user=user,
            role=role,
            current_page=current_page,
            query=query,
            reply=reply
        )

        # Return the response
        response_serializer = AIAssistantResponseSerializer({"reply": reply})
        return Response(response_serializer.data)

    def _generate_ai_response(self, query, role, current_page):
        # This is a placeholder function
        # Replace with your actual AI implementation
        if current_page == "library":
            return "Siz uchun 'Python Fundamentals' kitobi tavsiya etiladi. Bu kitob bepul."
        elif current_page == "courses":
            return "Siz uchun 'Dasturlash asoslari' kursi tavsiya etiladi."
        else:
            return "Kechirasiz, men bu so'rovingizga javob bera olmayman."

class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Course.objects.all()
        level = self.request.query_params.get('level', None)
        search = self.request.query_params.get('search', None)
        is_free = self.request.query_params.get('is_free', None)

        if level:
            queryset = queryset.filter(level=level)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search)
            )
        if is_free is not None:
            queryset = queryset.filter(is_free=is_free.lower() == 'true')
        
        return queryset

    @action(detail=True, methods=['post'])
    def mark_lesson_completed(self, request, pk=None):
        course = self.get_object()
        lesson_id = request.data.get('lesson_id')
        
        try:
            lesson = Lesson.objects.get(id=lesson_id, course=course)
            progress, created = UserProgress.objects.get_or_create(
                user=request.user,
                course=course,
                lesson=lesson,
                defaults={'completed': True}
            )
            if not created:
                progress.completed = True
                progress.save()
            return Response({'status': 'success'})
        except Lesson.DoesNotExist:
            return Response(
                {'error': 'Lesson not found'},
                status=status.HTTP_404_NOT_FOUND
            )

class LessonViewSet(viewsets.ModelViewSet):
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        course_id = self.request.query_params.get('course_id')
        if course_id:
            return Lesson.objects.filter(course_id=course_id).order_by('order')
        return Lesson.objects.none()

class TestViewSet(viewsets.ModelViewSet):
    serializer_class = TestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        course_id = self.request.query_params.get('course_id')
        if course_id:
            return Test.objects.filter(course_id=course_id)
        return Test.objects.none()

    @action(detail=True, methods=['post'])
    def submit_answers(self, request, pk=None):
        test = self.get_object()
        answers = request.data.get('answers', [])
        
        # Calculate score
        questions = Question.objects.filter(test=test)
        correct_answers = 0
        for question, answer in zip(questions, answers):
            if answer == question.correct_answer:
                correct_answers += 1
        
        score = int((correct_answers / questions.count()) * 100)
        
        # Save test result
        TestResult.objects.create(
            user=request.user,
            test=test,
            score=score,
            answers=answers
        )
        
        return Response({
            'score': score,
            'passed': score >= test.passing_score
        })

class UserProgressViewSet(viewsets.ModelViewSet):
    serializer_class = UserProgressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserProgress.objects.filter(user=self.request.user)

class TestResultViewSet(viewsets.ModelViewSet):
    serializer_class = TestResultSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TestResult.objects.filter(user=self.request.user)

class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Book.objects.all()
        category = self.request.query_params.get('category', None)
        price_type = self.request.query_params.get('price_type', None)
        search = self.request.query_params.get('search', None)

        if category:
            queryset = queryset.filter(category=category)
        if price_type:
            queryset = queryset.filter(price_type=price_type)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(author__icontains=search) |
                Q(description__icontains=search)
            )
        
        return queryset

    @action(detail=True, methods=['post'])
    def purchase(self, request, pk=None):
        book = self.get_object()
        if book.price_type == 'free':
            return Response(
                {'error': 'This book is free'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create transaction
        transaction = Transaction.objects.create(
            user=request.user,
            amount=book.discount_price if book.price_type == 'discounted' else book.price,
            description=f"Purchase of book: {book.title}",
            status='pending'
        )
        
        # TODO: Integrate with payment gateway (Payme/Click/Uzum)
        # For now, we'll just mark it as completed
        transaction.status = 'completed'
        transaction.save()
        
        return Response({
            'status': 'success',
            'transaction_id': transaction.transaction_id
        })

class ForumQuestionViewSet(viewsets.ModelViewSet):
    serializer_class = ForumQuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = ForumQuestion.objects.all()
        category = self.request.query_params.get('category', None)
        search = self.request.query_params.get('search', None)
        user = self.request.query_params.get('user', None)

        if category:
            queryset = queryset.filter(category=category)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(content__icontains=search)
            )
        if user:
            queryset = queryset.filter(user__username=user)
        
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def mark_best_answer(self, request, pk=None):
        question = self.get_object()
        answer_id = request.data.get('answer_id')
        
        try:
            answer = ForumAnswer.objects.get(id=answer_id, question=question)
            # Only the question owner can mark best answer
            if question.user != request.user:
                return Response(
                    {'error': 'Only the question owner can mark best answer'},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            # Unmark previous best answer if exists
            ForumAnswer.objects.filter(question=question, is_best_answer=True).update(is_best_answer=False)
            answer.is_best_answer = True
            answer.save()
            
            return Response({'status': 'success'})
        except ForumAnswer.DoesNotExist:
            return Response(
                {'error': 'Answer not found'},
                status=status.HTTP_404_NOT_FOUND
            )

class ForumAnswerViewSet(viewsets.ModelViewSet):
    serializer_class = ForumAnswerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        question_id = self.request.query_params.get('question_id')
        if question_id:
            return ForumAnswer.objects.filter(question_id=question_id)
        return ForumAnswer.objects.none()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        answer = self.get_object()
        answer.likes += 1
        answer.save()
        return Response({'status': 'success', 'likes': answer.likes})

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def mark_all_read(self, request):
        Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
        return Response({'status': 'success'})

class PaymentMethodViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentMethodSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PaymentMethod.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def set_default(self, request, pk=None):
        payment_method = self.get_object()
        PaymentMethod.objects.filter(user=request.user).update(is_default=False)
        payment_method.is_default = True
        payment_method.save()
        return Response({'status': 'success'})

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TeacherProfileViewSet(viewsets.ModelViewSet):
    serializer_class = TeacherProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TeacherProfile.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        profile = self.get_object()
        if not request.user.role.role == 'admin':
            return Response(
                {'error': 'Only admins can verify teachers'},
                status=status.HTTP_403_FORBIDDEN
            )
        profile.is_verified = True
        profile.save()
        return Response({'status': 'success'})

class TeacherDashboardViewSet(viewsets.ModelViewSet):
    serializer_class = TeacherDashboardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role.role == 'teacher':
            return TeacherDashboard.objects.filter(teacher__user=self.request.user)
        return TeacherDashboard.objects.none()

    @action(detail=True, methods=['get'])
    def analytics(self, request, pk=None):
        dashboard = self.get_object()
        analytics = CourseAnalytics.objects.filter(
            course__author=dashboard.teacher.user
        ).order_by('-last_updated')
        return Response(CourseAnalyticsSerializer(analytics, many=True).data)

class CourseAnalyticsViewSet(viewsets.ModelViewSet):
    serializer_class = CourseAnalyticsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role.role == 'teacher':
            return CourseAnalytics.objects.filter(
                course__author=self.request.user
            )
        return CourseAnalytics.objects.none()

    @action(detail=True, methods=['get'])
    def update_analytics(self, request, pk=None):
        analytics = self.get_object()
        # Update analytics data
        analytics.total_enrollments = UserProgress.objects.filter(
            course=analytics.course
        ).count()
        analytics.completion_rate = UserProgress.objects.filter(
            course=analytics.course,
            completed=True
        ).count() / analytics.total_enrollments if analytics.total_enrollments > 0 else 0
        analytics.save()
        return Response(self.get_serializer(analytics).data)

class UserRoleViewSet(viewsets.ModelViewSet):
    serializer_class = UserRoleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role.role == 'admin':
            return UserRole.objects.all()
        return UserRole.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        if not self.request.user.role.role == 'admin':
            return Response(
                {'error': 'Only admins can create roles'},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer.save()

    @action(detail=True, methods=['post'])
    def update_permissions(self, request, pk=None):
        role = self.get_object()
        if not request.user.role.role == 'admin':
            return Response(
                {'error': 'Only admins can update permissions'},
                status=status.HTTP_403_FORBIDDEN
            )
        permissions = request.data.get('permissions', [])
        role.permissions = permissions
        role.save()
        return Response({'status': 'success'}) 
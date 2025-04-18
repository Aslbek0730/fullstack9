from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SidebarItemViewSet, AIAssistantView,
    CourseViewSet, LessonViewSet, TestViewSet,
    UserProgressViewSet, TestResultViewSet,
    BookViewSet, ForumQuestionViewSet, ForumAnswerViewSet,
    NotificationViewSet, PaymentMethodViewSet, TransactionViewSet,
    TeacherProfileViewSet, TeacherDashboardViewSet,
    CourseAnalyticsViewSet, UserRoleViewSet
)

router = DefaultRouter()
router.register(r'sidebar-items', SidebarItemViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'lessons', LessonViewSet)
router.register(r'tests', TestViewSet)
router.register(r'progress', UserProgressViewSet)
router.register(r'test-results', TestResultViewSet)
router.register(r'books', BookViewSet)
router.register(r'forum-questions', ForumQuestionViewSet)
router.register(r'forum-answers', ForumAnswerViewSet)
router.register(r'notifications', NotificationViewSet)
router.register(r'payment-methods', PaymentMethodViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'teacher-profiles', TeacherProfileViewSet)
router.register(r'teacher-dashboards', TeacherDashboardViewSet)
router.register(r'course-analytics', CourseAnalyticsViewSet)
router.register(r'user-roles', UserRoleViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('ai-assistant/', AIAssistantView.as_view(), name='ai-assistant'),
] 
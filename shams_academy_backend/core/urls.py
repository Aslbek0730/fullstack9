from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, CourseViewSet, LessonViewSet, TestViewSet,
    BookViewSet, ForumPostViewSet, ForumCommentViewSet,
    PaymentViewSet, NotificationViewSet,
    UserRegistrationView, UserLoginView, UserProfileView,
    CourseListView, CourseDetailView, EnrollmentView,
    LessonDetailView, ProgressView, NotificationListView,
    NotificationDetailView, GoogleAuthView, FacebookAuthView
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'lessons', LessonViewSet)
router.register(r'tests', TestViewSet)
router.register(r'books', BookViewSet)
router.register(r'forum-posts', ForumPostViewSet)
router.register(r'forum-comments', ForumCommentViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'notifications', NotificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # Authentication
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    
    # Social Authentication
    path('auth/google/', GoogleAuthView.as_view(), name='google-auth'),
    path('auth/facebook/', FacebookAuthView.as_view(), name='facebook-auth'),
    
    # Courses
    path('courses/', CourseListView.as_view(), name='course-list'),
    path('courses/<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
    
    # Enrollment
    path('enroll/', EnrollmentView.as_view(), name='enroll'),
    
    # Lessons
    path('lessons/<int:pk>/', LessonDetailView.as_view(), name='lesson-detail'),
    
    # Progress
    path('progress/', ProgressView.as_view(), name='progress'),
    
    # Notifications
    path('notifications/', NotificationListView.as_view(), name='notification-list'),
    path('notifications/<int:pk>/', NotificationDetailView.as_view(), name='notification-detail'),
] 
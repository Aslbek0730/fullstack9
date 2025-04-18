from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from .models import User, Course, Test

@shared_task
def send_password_reset_email(user_id, reset_code):
    user = User.objects.get(id=user_id)
    subject = 'Password Reset Code - Shams Academy'
    message = f'''
    Hello {user.first_name},

    Your password reset code is: {reset_code}

    This code will expire in 1 hour.

    If you didn't request this reset, please ignore this email.

    Best regards,
    Shams Academy Team
    '''
    send_mail(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False,
    )

@shared_task
def send_welcome_email(user_id):
    user = User.objects.get(id=user_id)
    subject = 'Welcome to Shams Academy!'
    message = f'''
    Hello {user.first_name},

    Welcome to Shams Academy! We're excited to have you join our community of innovators and creators.

    Here's what you can do next:
    1. Complete your profile
    2. Browse our courses
    3. Join our forum discussions
    4. Start your learning journey

    If you have any questions, feel free to contact our support team.

    Best regards,
    Shams Academy Team
    '''
    send_mail(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False,
    )

@shared_task
def calculate_course_statistics():
    total_courses = Course.objects.count()
    total_users = User.objects.count()
    total_tests = Test.objects.count()
    
    if total_tests > 0:
        average_score = Test.objects.aggregate(avg_score=models.Avg('score'))['avg_score']
    else:
        average_score = 0
    
    return {
        'total_courses': total_courses,
        'total_users': total_users,
        'total_tests': total_tests,
        'average_score': average_score
    } 
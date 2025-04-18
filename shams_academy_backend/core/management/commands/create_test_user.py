from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Creates a test user for API testing'

    def handle(self, *args, **options):
        if not User.objects.filter(username='testuser').exists():
            User.objects.create_user(
                username='testuser',
                email='test@example.com',
                password='testpass123',
                first_name='Test',
                last_name='User',
                role='student'
            )
            self.stdout.write(self.style.SUCCESS('Test user created successfully'))
        else:
            self.stdout.write(self.style.WARNING('Test user already exists')) 
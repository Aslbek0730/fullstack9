from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Course, Lesson, Test, Book, ForumPost, Payment
import factory
from factory.django import DjangoModelFactory
import bcrypt

User = get_user_model()

class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
    
    username = factory.Sequence(lambda n: f'user{n}')
    email = factory.Sequence(lambda n: f'user{n}@example.com')
    password = factory.LazyFunction(lambda: bcrypt.hashpw('testpass123'.encode(), bcrypt.gensalt()).decode())
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    role = 'student'

class CourseFactory(DjangoModelFactory):
    class Meta:
        model = Course
    
    name = factory.Faker('sentence', nb_words=3)
    description = factory.Faker('text')
    price = factory.Faker('random_number', digits=3)
    teacher = factory.SubFactory(UserFactory)

class TestModel(TestCase):
    def setUp(self):
        self.user = UserFactory()
        self.course = CourseFactory(teacher=self.user)

    def test_user_creation(self):
        self.assertEqual(self.user.username, 'user0')
        self.assertTrue(bcrypt.checkpw('testpass123'.encode(), self.user.password.encode()))

    def test_course_creation(self):
        self.assertEqual(self.course.teacher, self.user)
        self.assertIsNotNone(self.course.name)
        self.assertIsNotNone(self.course.description)

class TestViews(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = UserFactory()
        self.course = CourseFactory(teacher=self.user)
        self.client.force_authenticate(user=self.user)

    def test_course_list(self):
        url = reverse('course-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_course_detail(self):
        url = reverse('course-detail', args=[self.course.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.course.name)

    def test_user_registration(self):
        url = reverse('user-register')
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'testpass123',
            'first_name': 'New',
            'last_name': 'User'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)

    def test_user_login(self):
        url = reverse('token_obtain_pair')
        data = {
            'username': self.user.username,
            'password': 'testpass123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

class TestPermissions(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.teacher = UserFactory(role='teacher')
        self.student = UserFactory(role='student')
        self.course = CourseFactory(teacher=self.teacher)

    def test_teacher_can_modify_course(self):
        self.client.force_authenticate(user=self.teacher)
        url = reverse('course-detail', args=[self.course.id])
        data = {'name': 'Updated Course Name'}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_student_cannot_modify_course(self):
        self.client.force_authenticate(user=self.student)
        url = reverse('course-detail', args=[self.course.id])
        data = {'name': 'Updated Course Name'}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class SidebarItem(models.Model):
    label = models.CharField(max_length=100, verbose_name="Menu nomi")
    route = models.CharField(max_length=100, verbose_name="URL manzili")
    icon = models.CharField(max_length=100, verbose_name="Ikon")
    roles_visible = ArrayField(
        models.CharField(max_length=20),
        verbose_name="Ko'rinadigan rollar"
    )
    order = models.IntegerField(default=0, verbose_name="Tartib raqami")

    class Meta:
        verbose_name = "Yon menyu elementi"
        verbose_name_plural = "Yon menyu elementlari"
        ordering = ['order']

    def __str__(self):
        return self.label

class AIInteraction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Foydalanuvchi")
    role = models.CharField(max_length=20, verbose_name="Rol")
    current_page = models.CharField(max_length=100, verbose_name="Joriy sahifa")
    query = models.TextField(verbose_name="So'rov")
    reply = models.TextField(verbose_name="Javob")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")

    class Meta:
        verbose_name = "AI interaksiyasi"
        verbose_name_plural = "AI interaksiyalari"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.created_at}"

class Course(models.Model):
    LEVEL_CHOICES = [
        ('beginner', 'Boshlang\'ich'),
        ('intermediate', 'O\'rta'),
        ('advanced', 'Yuqori'),
    ]

    title = models.CharField(max_length=200, verbose_name="Kurs nomi")
    description = models.TextField(verbose_name="Tavsif")
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, verbose_name="Daraja")
    duration = models.IntegerField(verbose_name="Davomiyligi (soat)")
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Muallif")
    is_free = models.BooleanField(default=False, verbose_name="Bepul")
    views = models.IntegerField(default=0, verbose_name="Ko'rishlar soni")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Yangilangan vaqt")

    class Meta:
        verbose_name = "Kurs"
        verbose_name_plural = "Kurslar"
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons', verbose_name="Kurs")
    title = models.CharField(max_length=200, verbose_name="Dars nomi")
    content = models.TextField(verbose_name="Mazmuni")
    video_url = models.URLField(verbose_name="Video manzili")
    materials = models.FileField(upload_to='materials/', null=True, blank=True, verbose_name="Qo'shimcha materiallar")
    order = models.IntegerField(verbose_name="Tartib raqami")

    class Meta:
        verbose_name = "Dars"
        verbose_name_plural = "Darslar"
        ordering = ['order']

    def __str__(self):
        return f"{self.course.title} - {self.title}"

class Test(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='tests', verbose_name="Kurs")
    title = models.CharField(max_length=200, verbose_name="Test nomi")
    description = models.TextField(verbose_name="Tavsif")
    time_limit = models.IntegerField(verbose_name="Vaqt chegarasi (daqiqa)")
    passing_score = models.IntegerField(verbose_name="O'tish balli")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")

    class Meta:
        verbose_name = "Test"
        verbose_name_plural = "Testlar"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.course.title} - {self.title}"

class Question(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name='questions', verbose_name="Test")
    text = models.TextField(verbose_name="Savol matni")
    options = ArrayField(models.CharField(max_length=200), verbose_name="Variantlar")
    correct_answer = models.IntegerField(verbose_name="To'g'ri javob indeksi")

    class Meta:
        verbose_name = "Savol"
        verbose_name_plural = "Savollar"

    def __str__(self):
        return self.text

class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Foydalanuvchi")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name="Kurs")
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, verbose_name="Dars")
    completed = models.BooleanField(default=False, verbose_name="Tugallangan")
    completed_at = models.DateTimeField(null=True, blank=True, verbose_name="Tugallangan vaqt")

    class Meta:
        verbose_name = "Foydalanuvchi progressi"
        verbose_name_plural = "Foydalanuvchi progresslari"
        unique_together = ['user', 'lesson']

    def __str__(self):
        return f"{self.user.username} - {self.lesson.title}"

class TestResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Foydalanuvchi")
    test = models.ForeignKey(Test, on_delete=models.CASCADE, verbose_name="Test")
    score = models.IntegerField(verbose_name="Ball")
    completed_at = models.DateTimeField(auto_now_add=True, verbose_name="Tugallangan vaqt")
    answers = models.JSONField(verbose_name="Javoblar")

    class Meta:
        verbose_name = "Test natijasi"
        verbose_name_plural = "Test natijalari"
        ordering = ['-completed_at']

    def __str__(self):
        return f"{self.user.username} - {self.test.title} - {self.score}%"

class Book(models.Model):
    CATEGORY_CHOICES = [
        ('programming', 'Dasturlash'),
        ('robotics', 'Robototexnika'),
        ('invention', 'Ixtirochilik'),
        ('mathematics', 'Matematika'),
    ]

    PRICE_TYPE_CHOICES = [
        ('free', 'Bepul'),
        ('paid', 'Pullik'),
        ('discounted', 'Chegirmali'),
    ]

    title = models.CharField(max_length=200, verbose_name="Kitob nomi")
    author = models.CharField(max_length=100, verbose_name="Muallif")
    description = models.TextField(verbose_name="Tavsif")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, verbose_name="Kategoriya")
    price_type = models.CharField(max_length=20, choices=PRICE_TYPE_CHOICES, verbose_name="Narx turi")
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name="Narx")
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name="Chegirma narxi")
    pdf_file = models.FileField(upload_to='books/', verbose_name="PDF fayl")
    cover_image = models.ImageField(upload_to='book_covers/', verbose_name="Muqova rasmi")
    views = models.IntegerField(default=0, verbose_name="Ko'rishlar soni")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")

    class Meta:
        verbose_name = "Kitob"
        verbose_name_plural = "Kitoblar"
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class ForumQuestion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Foydalanuvchi")
    title = models.CharField(max_length=200, verbose_name="Sarlavha")
    content = models.TextField(verbose_name="Mazmuni")
    category = models.CharField(max_length=50, verbose_name="Kategoriya")
    tags = ArrayField(models.CharField(max_length=50), blank=True, verbose_name="Teglar")
    views = models.IntegerField(default=0, verbose_name="Ko'rishlar soni")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Yangilangan vaqt")

    class Meta:
        verbose_name = "Forum savoli"
        verbose_name_plural = "Forum savollari"
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class ForumAnswer(models.Model):
    question = models.ForeignKey(ForumQuestion, on_delete=models.CASCADE, related_name='answers', verbose_name="Savol")
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Foydalanuvchi")
    content = models.TextField(verbose_name="Javob")
    is_best_answer = models.BooleanField(default=False, verbose_name="Eng yaxshi javob")
    likes = models.IntegerField(default=0, verbose_name="Layklar soni")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Yangilangan vaqt")

    class Meta:
        verbose_name = "Forum javobi"
        verbose_name_plural = "Forum javoblari"
        ordering = ['-is_best_answer', '-likes', 'created_at']

    def __str__(self):
        return f"{self.user.username} - {self.question.title}"

class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('course_registration', 'Kursga ro\'yxatdan o\'tish'),
        ('test_completion', 'Test yakunlanishi'),
        ('forum_answer', 'Forum javobi'),
        ('payment_success', 'To\'lov muvaffaqiyatli'),
        ('payment_failed', 'To\'lov muvaffaqiyatsiz'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Foydalanuvchi")
    notification_type = models.CharField(max_length=50, choices=NOTIFICATION_TYPES, verbose_name="Bildirishnoma turi")
    title = models.CharField(max_length=200, verbose_name="Sarlavha")
    message = models.TextField(verbose_name="Xabar")
    is_read = models.BooleanField(default=False, verbose_name="O'qilgan")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")

    class Meta:
        verbose_name = "Bildirishnoma"
        verbose_name_plural = "Bildirishnomalar"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.title}"

class PaymentMethod(models.Model):
    PAYMENT_TYPES = [
        ('payme', 'Payme'),
        ('click', 'Click'),
        ('uzum', 'Uzum'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Foydalanuvchi")
    payment_type = models.CharField(max_length=20, choices=PAYMENT_TYPES, verbose_name="To'lov turi")
    card_number = models.CharField(max_length=16, verbose_name="Karta raqami")
    card_expiry = models.CharField(max_length=5, verbose_name="Karta amal qilish muddati")
    is_default = models.BooleanField(default=False, verbose_name="Asosiy to'lov usuli")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")

    class Meta:
        verbose_name = "To'lov usuli"
        verbose_name_plural = "To'lov usullari"
        ordering = ['-is_default', '-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.payment_type}"

class Transaction(models.Model):
    TRANSACTION_STATUS = [
        ('pending', 'Kutilmoqda'),
        ('completed', 'Yakunlangan'),
        ('failed', 'Muvaffaqiyatsiz'),
        ('refunded', 'Qaytarilgan'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Foydalanuvchi")
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.SET_NULL, null=True, verbose_name="To'lov usuli")
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Summa")
    status = models.CharField(max_length=20, choices=TRANSACTION_STATUS, default='pending', verbose_name="Holat")
    description = models.TextField(verbose_name="Tavsif")
    transaction_id = models.CharField(max_length=100, unique=True, verbose_name="Tranzaksiya ID")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Yangilangan vaqt")

    class Meta:
        verbose_name = "Tranzaksiya"
        verbose_name_plural = "Tranzaksiyalar"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.amount} - {self.status}"

class TeacherProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='teacher_profile')
    bio = models.TextField(verbose_name="Biografiya")
    specialization = models.CharField(max_length=200, verbose_name="Mutaxassislik")
    experience = models.IntegerField(verbose_name="Tajriba (yil)")
    rating = models.FloatField(default=0.0, verbose_name="Reyting")
    is_verified = models.BooleanField(default=False, verbose_name="Tasdiqlangan")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")

    class Meta:
        verbose_name = "O'qituvchi profili"
        verbose_name_plural = "O'qituvchi profillari"

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.specialization}"

class TeacherDashboard(models.Model):
    teacher = models.ForeignKey(TeacherProfile, on_delete=models.CASCADE, related_name='dashboard')
    total_students = models.IntegerField(default=0, verbose_name="Jami o'quvchilar")
    total_courses = models.IntegerField(default=0, verbose_name="Jami kurslar")
    total_earnings = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Jami daromad")
    monthly_earnings = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Oylik daromad")
    last_updated = models.DateTimeField(auto_now=True, verbose_name="Oxirgi yangilanish")

    class Meta:
        verbose_name = "O'qituvchi paneli"
        verbose_name_plural = "O'qituvchi panellari"

    def __str__(self):
        return f"{self.teacher.user.get_full_name()} - Dashboard"

class CourseAnalytics(models.Model):
    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='analytics')
    total_enrollments = models.IntegerField(default=0, verbose_name="Jami ro'yxatdan o'tishlar")
    completion_rate = models.FloatField(default=0.0, verbose_name="Tugallash darajasi")
    average_rating = models.FloatField(default=0.0, verbose_name="O'rtacha reyting")
    total_revenue = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Jami daromad")
    last_updated = models.DateTimeField(auto_now=True, verbose_name="Oxirgi yangilanish")

    class Meta:
        verbose_name = "Kurs analitikasi"
        verbose_name_plural = "Kurs analitikalari"

    def __str__(self):
        return f"{self.course.title} - Analytics"

class UserRole(models.Model):
    ROLE_CHOICES = [
        ('student', 'O\'quvchi'),
        ('teacher', 'O\'qituvchi'),
        ('admin', 'Administrator'),
        ('moderator', 'Moderator'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='role')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, verbose_name="Rol")
    permissions = ArrayField(models.CharField(max_length=50), blank=True, verbose_name="Ruxsatlar")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Yangilangan vaqt")

    class Meta:
        verbose_name = "Foydalanuvchi roli"
        verbose_name_plural = "Foydalanuvchi rollari"

    def __str__(self):
        return f"{self.user.username} - {self.role}" 
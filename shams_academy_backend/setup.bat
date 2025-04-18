@echo off
echo Setting up Shams Academy Backend...

:: Remove existing virtual environment if it exists
if exist venv rmdir /s /q venv

:: Create and activate virtual environment
python -m venv venv
call venv\Scripts\activate

:: Upgrade pip and install setuptools
echo Upgrading pip and installing setuptools...
python -m pip install --upgrade pip
pip install --upgrade setuptools wheel

:: Install core dependencies first
echo Installing core dependencies...
pip install Django==4.2.7
pip install djangorestframework==3.14.0
pip install djangorestframework-simplejwt==5.3.0
pip install django-cors-headers==4.3.1

:: Install Celery and related packages
echo Installing Celery and related packages...
pip install celery==5.3.4
pip install redis==5.0.1
pip install django-celery-results==2.5.1
pip install django-celery-beat==2.5.0

:: Install other dependencies
echo Installing other dependencies...
pip install bcrypt==4.0.1
pip install Pillow==9.5.0
pip install python-dotenv==1.0.0
pip install pytest==7.4.3
pip install pytest-django==4.7.0
pip install factory-boy==3.3.0
pip install python-magic==0.4.27
pip install gunicorn==21.2.0
pip install whitenoise==6.6.0
pip install psycopg2-binary==2.9.9

:: Verify installation
echo Verifying installation...
python -c "import rest_framework; import django_celery_results; import pkg_resources" || (
    echo Failed to install required packages
    exit /b 1
)

:: Run migrations
echo Running migrations...
python manage.py makemigrations
python manage.py migrate

:: Create superuser
echo Creating superuser...
python manage.py createsuperuser

echo Setup complete!
echo To start the development server, run:
echo python manage.py runserver
echo 
echo To start Celery worker, run:
echo celery -A shams_academy_backend worker -l info
echo 
echo To start Celery beat, run:
echo celery -A shams_academy_backend beat -l info 
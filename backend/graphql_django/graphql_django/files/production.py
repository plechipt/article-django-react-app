import os

DOMAIN = 'article-django-react-app'

ALLOWED_HOSTS = [DOMAIN]

WSGI_APPLICATION = 'project_config.wsgi.prod.application'

#get the enviroment variables
EMAIL_BACKEND = 'django_smtp_ssl.SSLEmailBackend'
EMAIL_HOST = 'email-smtp.eu-central-1.amazonaws.com'
EMAIL_POST = 465    
EMAIL_HOST_USER = os.environ.get('AWS_SES_SMTP_USER')
EMAIL_HOST_PASSWORD = os.environ.get('AWS_SES_PASSWORD')
EMAIL_USE_SSL = True
DEFAULT_FROM_EMAIL = os.environ.get('SENDING_EMAIL')

SECRET_KEY = os.environ.get('SECRET_KEY')

#database
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2'
    }
}


import os

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

ALLOWED_HOSTS = [
    'article-django-react-app.herokuapp.com',
    '127.0.0.1:8000',
    '127.0.0.1',
    'localhost',
    'localhost:3000',
    'localhost:3001',
    'localhost:5000',
]


CORS_ALLOW_CREDENTIALS = True

# Allowed urls which can access API
CORS_ORIGIN_WHITELIST = (
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8000',
    'https://article-django-react-app.herokuapp.com',
)

WSGI_APPLICATION = 'graphql_django.wsgi.application'
ASGI_APPLICATION = "graphql_django.asgi.application"
ROOT_URLCONF = 'graphql_django.urls'

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
AUTH_USER_MODEL = 'users.CustomUser'

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True


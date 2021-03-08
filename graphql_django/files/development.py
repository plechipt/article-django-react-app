import os

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    'kubova-uzasna-socialni-sit.com',
]

CORS_ALLOW_CREDENTIALS = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

# Allowed urls which can access API
CORS_ORIGIN_WHITELIST = (
    'http://localhost',
    'http://127.0.0.1:8000',
    'https://kubova-uzasna-socialni-sit.com',
)

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


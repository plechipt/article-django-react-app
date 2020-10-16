import os


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators


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

#allow all websites to fetch api
#CORS_ORIGIN_ALLOW_ALL = True

#allowed urls which can access api
CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8000',
    'http://article-django-react-app.herokuapp.com',
    'https://article-django-react-app.herokuapp.com'
)

STATIC_URL = '/static/'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

#roots 
MEDIA_DIR = r'C:\Users\Admin\programs\django+react\tutorials\graphql_django\gui\src\components\Profiles'

MEDIA_ROOT = os.path.join(MEDIA_DIR, 'media')
MEDIA_URL = os.path.join(MEDIA_DIR, '/media/')

WSGI_APPLICATION = 'graphql_django.wsgi.application'
ROOT_URLCONF = 'graphql_django.urls'

#define few things
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
AUTH_USER_MODEL = 'users.CustomUser'

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True


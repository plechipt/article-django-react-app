import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAIN_DIR = r'C:\Users\Admin\programs\django+react\tutorials\graphql_django'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(MAIN_DIR, 'build')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
        'APP_DIRS': True,
    },
]

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

#allowed urls which can access api
CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
)


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/
STATIC_URL = '/static/'

#roots 
MEDIA_DIR = r'C:\Users\Admin\programs\django+react\tutorials\graphql_django\gui\src\components\Profiles'

MEDIA_ROOT = os.path.join(MEDIA_DIR, 'media')
MEDIA_URL = os.path.join(MEDIA_DIR, '/media/')

STATICFILES_DIRS = [
    os.path.join(MAIN_DIR, 'build/static')
]

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

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


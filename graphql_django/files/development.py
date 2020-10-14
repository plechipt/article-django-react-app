import os

MEDIA_DIR = r'C:\Users\Admin\programs\django+react\tutorials\graphql_django\gui\src\components\Profiles'
MAIN_DIR = r'C:\Users\Admin\programs\django+react\tutorials\graphql_django'

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators


#templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(MAIN_DIR, 'build'),
            os.path.join(MAIN_DIR, 'build/index.html'),
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
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8000',
    'https://article-django-react-app.herokuapp.com'
)

#roots 
MEDIA_ROOT = os.path.join(MEDIA_DIR, 'media')
MEDIA_URL = os.path.join(MEDIA_DIR, '/media/')

STATIC_ROOT = os.path.join(MAIN_DIR, 'staticfiles')
STATIC_URL = '/static/'
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


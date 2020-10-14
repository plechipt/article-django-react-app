import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

#STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
#STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

#database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

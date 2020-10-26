"""
Django settings for graphql_django project.

Generated by 'django-admin startproject' using Django 3.0.8.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""
import os
from graphql_django.files.basic import *
from graphql_django.files.development import *
from graphql_django.files.graphql import *

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SETTINGS_PATH = os.path.normpath(os.path.dirname(__file__))

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'fallback')

DEBUG = True

#database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD')
    }
}

#postgres://wtcvdvsvayavgs:f88113c3033ce9b119e343cf8dfaa88f198a383c9adc3e02a300021151bdd1ef@ec2-54-217-236-206.eu-west-1.compute.amazonaws.com:5432/dq74p9cqbnkuo
'''
Connect frontend on backend
'''

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'build'),
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


STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'build/static'),
]
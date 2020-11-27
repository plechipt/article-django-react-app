import os

ACCESS_TOKEN_SECRET = os.environ.get('REFRESH_TOKEN_SECRET')
REFRESH_TOKEN_SECRET = os.environ.get('REFRESH_TOKEN_SECRET')

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'accounts.authentication.SafeJWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated', # make all endpoints private
    )
}
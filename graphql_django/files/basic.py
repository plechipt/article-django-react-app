# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',

    'posts',
    'users',
    'payments',

    # Pip packages
    'django_extensions',
    'corsheaders',
    'stripe',
    'django_otp',
    'django_otp.plugins.otp_totp',

    # GraphQL
    'django_filters',
    'graphene_django',
    'graphql_auth',
    'graphql_jwt',
    'graphql_jwt.refresh_token.apps.RefreshTokenConfig',

    # Django REST framework 
    'rest_framework',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'corsheaders.middleware.CorsMiddleware', # Users can fetch api
    'django.contrib.auth.middleware.AuthenticationMiddleware', # User authentication
    'whitenoise.middleware.WhiteNoiseMiddleware', # Whitenoise
    "django_graphql_ratelimit.middleware.ParseClientIpMiddleware", # Django graphql ratelimit
    'django_otp.middleware.OTPMiddleware', # Two factor auth on django admin
]

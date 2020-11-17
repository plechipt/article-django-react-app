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

    'django_filters',
    'django_extensions',
    'corsheaders',
    'stripe',
    'django_otp',
    'django_otp.plugins.otp_totp',

    'graphene_django',
    'graphql_auth',
    'graphql_jwt.refresh_token.apps.RefreshTokenConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'corsheaders.middleware.CorsMiddleware', #users can fetch api
    'django.contrib.auth.middleware.AuthenticationMiddleware', #user authentication
    'whitenoise.middleware.WhiteNoiseMiddleware', #whitenoise
    "django_graphql_ratelimit.middleware.ParseClientIpMiddleware", #django graphql ratelimit
]

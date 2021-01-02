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

    # GraphQL
    'django_filters',
    'graphene_django',
    'graphql_jwt',
    'graphql_jwt.refresh_token.apps.RefreshTokenConfig',

    # Django REST framework 
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
]

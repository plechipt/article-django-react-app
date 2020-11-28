import os
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from users.models import CustomUser
from users.rest_framework import urls as user_urls
from .schema import schema


ADMIN_PATH = os.environ.get('ADMIN_PATH')

urlpatterns = [
    path(f'{ADMIN_PATH}/', admin.site.urls),
    path('auth/', include(user_urls)),
    path('graphql/', csrf_exempt(GraphQLView.as_view(schema=schema, graphiql=False))),
    re_path('.*', TemplateView.as_view(template_name='index.html'))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

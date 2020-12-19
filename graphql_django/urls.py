import os

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.core.exceptions import PermissionDenied
from django.http import HttpResponseForbidden
from django.urls import path, re_path
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from graphene_django.views import GraphQLView
from graphql_jwt.decorators import jwt_cookie
from users.models import CustomUser

from .schema import schema

ADMIN_PATH = os.environ.get('ADMIN_PATH')
API_KEY = os.environ.get('CUSTOM_API_KEY')

class CustomGraphQLView(GraphQLView):
    def dispatch(self, request, *args, **kwargs):
        res = super(CustomGraphQLView, self).dispatch(request, *args, **kwargs)
        
        # If Authorization is not passed to headers -> return 403
        try:
            passed_api_key = request.headers['Authorization']
        except:
            return HttpResponseForbidden()
        
        print(passed_api_key, API_KEY)
        # If passed API_KEY is incorrect -> return 403
        if API_KEY != passed_api_key:
            return HttpResponseForbidden()
        else:
            return res

urlpatterns = [
    path(f'{ADMIN_PATH}/', admin.site.urls),
    path('graphql/', jwt_cookie(CustomGraphQLView.as_view(schema=schema, graphiql=True))),
    re_path('.*', TemplateView.as_view(template_name='index.html'))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

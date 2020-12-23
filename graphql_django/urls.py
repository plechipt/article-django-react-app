import os

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.core.exceptions import PermissionDenied
from django.http import Http404, HttpResponseForbidden
from django.urls import path, re_path
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from graphene_django.views import GraphQLView
from graphql_jwt.decorators import jwt_cookie
from users.models import CustomUser

from . import settings
from .schema import schema

ADMIN_PATH = os.environ.get('ADMIN_PATH')
API_KEY = os.environ.get('REACT_APP_API_KEY')

local_base_url = 'http://127.0.0.1:8000'
local_base_url2 = 'http://localhost:3000'
heroku_base_url = 'https://article-django-react-app.herokuapp.com'

staff_urls = [
    f'{local_base_url}/graphql/', f'{local_base_url2}/graphql/', f'{heroku_base_url}/graphql/',
]

class CustomGraphQLView(GraphQLView):
    def dispatch(self, request, *args, **kwargs):
        def dispatch(self, request, *args, **kwargs):
        res = super(CustomGraphQLView, self).dispatch(request, *args, **kwargs)
        
        # If Authorization is not passed to headers -> return 403
        try:
            passed_api_key = request.headers['Authorization']
        except:
            return HttpResponseForbidden()
        
        # If passed API_KEY is incorrect -> return 403
        if API_KEY != passed_api_key:
            return HttpResponseForbidden()
        else:
            return ress


urlpatterns = [
    path(f'{ADMIN_PATH}/', admin.site.urls),
    path('graphql/', jwt_cookie(CustomGraphQLView.as_view(schema=schema, graphiql=False))),
    re_path('.*', TemplateView.as_view(template_name='index.html'))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

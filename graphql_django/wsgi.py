import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'graphql_django.settings')
<<<<<<< HEAD
=======

>>>>>>> 0ac49519c07141e0bb404d35721c7ae9c4b789bd
application = get_wsgi_application()

import os

from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'graphql_django.settings')
django_asgi_app = get_asgi_application()

# Import other Channels classes and consumers here.
from channels.routing import ProtocolTypeRouter, URLRouter

application = ProtocolTypeRouter({
    # Explicitly set 'http' key using Django's ASGI application.
    "http": django_asgi_app,
})

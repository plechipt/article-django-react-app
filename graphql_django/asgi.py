import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from django.urls import path
from graphene_subscriptions.consumers import GraphqlSubscriptionConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'graphql_django.settings')

application = ProtocolTypeRouter({
    #"http": get_asgi_application(),
    "websocket": URLRouter([
        path('graphql/', GraphqlSubscriptionConsumer)
    ]),
})

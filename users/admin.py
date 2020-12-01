import itertools
from django.contrib import admin
from django.apps import apps
from .models import CustomUser, Profile, Message, ChatRoom

models = [CustomUser, Profile, Message, ChatRoom]

for model in models:
    admin.site.register(model)
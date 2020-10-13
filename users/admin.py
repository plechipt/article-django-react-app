from django.contrib import admin
from .models import CustomUser, Profile, Message, ChatRoom


models = [CustomUser, Profile, Message, ChatRoom]

for model in models:
    admin.site.register(model)

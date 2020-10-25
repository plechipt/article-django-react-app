from django.contrib import admin
from .models import Post, Comment, Reply


models = [Post, Comment, Reply]

for model in models:
    admin.site.register(model)

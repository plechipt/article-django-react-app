from django.db.models.signals import post_delete, post_save
from graphene_subscriptions.signals import (post_delete_subscription,
                                            post_save_subscription)

from .models import Message

post_save.connect(post_save_subscription, sender=Message, dispatch_uid="message_post_save")
post_delete.connect(post_delete_subscription, sender=Message, dispatch_uid="message_post_delete")

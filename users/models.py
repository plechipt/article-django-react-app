from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    email = models.EmailField(blank=False, max_length=150, verbose_name="email address") 

    USERNAME_FIELD = "username"   
    EMAIL_FIELD = "email"        

class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    image = models.CharField(max_length=50, default="default.jpg", blank=True, null=True) 
    followers = models.ManyToManyField(CustomUser, related_name="following", blank=True)
    total_followers = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return f'{self.user.username} Profile'
    

class Message(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    messaged = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f'{self.user.username} - {self.content}'


class ChatRoom(models.Model):
    users = models.ManyToManyField(CustomUser)
    messages = models.ManyToManyField(Message, blank=True)

    def __str__(self):
        both_users = self.users.all()
        print(both_users)
        return f'{both_users[0]} and {both_users[1]} ChatRoom'

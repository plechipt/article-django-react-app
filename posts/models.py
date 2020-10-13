from django.db import models
from users.models import CustomUser
from django.utils import timezone


class Post(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField()
    posted = models.CharField(max_length=50, blank=True)
    likes = models.ManyToManyField(CustomUser, related_name="likes", blank=True)
    total_likes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-id']


class Comment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, null=True)
    content = models.TextField()
    posted = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.content + '  | ' + self.user.username

    class Meta:
        ordering = ['-id']


class Reply(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, blank=True, null=True)
    content = models.TextField()
    posted = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.content + '  | ' + self.user.username

    class Meta:
        verbose_name_plural = "Reply's"


    

import datetime

import graphene
from graphene_django.types import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required
from users.models import CustomUser

from posts.models import Post


class PostType(DjangoObjectType):
   class Meta:
      model = Post 


# Create post
class CreatePost(graphene.Mutation):
   class Arguments:
      user = graphene.String(required=True)
      title = graphene.String(required=True)
      content = graphene.String(required=True)
   
   post = graphene.Field(PostType)
   message = graphene.String()

   @staticmethod
   def mutate(root, info, user, title, content):
      message = ''
      user = CustomUser.objects.get(username=user)
      today = datetime.datetime.now().strftime('%d %B %Y')

      # Filter posts that belongs to user and are posted today
      filtered_posts = Post.objects.filter(user__username=user, posted=today)

      title_has_reached_limit_of_chars = len(title) > 100
      user_posted_maximum_posts = filtered_posts.count() >= 5
      content_has_reached_limit_of_chars = len(content) > 10000

      if title_has_reached_limit_of_chars and user_posted_maximum_posts:
         message = 'Title has more than 100 characters and you have reached your maximum posts per day!'

      elif title_has_reached_limit_of_chars:
         message = 'Title has more than 100 characters!'

      elif user_posted_maximum_posts:
         message = 'You have reached your maximum posts per day!'

      elif content_has_reached_limit_of_chars:
         message = 'Content is over 10,000 characters!'

      else:
         # Create date when was the post posted
         posted = datetime.datetime.now().strftime('%d %B %Y')
         post = Post(title=title, content=content, user=user, posted=posted)
         post.save()
         message = 'Success'

      return CreatePost(message=message)


# Delete post
class DeletePost(graphene.Mutation):
   class Arguments:
      id = graphene.ID(required=True)

   post = graphene.Field(PostType)

   @staticmethod
   def mutate(root, info, id):
      post = Post.objects.get(id=id)
      post.delete()

      return DeletePost(post=post)


# Edit post
class EditPost(graphene.Mutation):
   class Arguments:
      id = graphene.ID(required=True)
      title = graphene.String(required=True)
      content = graphene.String(required=True)

   post = graphene.Field(PostType)
   message = graphene.String()

   @staticmethod
   def mutate(root, info, id, title, content):
      message = ''

      title_has_reached_limit_of_chars = len(title) > 100
      content_has_reached_limit_of_chars = len(content) > 10000
      post_doesnt_exist = Post.objects.filter(id=id).count() != 0

      if title_has_reached_limit_of_chars:
         raise GraphQLError('Title has more than 100 characters!')

      elif content_has_reached_limit_of_chars:
         raise GraphQLError('Content is over 10,000 characters!')

      # Success
      else:
         message = 'Success'
         post = Post.objects.get(id=id)

         post.title = title
         post.content = content
         post.save()

      return EditPost(message=message)

  


# Like post
class LikePost(graphene.Mutation):
   class Arguments:
      id = graphene.ID(required=True)
      user = graphene.String(required=True)

   post = graphene.Field(PostType)

   @staticmethod
   def mutate(root, info, id, user):
      post = Post.objects.get(id=id)
      user = CustomUser.objects.get(username=user)
      
      # Add user to the post likes
      post.likes.add(user)

      # Count amount of likes in post
      total_likes = post.likes.all().count()

      # Save the new total_likes to post
      post.total_likes = total_likes
      post.save()

      return LikePost(post=post)


# Unlike post
class UnlikePost(graphene.Mutation):
   class Arguments:
      id = graphene.ID(required=True)
      user = graphene.String(required=True)

   message = graphene.String()

   @staticmethod
   def mutate(root, info, id, user):
      message = 'Success'
      post = Post.objects.get(id=id)
      user = CustomUser.objects.get(username=user)
      
      # Remove user from likes
      post.likes.remove(user)

      # Count the post all likes
      total_likes = post.likes.all().count()

      # Save the new total_likes to post
      post.total_likes = total_likes
      post.save()

      return UnlikePost(message=message)

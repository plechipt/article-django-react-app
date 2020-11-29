import graphene
import datetime
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required

from .models import Post 
from users.models import CustomUser


class PostType(DjangoObjectType):
   class Meta:
      model = Post 


# Find post
class PostDetailInput(graphene.InputObjectType):
   id = graphene.ID()


class FindPost(graphene.Mutation):
   class Arguments:
      input = PostDetailInput(required=True)
   
   post = graphene.Field(PostType)
   message = graphene.String()

   @staticmethod
   @login_required
   def mutate(root, info, input=None):
      message = ''

      post_exist = Post.objects.filter(id=input.id).count() != 0

      if post_exist:
         message = 'Success'
         post = Post.objects.get(id=input.id)
         return FindPost(post=post, message=message)

      else:
         message = "ID doesn't match with post"
         return FindPost(message=message)
      

# Create post
class PostCreateInput(graphene.InputObjectType):
   user = graphene.String()
   title = graphene.String()
   content = graphene.String()


class AddPost(graphene.Mutation):
   class Arguments:
      input = PostCreateInput(required=True)
   
   post = graphene.Field(PostType)
   message = graphene.String()

   @staticmethod
   @login_required
   def mutate(root, info, input=None):
      message = ''
      user = CustomUser.objects.get(username=input.user)
      today = datetime.datetime.now().strftime('%d %B %Y')

      # Filter posts that belongs to user and are posted today
      filtered_posts = Post.objects.filter(user__username=input.user, posted=today)

      title_has_reached_limit_of_chars = len(input.title) > 100
      user_posted_maximum_posts = filtered_posts.count() >= 5
      content_has_reached_limit_of_chars = len(input.content) > 10000

      if title_has_reached_limit_of_chars and user_posted_maximum_posts:
         message += 'Title has more than 100 characters and you have reached your maximum posts per day!'
         return AddPost(message=message)

      elif title_has_reached_limit_of_chars:
         message = 'Title has more than 100 characters!'
         return AddPost(message=message)

      elif user_posted_maximum_posts:
         message += 'You have reached your maximum posts per day!'
         return AddPost(message=message)

      elif content_has_reached_limit_of_chars:
         message = 'Content is over 10,000 characters!'
         return EditPost(message=message)

      # Create date when was the post posted
      posted = datetime.datetime.now().strftime('%d %B %Y')
      post = Post(title=input.title, content=input.content, user=user, posted=posted)
      post.save()

      message = 'Success'
      return AddPost(post=post, message="Success")


# Delete post
class PostDeleteInput(graphene.InputObjectType):
   id = graphene.ID()


class DeletePost(graphene.Mutation):
   class Arguments:
      input = PostDeleteInput(required=True)

   post = graphene.Field(PostType)

   @staticmethod
   @login_required
   def mutate(root, info, input=None):
      post = Post.objects.get(id=input.id)
      post.delete()

      return DeletePost(post=post)


# Edit post
class PostEditInput(graphene.InputObjectType):
   id = graphene.ID()
   title = graphene.String()
   content = graphene.String()


class EditPost(graphene.Mutation):
   class Arguments:
      input = PostEditInput(required=True)

   post = graphene.Field(PostType)
   message = graphene.String()

   @staticmethod
   @login_required
   def mutate(root, info, input=None):
      message = ''

      title_has_reached_limit_of_chars = len(input.title) > 100
      content_has_reached_limit_of_chars = len(input.content) > 10000
      post_doesnt_exist = Post.objects.filter(id=input.id).count() != 0

      if title_has_reached_limit_of_chars:
         message = 'Title has more than 100 characters!'
         return EditPost(message=message)

      elif content_has_reached_limit_of_chars:
         message = 'Content is over 10,000 characters!'
         return EditPost(message=message)

      # Success
      elif post_doesnt_exist:
         message = 'Success'
         post = Post.objects.get(id=input.id)

         post.title = input.title
         post.content = input.content
         post.save()

         return EditPost(message=message, post=post)

      # Id doesnt match with post      
      else:
         message = "ID doesn't match with post"
         return EditPost(message=message)


# Like post
class LikePostInput(graphene.InputObjectType):
   id = graphene.ID()
   user = graphene.String()


class LikePost(graphene.Mutation):
   class Arguments:
      input = LikePostInput(required=True)

   post = graphene.Field(PostType)

   @staticmethod
   @login_required
   def mutate(root, info, input=None):
      post = Post.objects.get(id=input.id)
      user = CustomUser.objects.get(username=input.user)
      
      # Add user to the post likes
      post.likes.add(user)

      # Count amount of likes in post
      total_likes = post.likes.all().count()

      # Save the new total_likes to post
      post.total_likes = total_likes
      post.save()

      return LikePost(post=post)


# Unlike post
class UnlikePostInput(graphene.InputObjectType):
   id = graphene.ID()
   user = graphene.String()


class UnlikePost(graphene.Mutation):
   class Arguments:
      input = UnlikePostInput(required=True)

   message = graphene.String()

   @staticmethod
   @login_required
   def mutate(root, info, input=None):
      message = 'Success'
      post = Post.objects.get(id=input.id)
      user = CustomUser.objects.get(username=input.user)
      
      # Remove user from likes
      post.likes.remove(user)

      # Count the post all likes
      total_likes = post.likes.all().count()

      # Save the new total_likes to post
      post.total_likes = total_likes
      post.save()

      return UnlikePost(message=message)


# Filter post (filter by search bar)
class PostFilterInput(graphene.InputObjectType):
   title = graphene.String()


class FilterPost(graphene.Mutation):
   class Arguments:
      input = PostFilterInput(required=True)

   filtered_posts = graphene.List(PostType)

   @staticmethod
   @login_required
   def mutate(root, info, input=None):
      # Filter post that starts with input in search bar
      filtered_posts = Post.objects.filter(title__startswith=input.title)
      
      return FilterPost(filtered_posts=filtered_posts)

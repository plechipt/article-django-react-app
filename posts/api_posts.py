import graphene
import datetime
from graphene_django.types import DjangoObjectType

from .models import Post 
from users.models import CustomUser


class PostType(DjangoObjectType):
   class Meta:
      model = Post 


#Find post
class PostDetailInput(graphene.InputObjectType):
   id = graphene.ID()


class FindPost(graphene.Mutation):
   class Arguments:
      input = PostDetailInput(required=True)
   
   post = graphene.Field(PostType)
   message = graphene.String()

   @staticmethod
   def mutate(root, info, input=None):
      message = ''

      if Post.objects.filter(id=input.id).count() != 0:
         message = 'Success'
         post = Post.objects.get(id=input.id)
         return FindPost(post=post, message=message)

      else:
         message = "ID doesn't match with post"
         return FindPost(message=message)
      

#Create post
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
   def mutate(root, info, input=None):
      message = ''
      user = CustomUser.objects.get(username=input.user)
      today = datetime.datetime.now().strftime('%d %B %Y')

      #filter posts that belongs to user and are posted today
      filtered_posts = Post.objects.filter(user__username=input.user, posted=today)

      #if boths problems
      if len(input.title) > 100 and filtered_posts.count() > 4:
         message += 'Title has more than 100 characters and you have reached your maximum posts per day!'
         return AddPost(message=message)

      #check if title is under 100 chars
      elif len(input.title) > 100:
         message = 'Title has more than 100 characters '
         return AddPost(message=message)

      #check if user hasn't reached more than 5 posts per day
      elif filtered_posts.count() > 4:
         message += 'You have reached your maximum posts per day!'
         return AddPost(message=message)

      #create date when was the post posted
      posted = datetime.datetime.now().strftime('%d %B %Y')
      post = Post(title=input.title, content=input.content, user=user, posted=posted)
      post.save()

      message = 'Success'
      return AddPost(post=post, message="Success")


#Delete post
class PostDeleteInput(graphene.InputObjectType):
   id = graphene.ID()


class DeletePost(graphene.Mutation):
   class Arguments:
      input = PostDeleteInput(required=True)

   post = graphene.Field(PostType)

   @staticmethod
   def mutate(root, info, input=None):
      post = Post.objects.get(id=input.id)
      post.delete()

      return DeletePost(post=post)


#Edit post
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
   def mutate(root, info, input=None):
      message = ''

      if Post.objects.filter(id=input.id).count() != 0:
         message = 'Success'
         post = Post.objects.get(id=input.id)

         post.title = input.title
         post.content = input.content
         post.save()

         return EditPost(message=message, post=post)
      
      else:
         message = "ID doesn't match with post"
         return EditPost(message=message)


#Like post
class LikePostInput(graphene.InputObjectType):
   id = graphene.ID()
   user = graphene.String()


class LikePost(graphene.Mutation):
   class Arguments:
      input = LikePostInput(required=True)

   post = graphene.Field(PostType)

   @staticmethod
   def mutate(root, info, input=None):
      post = Post.objects.get(id=input.id)
      user = CustomUser.objects.get(username=input.user)
      
      #add user to the post likes
      post.likes.add(user)

      #count the post all likes
      total_likes = post.likes.all().count()

      #save the new total_likes to post
      post.total_likes = total_likes
      post.save()

      return LikePost(post=post)


#Unlike post
class UnlikePostInput(graphene.InputObjectType):
   id = graphene.ID()
   user = graphene.String()


class UnlikePost(graphene.Mutation):
   class Arguments:
      input = UnlikePostInput(required=True)

   message = graphene.String()

   @staticmethod
   def mutate(root, info, input=None):
      message = 'Success'
      post = Post.objects.get(id=input.id)
      user = CustomUser.objects.get(username=input.user)
      
      #remove user from likes
      post.likes.remove(user)

      #count the post all likes
      total_likes = post.likes.all().count()

      #save the new total_likes to post
      post.total_likes = total_likes
      post.save()

      return UnlikePost(message=message)


#Filter post (filter by search bar)
class PostFilterInput(graphene.InputObjectType):
   title = graphene.String()


class FilterPost(graphene.Mutation):
   class Arguments:
      input = PostFilterInput(required=True)

   filtered_posts = graphene.List(PostType)

   @staticmethod
   def mutate(root, info, input=None):
      #filter post that starts with input in search bar
      filtered_posts = Post.objects.filter(title__startswith=input.title)

      return FilterPost(filtered_posts=filtered_posts)

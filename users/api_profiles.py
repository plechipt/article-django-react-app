import graphene
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required

from .models import CustomUser, Profile
from .api_messages import CustomUserType

class ProfileType(DjangoObjectType):
   class Meta:
      model = Profile


# Get profile info 
class ProfileInfoInput(graphene.InputObjectType):
   user = graphene.String()


class ProfileInfo(graphene.Mutation):
   class Arguments:
      input = ProfileInfoInput(required=True)
      
   profile = graphene.Field(ProfileType)
   message = graphene.String()

   @staticmethod
   @login_required
   def mutate(root, info, input=None):
      message = ''

      users_profile_exists = CustomUser.objects.filter(username=input.user).count() != 0

      if users_profile_exists:
         message = 'Success'
         user = CustomUser.objects.get(username=input.user)
         profile = Profile.objects.get(user=user)

         return ProfileInfo(profile=profile, message=message)
      
      else: 
         message = "This profile doesn't exist"
         return ProfileInfo(message=message)



# Check if user has already profile
class CheckUserProfileInput(graphene.InputObjectType):
   user = graphene.String()


class CheckUserProfile(graphene.Mutation):
   class Arguments:
      input = CheckUserProfileInput(required=True)
      
   profile = graphene.Field(ProfileType)

   @staticmethod
   def mutate(root, info, input=None):
      user = CustomUser.objects.get(username=input.user)

      # Try if users profile exists
      try:
         Profile.objects.get(user=user)
        
      # Except to create new profile
      except:
         profile = Profile.objects.create(user=user)
         profile.save()

         return CheckUserProfile(profile=profile)


# Update the profile by given inputs on frontend
class UpdateUserInput(graphene.InputObjectType):
   user = graphene.String()
   new_user = graphene.String()
   new_email = graphene.String()
   image = graphene.String()


class UpdateUser(graphene.Mutation):
   class Arguments:
      input = UpdateUserInput(required=True)

   message = graphene.String()

   @staticmethod
   @login_required
   def mutate(root, info, input=None):
      message = ''

      # New_user and new_email combined
      new_user_and_new_email = input.new_user + input.new_email
      forbidden_chars = [
         '!','#','$','%','^','&','*','(',')','`','/',',',';','[',']',
         '+','-','>','<','=','\\','*','+','{','}',':','"','|','?'
      ]

      user = CustomUser.objects.get(username=input.user)
      profile = Profile.objects.get(user=user)

      user_already_exists = CustomUser.objects.filter(username=input.new_user).exists()
      email_already_exists = CustomUser.objects.filter(email=input.new_email).exists()

      nothing_was_changed = user.username == input.new_user and user.email == input.new_email and input.image == None
      this_name_already_exists = user_already_exists == True and user.username != input.new_user
      this_email_already_exists = email_already_exists == True and user.email != input.new_email

      fields_include_forbidden_characters = [char for char in forbidden_chars if char in new_user_and_new_email] == []
      email_include_only_one_at_sign = input.new_email.count('@') > 1
      fields_doesnt_include_special_characters = '@' in input.new_user or '.' in input.new_user

      if nothing_was_changed:
         message = 'You need to change your username or email or image in order to update your profile!'

      elif this_name_already_exists:
         message = 'This name is already taken!'

      elif this_email_already_exists:
         message = 'This email already exists!'

      elif (fields_include_forbidden_characters == False or 
      email_include_only_one_at_sign or fields_doesnt_include_special_characters):
         message = 'Name or email must not include special characters!'

      # If new_user has reached more than 40 chars
      elif len(input.new_user) >= 40:
         message = 'Your new name has reached maximum of characters! (40 characters)'

      # If new_email has reached more than 50 chars
      elif len(input.new_email) >= 50:
         message = 'Your new email has reached maximum of characters! (50 characters)'

      else:
         message = 'Success'
         user.username = input.new_user
         user.email = input.new_email

         user_selected_image = input.image != None 

         if user_selected_image:
            profile.image = input.image

         user.save()
         profile.save()


      return UpdateUser(message=message)


# Follow user profile
class FollowProfileInput(graphene.InputObjectType):
   follower = graphene.String()
   following = graphene.String()


class FollowProfile(graphene.Mutation):
   class Arguments:
      input = FollowProfileInput(required=True)
      
   message = graphene.String()

   @staticmethod
   @login_required
   def mutate(root, info, input=None):
      message = ''

      # Follower 
      follower = CustomUser.objects.get(username=input.follower)

      # Following
      following = CustomUser.objects.get(username=input.following)
      following_profile = Profile.objects.get(user=following)

      if follower == following:
         message = 'You cannot follow yourself!'

      else:
         message = 'Success!'

         # Add the user to profile followers
         following_profile.followers.add(follower)

         # Count how many followers has the following user
         total_followers = following_profile.followers.all().count()

         # Set the followers to followers total_followers
         following_profile.total_followers = total_followers
         
         # Save the following users profile 
         following_profile.save()

      return FollowProfile(message=message)


# Unfollow user profile
class UnfollowProfileInput(graphene.InputObjectType):
   follower = graphene.String()
   following = graphene.String()


class UnfollowProfile(graphene.Mutation):
   class Arguments:
      input = UnfollowProfileInput(required=True)
      
   message = graphene.String()

   @staticmethod
   @login_required
   def mutate(root, info, input=None):
      message = ''
      follower = CustomUser.objects.get(username=input.follower)

      following = CustomUser.objects.get(username=input.following)
      following_profile = Profile.objects.get(user=following)

      # Remove follower from followers
      following_profile.followers.remove(follower)

      # Count the total_followers of follower
      total_followers = following_profile.followers.all().count()

      # Save it to total_followers
      following_profile.total_followers = total_followers
      following_profile.save()

      return UnfollowProfile(message=message)
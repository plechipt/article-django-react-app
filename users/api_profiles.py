import graphene
from graphene_django.types import DjangoObjectType

from .models import CustomUser, Profile
from .api_messages import CustomUserType

class ProfileType(DjangoObjectType):
   class Meta:
      model = Profile


#Get profile info 
class ProfileInfoInput(graphene.InputObjectType):
   user = graphene.String()


class ProfileInfo(graphene.Mutation):
   class Arguments:
      input = ProfileInfoInput(required=True)
      
   profile = graphene.Field(ProfileType)
   message = graphene.String()

   @staticmethod
   def mutate(root, info, input=None):
      message = ''

      if CustomUser.objects.filter(username=input.user).count() != 0:
         message = 'Success'
         user = CustomUser.objects.get(username=input.user)
         profile = Profile.objects.get(user=user)

         return ProfileInfo(profile=profile, message=message)
      
      else: 
         message = "This profile doesn't exist"
         return ProfileInfo(message=message)



#Check if user has already profile
class CheckUserProfileInput(graphene.InputObjectType):
   user = graphene.String()


class CheckUserProfile(graphene.Mutation):
   class Arguments:
      input = CheckUserProfileInput(required=True)
      
   profile = graphene.Field(ProfileType)

   @staticmethod
   def mutate(root, info, input=None):
      user = CustomUser.objects.get(username=input.user)

      #try if users profile exists
      try:
        Profile.objects.get(user=user)
        
      #except to create new profile
      except:
        profile = Profile.objects.create(user=user)
        profile.save()

        return CheckUserProfile(profile=profile)


#Update the profile by given inputs on frontend
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
   def mutate(root, info, input=None):
      message = ''

      #new_user and new_email combined
      new_user_and_new_email = input.new_user + input.new_email
      forbidden_chars = [
         '!','#','$','%','^','&','*','(',')','`','/',',',';','[',']',
         '+','-','>','<','=','\\','*','+','{','}',':','"','|','?'
      ]

      user = CustomUser.objects.get(username=input.user)
      profile = Profile.objects.get(user=user)

      #check if new_user already exists
      user_already_exists = CustomUser.objects.filter(username=input.new_user).exists()

      #check if new_email already exists
      email_already_exists = CustomUser.objects.filter(email=input.new_email).exists()

      #if nothing was updated
      if user.username == input.new_user and user.email == input.new_email and input.image == 'none':
         message = 'You need to change your username or email or image in order to update your profile!'

      #if new_user already exists and users name !== new_user
      elif user_already_exists == True and user.username != input.new_user:
         message = 'This name is already taken!'

      #if new_email already exists and users emails !== new_email
      elif email_already_exists == True and user.email != input.new_email:
         message = 'This email already exists!'

      #if new_user or new_email includes forbidden characters from forbidden_chars variable
      elif (([char for char in forbidden_chars if char in new_user_and_new_email] == []) != True or
      input.new_email.count('@') > 1 or '@' in input.new_user or '.' in input.new_user):
         message = 'Name or email must not include special characters!'

      #if new_user has reached more than 40 chars
      elif len(input.new_user) >= 40:
         message = 'Your new name has reached maximum of characters! (40 characters)'

      #if new_email has reached more than 50 chars
      elif len(input.new_email) >= 50:
         message = 'Your new email has reached maximum of characters! (50 characters)'

      else:
         message = 'Success'
         user.username = input.new_user
         user.email = input.new_email

         #if image was chosen
         if input.image != 'none':
            profile.image = input.image

         user.save()
         profile.save()


      return UpdateUser(message=message)


#follow user profile
class FollowProfileInput(graphene.InputObjectType):
   follower = graphene.String()
   following = graphene.String()


class FollowProfile(graphene.Mutation):
   class Arguments:
      input = FollowProfileInput(required=True)
      
   message = graphene.String()

   @staticmethod
   def mutate(root, info, input=None):
      message = ''

      #follower 
      follower = CustomUser.objects.get(username=input.follower)

      #following
      following = CustomUser.objects.get(username=input.following)
      following_profile = Profile.objects.get(user=following)

      if follower == following:
         message = 'You cannot follow yourself!'

      else:
         message = 'Success!'

         #add the user to profile followers
         following_profile.followers.add(follower)

         #count how many followers has the following user
         total_followers = following_profile.followers.all().count()

         #set the followers to followers total_followers
         following_profile.total_followers = total_followers
         
         #save the following users profile 
         following_profile.save()

      return FollowProfile(message=message)


#unfollow user profile
class UnfollowProfileInput(graphene.InputObjectType):
   follower = graphene.String()
   following = graphene.String()


class UnfollowProfile(graphene.Mutation):
   class Arguments:
      input = UnfollowProfileInput(required=True)
      
   message = graphene.String()

   @staticmethod
   def mutate(root, info, input=None):
      message = ''
      follower = CustomUser.objects.get(username=input.follower)

      following = CustomUser.objects.get(username=input.following)
      following_profile = Profile.objects.get(user=following)

      #remove follower from followers
      following_profile.followers.remove(follower)

      #count the total_followers of follower
      total_followers = following_profile.followers.all().count()

      #save it to total_followers
      following_profile.total_followers = total_followers
      following_profile.save()

      return UnfollowProfile(message=message)
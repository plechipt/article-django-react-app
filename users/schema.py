import json
from http.cookies import SimpleCookie

from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from .mutations.messages import *
from .mutations.profiles import *
from .mutations.users import *
from .subscriptions.messages import *


class UserSubscription(MessageSubscription):
    pass


class UserMutation(AuthMutation):
    # Messages
    create_message = CreateMessage.Field()
    create_chat_room = CreateChatRoom.Field()

    # Profiles
    create_user_profile = CreateUserProfile.Field()
    update_profile = UpdateProfile.Field()
    follow_profile = FollowProfile.Field()
    unfollow_profile = UnfollowProfile.Field()


class UserQuery:
    me = graphene.Field(CustomUserType)
    all_users = graphene.List(CustomUserType)
    all_profiles = graphene.List(ProfileType)

    chat_room_messages = graphene.List(
        MessageType,
        chat_user=graphene.String(required=True)
    )

    get_profile_info = graphene.Field(
        ProfileType,
        user=graphene.String(required=True)
    )
    

    def resolve_chat_room_messages(self, info, chat_user):
        chat_rooms = ChatRoom.objects.all()

        chat_user_doesnt_exist = CustomUser.objects.filter(username=chat_user).count() == 0

        if chat_user_doesnt_exist:
            raise GraphQLError("Chat user doesn't exist!")

        # Get users
        user = info.context.user
        chat_user = CustomUser.objects.get(username=chat_user)

        # Get messages
        user_chatrooms = chat_rooms.filter(users__username=user)
        user_and_chatuser_chatroom = user_chatrooms.filter(users__username=chat_user)
        chat_room = user_and_chatuser_chatroom.first()
        
        return chat_room.messages.all()
    

    def resolve_get_profile_info(self, info, user):
        user_doesnt_exist = CustomUser.objects.filter(username=user).count() == 0

        if user_doesnt_exist:
            raise GraphQLError("This profile doesn't exist!")

        # Get user object
        user = CustomUser.objects.get(username=user)
        return Profile.objects.get(user=user)

    
    def resolve_me(self, info):
        user = info.context.user 
        
        if user.is_authenticated:
            return user

    def resolve_all_users(self, info, **kwargs):
        return CustomUser.objects.all()

    def resolve_all_profiles(self, root, **kwargs):
        return Profile.objects.all()

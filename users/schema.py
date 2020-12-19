import json
from http.cookies import SimpleCookie

from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from .mutations.messages import *
from .mutations.profiles import *
from .mutations.users import *


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
    all_users = graphene.List(CustomUserType)
    all_profiles = graphene.List(ProfileType)

    chat_room_messages = graphene.List(
        MessageType,
        user=graphene.String(required=True),
        chat_user=graphene.String(required=True)
    )

    get_profile_info = graphene.Field(
        ProfileType,
    )
    

    @login_required
    def resolve_chat_room_messages(self, root, chat_user):
        chat_rooms = ChatRoom.objects.all()

        user_doesnt_exist = CustomUser.objects.filter(username=user).count() == 0
        chat_user_doesnt_exist = CustomUser.objects.filter(username=chat_user).count() == 0

        if user_doesnt_exist or chat_user_doesnt_exist:
            raise GraphQLError("User or chat user doesn't exist!")

        # Get users
        user = CustomUser.objects.get(username=user)
        chat_user = CustomUser.objects.get(username=chat_user)

        # Get messages
        user_chatrooms = chat_rooms.filter(users__username=user)
        user_and_chatuser_chatroom = user_chatrooms.filter(users__username=chat_user)
        chat_room = user_and_chatuser_chatroom.first()
        
        return chat_room.messages.all()
    

    @login_required
    def resolve_get_profile_info(self, info):
        user = info.context.user
        user_doesnt_exist = CustomUser.objects.filter(username=user).count() == 0

        if user_doesnt_exist:
            raise GraphQLError("This profile doesn't exist!")

        # Get user object
        user = CustomUser.objects.get(username=user)
        return Profile.objects.get(user=user)


    @login_required
    def resolve_all_users(self, info, **kwargs):
        return CustomUser.objects.all()

    @login_required
    def resolve_all_profiles(self, root, **kwargs):
        return Profile.objects.all()

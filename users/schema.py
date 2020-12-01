from .mutations.messages import *
from .mutations.profiles import *
from .mutations.users import *



class UserMutation(AuthMutation):
    # Messages
    message_create = CreateMessage.Field()
    create_chat_room = CreateChatRoom.Field()

    # Profiles
    profile_info = ProfileInfo.Field()
    profile_info = ProfileInfo.Field()
    check_user_profile = CheckUserProfile.Field()
    profile_update = UpdateUser.Field()
    profile_follow = FollowProfile.Field()
    profile_unfollow = UnfollowProfile.Field()
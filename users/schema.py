from .mutations.messages import *
from .mutations.profiles import *
from .mutations.users import *



class UserMutation(AuthMutation):
    # Messages
    create_message = CreateMessage.Field()
    create_chat_room = CreateChatRoom.Field()

    # Profiles
    get_profile_info = GetProfileInfo.Field()
    check_user_profile = CheckUserProfile.Field()
    update_profile = UpdateProfile.Field()
    follow_profile = FollowProfile.Field()
    unfollow_profile = UnfollowProfile.Field()
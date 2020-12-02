import React from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import { USER_PROFILE_FOLLOW_MUTATION, USER_PROFILE_UNFOLLOW_MUTATION  } from '../Api/user'

const ProfileBodyButtons = ({ profileData: { getProfileInfo: { profile } }, currentUser }) => {
    const history = useHistory()

    const { totalFollowers, user: { username: usersProfile }, followers } = profile
    const [ followProfile ] = useMutation(USER_PROFILE_FOLLOW_MUTATION) 
    const [ unfollowProfile ] = useMutation(USER_PROFILE_UNFOLLOW_MUTATION)


    const handleOnFollow = async () => {
        await followProfile({ variables: { follower: currentUser, following: usersProfile } })
        window.location.reload(false) // Reset site
    }

    const handleOnUnfollow = async () => {
        await unfollowProfile({ variables: { follower: currentUser, following: usersProfile } })
        window.location.reload(false) // Reset site
    }

    const handleOnMessage = () => {
        // Redirect to chat room 
        history.push(`/message/${usersProfile}`)
    }

    // Check if user follow this profile
    const userIsFollowingProfile = followers.some(follower => {
        return follower.username === currentUser
    })


    return (        
        <div className="profile-buttons-container">
            {/* If this is not users profile */}
            {(currentUser !== usersProfile) ? (
                <div className="profile-buttons">
                    <Button as='div' labelPosition='right'>
                        {(userIsFollowingProfile) ? (
                            <Button onClick={handleOnUnfollow} color='blue'>
                                <Icon name='user times' />
                                Unfollow
                            </Button>
                        ) : (
                            <Button onClick={handleOnFollow} color='blue'>
                                <Icon name='user plus' />
                                Follow
                            </Button>
                        )}
                        <Label as='a' basic color='blue' pointing='left'>
                            {totalFollowers}
                        </Label>
                    </Button>
                    <Button 
                        onClick={handleOnMessage} 
                        className="profile-message-button" 
                        color='blue'
                    >
                        <Icon name='comment' /> Message
                    </Button>
                </div>
                
            ) : (
                <Button as='div' labelPosition='right'>
                    <Button color='blue'>
                        <Icon name='users' />
                        Followers
                    </Button>
                    <Label as='a' basic color='blue' pointing='left'>
                        {profile.totalFollowers}
                    </Label>
                </Button>
            )}
        </div>
    )
}

export default ProfileBodyButtons

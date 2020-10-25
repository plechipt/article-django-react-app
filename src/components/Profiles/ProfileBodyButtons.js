import React from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import { USER_PROFILE_FOLLOW_MUTATION, USER_PROFILE_UNFOLLOW_MUTATION  } from '../Api/user'

const ProfileBodyButtons = ({ profileData: { profileInfo: { profile } }, currentUser }) => {
    const history = useHistory()

    //destructuring users total followers and users username
    const { totalFollowers, user: { username: usersProfile }, followers } = profile
    const [ profileFollow ] = useMutation(USER_PROFILE_FOLLOW_MUTATION) 
    const [ profileUnfollow ] = useMutation(USER_PROFILE_UNFOLLOW_MUTATION)


    const handleOnFollow = () => {
        profileFollow({ variables: { follower: currentUser, following: usersProfile } })

         //reset site
        window.location.reload(false);
    }

    const handleOnUnfollow = () => {
        profileUnfollow({ variables: { follower: currentUser, following: usersProfile } })
        
        //reset site
        window.location.reload(false);
    }

    const handleOnMessage = () => {
        //redirect to chat room with users profile
        history.push(`/message/${usersProfile}`)
    }

    //check if user follow this profile
    const userIsFollowingProfile = followers.some(follower => {
        return follower.username === currentUser
    })


    return (        
        <div className="ml-5">
            {/*If this is not users profile*/}
            {(currentUser !== usersProfile) ? (
                <div>
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
                    <Button onClick={handleOnMessage} className="profile-message-button" color='blue'>
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

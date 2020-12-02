import React from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'

import { POST_LIKE_MUTATION, POST_UNLIKE_MUTATION } from '../../Api/post'

const LikeButton = ({ id, likes, detailData, currentUser }) => {
    const { findPost: { likes: usersLikes }} = detailData

    const [ postLike ] = useMutation(POST_LIKE_MUTATION)
    const [ unlikePost ] = useMutation(POST_UNLIKE_MUTATION)

    const handleOnLike = async () => {
        await postLike({ variables: { id: id, user: currentUser } })
        window.location.reload(false); // Reset site
    }

    const handleOnUnlike = async () => {
        await unlikePost({ variables: { id: id, user: currentUser } })
        window.location.reload(false); // Reset site
    }

    // Check if user has liked this post
    const userHasLikedPost = usersLikes.some(({ username }) => {
        return username === currentUser
    })


    return (
        <>
            <Button as='div' labelPosition='right'>
                {(userHasLikedPost) ? (
                    <Button onClick={handleOnUnlike} color='red'>
                        <Icon name='thumbs down' />
                        Unlike
                    </Button>
                ) : (
                    <Button onClick={handleOnLike} color='red'>
                        <Icon name='thumbs up' />
                        Like
                    </Button>
                )}
                <Label as='a' basic color='red' pointing='left'>
                    {likes}
                </Label>
            </Button>  
        </>
    )
}

export default LikeButton

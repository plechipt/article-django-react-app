import React from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'

import { POST_LIKE_MUTATION, POST_UNLIKE_MUTATION } from '../../Api/post'

const LikeButton = ({ id, likes, detailData }) => {
    const user = localStorage.getItem('user')
    const { findPost: { post: { likes: usersLikes }}} = detailData

    const [ postLike ] = useMutation(POST_LIKE_MUTATION)
    const [ unlikePost ] = useMutation(POST_UNLIKE_MUTATION)

    const handleOnLike = () => {
        postLike({ variables: { id: id, user: user } })
        window.location.reload(false); //reset site
    }

    const handleOnUnlike = () => {
        unlikePost({ variables: { id: id, user: user } })
        window.location.reload(false); //reset site
    }

    //check if user has like this post
    const userHasLikedPost = usersLikes.some(({ username }) => {
        return username === user
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

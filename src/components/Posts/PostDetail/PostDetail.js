import React, { useState, useEffect } from 'react'
import { Item } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { useParams, Link } from 'react-router-dom'

import { POST_FIND_MUTATION } from '../../Api/post'

import CommentsMap from '../../Comments/Comments/CommentsMap'
import CommentCreateForm from '../../Comments/CommentCreateForm'
import LikeButton from './LikeButton'
import EditDeleteButtons from './EditDeleteButtons'

const DEFAULT_IMAGE = 'https://miro.medium.com/max/550/1*TxgjUE2uJuiRUVVmE_kU6g.png'

const PostDetail = ({ currentUser }) => {
    const { id } = useParams()
    
    // Set likes temporarily on frontend
    const [ likes, setLikes ] = useState(0)
    const [ postFind, { data: detailData } ] = useMutation(POST_FIND_MUTATION)


    // Fetch to set amount of likes to button
    useEffect(() => {
        if (detailData && detailData.findPost.message === 'Success') {
            setLikes(detailData.findPost.post.totalLikes)
        }
    }, [detailData])

    // If id is number -> fetch post
    useEffect(() => {
        const findPost = async () => {
            const id_is_number = !(isNaN(id))
    
            if (id_is_number === true) {
                await postFind({ variables: { id: id } })
            }
        }
        findPost()
    }, [id, postFind])

    
    return (
        <div>
            {(detailData && detailData.findPost.message === 'Success') ? (
                <Item.Group>
                <Item>
                    <Item.Image size='small' src={DEFAULT_IMAGE} />
                    <Item.Content className="post-content">
                        <Item.Header 
                            className="post-title"
                        >
                            {detailData.findPost.post.title}
                        </Item.Header>
                        <Item.Meta className="post-user">
                            <Link to={`profile/${detailData.findPost.post.user.username}`}>
                                {detailData.findPost.post.user.username}
                            </Link>
                        </Item.Meta>
                        <Item.Meta 
                            className="post-date"
                        >
                            {detailData.findPost.post.posted}
                        </Item.Meta>
                        <Item.Description 
                            className="post-textfield"
                        >
                            {detailData.findPost.post.content}
                        </Item.Description>

                        {/*Includes like, edit and delete buttons*/}
                        <div className="post-detail-buttons-container">
                            <LikeButton 
                                id={id} likes={likes} 
                                detailData={detailData} 
                                currentUser={currentUser}            
                            />
                            <EditDeleteButtons 
                                id={id} 
                                detailData={detailData} 
                                currentUser={currentUser} 
                            />
                        </div>
                        
                        <div className="comments-container">
                            {/*Map all comments from post*/}
                            <CommentsMap detailData={detailData} currentUser={currentUser} />

                            {/*Reply form for comments*/}
                            <CommentCreateForm id={id} currentUser={currentUser} />
                        </div>
                    </Item.Content>
                </Item>
            </Item.Group>
        ) : null }
        </div>
    )
}

export default PostDetail

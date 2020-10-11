import React from 'react'
import { Comment, Header } from 'semantic-ui-react'

import CustomComment  from './CustomComment'
import '../Comments.css'

//map all comments
const CommentsMap = ({ detailData }) => {
    const { findPost: { post: { commentSet } } } = detailData

    
    return (
        <div>
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {(commentSet.map(({ id, content, posted, user: { username, profile: image }, replySet }) => {
                    return (
                        <CustomComment 
                            key={id}
                            id={id}
                            replys={replySet}
                            content={content}
                            posted={posted}
                            username={username}
                            image={image}
                        />
                    )
                }))}
            </Comment.Group>
        </div>
    )
}

export default CommentsMap

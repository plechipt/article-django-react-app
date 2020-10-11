import React from 'react'
import { Comment } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { REPLY_DELETE_MUTATION } from '../Api/reply'

const DEFAULT_ICON = 'https://react.semantic-ui.com/images/avatar/small/matt.jpg'
const PATH_TO_PICTURES = 'Profiles/media/profile_pictures'

const CustomReply = ({ id, content, posted, username, image }) => {
    const user = localStorage.getItem('user')
    const [ replyDelete ] = useMutation(REPLY_DELETE_MUTATION)

    const handleOnDelete = () => {
        replyDelete({ variables: { id: id } })
        window.location.reload(false)
    }


    return (
        <>
            <Comment.Group className="reply-container">
                <Comment>
                    <Comment.Avatar src={require(`../${PATH_TO_PICTURES}/small/${image}`)} />
                    <Comment.Content>
                        <Comment.Author as='a'><a href={`profile/${username}`}>{username}</a></Comment.Author>
                        <Comment.Metadata>
                            <div>{posted}</div>
                        </Comment.Metadata>
                            <Comment.Text>{content}</Comment.Text>
                        <Comment.Actions>
                            {(user === username) ? (
                                <Comment.Action onClick={handleOnDelete}>Delete</Comment.Action>
                            ) : null}
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            </Comment.Group>
        </>
    )
}

export default CustomReply

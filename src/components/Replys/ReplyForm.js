import React, { useEffect, useState } from 'react'
import { Button, Comment, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'

import { REPLY_ADD_MUTATION } from '../Api/reply'
import './Replys.css'

const ReplyForm = ({ id, showReplyForm, currentUser }) => {
    const [ replyComment ] = useMutation(REPLY_ADD_MUTATION)

    const [ replyInput, setReplyInput ] = useState('')
    const [ allowButton, setAllowButton ] = useState(false)
    
    const handleOnAddReply = () => {
        replyComment({ variables: { id: id, user: currentUser, content: replyInput } })

        //reset site
        window.location.reload(false);
    }

    //check if reply was filled
    useEffect(() => {
        const form_is_filled = replyInput !== ''
        
        if (form_is_filled) {
            setAllowButton(true)
        }

        else {
            setAllowButton(false)
        }
    }, [replyInput])


    return (
        <div>
            {(showReplyForm) ? (
                <Comment.Group>
                    <Form reply>
                        <textarea
                            onChange={event => setReplyInput(event.target.value)}
                            value={replyInput}
                            placeholder='Enter something...' 
                        />
                        {(allowButton) ? (
                            <Button onClick={handleOnAddReply} className="comment-create-button" content='Reply' labelPosition='left' icon='edit' primary />
                        ) : (
                            <Button disabled onClick={handleOnAddReply} className="comment-create-button" content='Reply' labelPosition='left' icon='edit' primary />
                        )}
                    </Form>
                </Comment.Group>
            ) : null}
        </div>
    )
}

export default ReplyForm

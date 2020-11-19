import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Form, Message } from 'semantic-ui-react'
import { COMMENT_ADD_MUTATION } from '../Api/comment'

const CommentCreateForm = ({ id, currentUser }) => {
    const [ allowButton, setAllowButton ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('')
    
    const [ commentInput, setCommentInput ] = useState('')
    const [ commentAdd, { data: commentData } ] = useMutation(COMMENT_ADD_MUTATION)

    const handleOnComment = () => {
        commentAdd({ variables: { id: id, user: currentUser, content: commentInput } })
    }
    
    useEffect(() => {
        if (commentData) {
            const { commentPost: { message } } = commentData
            
            if (message === 'Success') {
                setErrorMessage('')

                //reset site
                window.location.reload(false);
            }

            else {
                setErrorMessage(true)
            }

        }
    }, [commentData])

    //if comment form was filled -> activate button
    useEffect(() => {
        if (commentInput !== '') {
            setAllowButton(true)
        }
    
        else {
            setAllowButton(false)
        }
    }, [commentInput])


    return (
        <div className="comment-create-container">
            {errorMessage !== '' ? (
                <Message
                    className="error-message-container"
                    error
                    header={errorMessage}
                />
            ) : null }
            <Form reply>
                <textarea
                    onChange={event => setCommentInput(event.target.value)}
                    placeholder='Enter something...' 
                    maxLength="100"
                />
                {(allowButton) ? (
                    <Button onClick={handleOnComment} className="comment-create-button" content='Comment' labelPosition='left' icon='edit' primary />
                ) : (
                    <Button disabled onClick={handleOnComment} className="comment-create-button" content='Comment' labelPosition='left' icon='edit' primary />
                )}
            </Form>
        </div>
    )
}

export default CommentCreateForm

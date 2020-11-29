import React, { useState, useEffect } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import { POST_CREATE_MUTATION } from '../../Api/post'

//import styles from './Posts.module.css'

const PostCreate = ({ currentUser }) => {
    const history = useHistory()
    
    const [ errorMessage, setErrorMessage ] = useState() 
    const [ allowButton, setAllowButton ] = useState(false)

    const [ titleInput, setTitleInput ] = useState('')
    const [ textareaInput, setTextareaInput ] = useState('')

    const [ createPost, { data: postData }] = useMutation(POST_CREATE_MUTATION)
    
    const handleOnSubmit = async (event) => {
        const forms_are_filled = titleInput !== '' && textareaInput !== ''
        const user_pressed_enter = event.key === 'Enter'
        const user_submited_button = event.target.tagName === 'FORM'

        if ((forms_are_filled && user_pressed_enter) || user_submited_button) {
            await createPost({ variables: { title: titleInput, content: textareaInput, user: currentUser }})
        }
    }

    // Check if post was successfully created
    useEffect(() => {
        if (postData) {
            const message = postData.addPost.message

            if (message === 'Success') {
                history.push('/posts')
            } 

            else {
                setErrorMessage(message)
            }
        }
    }, [postData, history])

    // If title and content are filled -> undisable button
    useEffect(() => {
        if (titleInput !== '' && textareaInput !== '') {
            setAllowButton(true)
        }

        else {
            setAllowButton(false)
        }
    }, [titleInput, textareaInput])


    return (
        <div className="post-create-container">
            {errorMessage ? (
                <Message
                    className="error-message-container"
                    error       
                    header={errorMessage}
                />
            ) : null }
            <Form onKeyPress={handleOnSubmit} onSubmit={handleOnSubmit}>
                <Form.Field>
                    <label>Title</label>
                    <input 
                        onChange={event => setTitleInput(event.target.value)} 
                        value={titleInput} 
                        placeholder='Title' 
                        autoFocus 
                        maxLength="100"  
                    />
                </Form.Field>
                <Form.Field>
                    <label>Content</label>
                    <textarea 
                        onChange={(event) => setTextareaInput(event.target.value)}
                        value={textareaInput}
                        placeholder='Enter something...' 
                        maxLength="10000"
                    />
                </Form.Field>
                <Button 
                    disabled={!allowButton}
                    className="submit-button" 
                    type="submit" 
                    primary
                >
                    Create
                </Button>
            </Form>
        </div>
    )
}

export default PostCreate

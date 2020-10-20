import React, { useState, useEffect } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import { POST_CREATE_MUTATION, POST_LIST_QUERY } from '../../Api/post'

//import styles from './Posts.module.css'

const PostCreate = () => {
    const user = Cookies.get('user')
    const history = useHistory()
    
    const [ errorMessage, setErrorMessage ] = useState() 
    const [ allowButton, setAllowButton ] = useState(false)

    const [ titleInput, setTitleInput ] = useState('')
    const [ textareaInput, setTextareaInput ] = useState('')

    const [ createPost, { data: postData } ] = useMutation(POST_CREATE_MUTATION)
  
    
    const handleOnSubmit = (event) => {
        //if title and textarea are filled and user hit enter or create button
        if ((titleInput !== '' && textareaInput !== '') && (event.key === 'Enter' || event.target.tagName === 'FORM')) {
            createPost({ variables: { title: titleInput, content: textareaInput, user: user }})
            //history.push('/')
        }
    }

    //check post was successfully created
    useEffect(() => {
        if (postData) {
            const message = postData.addPost.message

            if (message === 'Success') {
                history.push('/')
            } 

            else {
                setErrorMessage(message)
            }
        }
    }, [postData])

    //check if title and content were filled
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
                    <input onChange={event => setTitleInput(event.target.value)} value={titleInput} placeholder='Title' />
                </Form.Field>
                <Form.Field>
                    <label>Content</label>
                    <textarea 
                        onChange={(event) => setTextareaInput(event.target.value)}
                        value={textareaInput}
                        placeholder='Enter something...' 
                    />
                </Form.Field>
                {(allowButton) ? (
                    <Button className="submit-button" type="submit" primary>Create</Button>
                ) : (
                    <Button disabled className="submit-button" type="submit" primary>Create</Button>
                ) }
            </Form>
        </div>
    )
}

export default PostCreate

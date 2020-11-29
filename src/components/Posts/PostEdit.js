import React, { useState, useEffect } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory, useParams } from 'react-router-dom'

import { POST_EDIT_MUTATION, POST_FIND_MUTATION } from '../Api/post' 

const PostEdit = ({ currentUser }) => {  
    
    const { id } = useParams()
    const history = useHistory()

    const [ allowButton, setAllowButton ] = useState(false)
    const [ titleInput, setTitleInput ] = useState('')
    const [ textAreaInput, setTextAreaInput ] = useState('')
    
    const [ postEdit ] = useMutation(POST_EDIT_MUTATION) 
    const [ postFind, { data: detailData } ] = useMutation(POST_FIND_MUTATION)


   //everytime id changes -> find post info of that id 
    useEffect(() => {
        const id_is_number = !(isNaN(id))

        if (id_is_number === true) {
            postFind({variables: { id: id }})
        }
    }, [id, postFind])
    
    //set title and textarea to set default value in forms
    useEffect(() => {
        if (detailData && detailData.findPost.message === 'Success') {
            setTitleInput(detailData.findPost.post.title)
            setTextAreaInput(detailData.findPost.post.content)
        }
    }, [detailData])
    
    //if title and textarea are filled -> undisable button
    useEffect(() => {
        const fields_are_filled = titleInput !== '' && textAreaInput !== ''
        
        if (fields_are_filled) {
            setAllowButton(true)
        }
        
        else {
            setAllowButton(false)
        }
    }, [titleInput, textAreaInput])

    const handleOnSubmit = async (event) => {
        const fields_are_filled = titleInput !== '' && textAreaInput !== ''
        const user_pressed_enter = event.key === 'Enter'
        const user_submited_button = event.target.tagName === 'FORM'

        if ((fields_are_filled && user_pressed_enter) || user_submited_button) {
            await postEdit({ variables: { id: id, title: titleInput, content: textAreaInput } })
            history.push('/posts')
        }
    }
    
    
    return (
        <div className="post-create-container">
            {(detailData && detailData.findPost.message === 'Success' &&
              detailData.findPost.post.user.username === currentUser) ? (
                <Form onKeyPress={handleOnSubmit} onSubmit={handleOnSubmit}>
                    <Form.Field>
                        <label>Title</label>
                        <input 
                            onChange={event => setTitleInput(event.target.value)} 
                            value={titleInput} 
                            placeholder="Title" 
                            maxLength="100" 
                            autoFocus 
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Content</label>
                        <textarea 
                            onChange={event => setTextAreaInput(event.target.value)} 
                            value={textAreaInput} 
                            maxLength="10000" 
                            placeholder='Enter something...'
                        />
                    </Form.Field>
                    {(allowButton) ? (
                        <Button className="submit-button" type='submit' primary>Edit</Button>
                    ) : (
                        <Button disabled className="submit-button" type='submit' primary>Edit</Button>
                    )}
                </Form>
            ) : null }
        </div> 
    )
}

export default PostEdit

import React, { useState, useEffect } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { useHistory, useParams } from 'react-router-dom'

import { POST_EDIT_MUTATION, POST_FIND_QUERY } from '../Api/post' 

const PostEdit = ({ currentUser }) => {  
    const { id } = useParams()
    const history = useHistory()

    const [ allowButton, setAllowButton ] = useState(false)
    const [ titleInput, setTitleInput ] = useState('')
    const [ textAreaInput, setTextAreaInput ] = useState('')
    
    const [ postEdit ] = useMutation(POST_EDIT_MUTATION) 
    const [ findPost, { loading, data: detailData }] = useLazyQuery(POST_FIND_QUERY)

    // Everytime id changes -> find post info of that id 
    useEffect(() => {
        const id_is_number = !(isNaN(id))

        if (id_is_number === true) {
            findPost({variables: { id: id }})
        }
    }, [findPost])

    
    // Fill title and textarea
    useEffect(() => {
        if (detailData && detailData.findPost.title) {
            setTitleInput(detailData.findPost.title)
            setTextAreaInput(detailData.findPost.content)
        }
    }, [detailData])
    
    // If title and textarea are filled -> undisable button
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
            {(detailData && detailData.findPost.user.username === currentUser) ? (
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
                        <Button 
                            disabled={!allowButton}
                            className="submit-button" 
                            type='submit' 
                            primary
                        >
                            Edit
                        </Button>
                </Form>
            ) : null }
        </div> 
    )
}

export default PostEdit

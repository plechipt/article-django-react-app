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
        //if id is number -> fetch post
        if (isNaN(id) === false) {
            postFind({variables: { id: id }})
        }
    }, [id])
    
    //set title and textarea to set default value in forms
    useEffect(() => {
        if (detailData && detailData.findPost.message === 'Success') {
            setTitleInput(detailData.findPost.post.title)
            setTextAreaInput(detailData.findPost.post.content)
        }
    }, [detailData])
    
    //if title and textarea are filled -> undisable button
    useEffect(() => {
        if (titleInput !== '' && textAreaInput !== '') {
            setAllowButton(true)
        }
        
        else {
            setAllowButton(false)
        }
    }, [titleInput, textAreaInput])

    const handleOnSubmit = (event) => {
         //if title and textarea are filled and user hit enter or hit create button
        if ((titleInput !== '' && textAreaInput !== '') && (event.key === 'Enter' || event.target.tagName === 'FORM')) {
            postEdit({ variables: { id: id, title: titleInput, content: textAreaInput } })
            history.push('/')
        }
    }
    
    
    return (
        <div className="post-create-container">
            {(detailData && detailData.findPost.message === 'Success' &&
              detailData.findPost.post.user.username === currentUser) ? (
                <Form onKeyPress={handleOnSubmit} onSubmit={handleOnSubmit}>
                    <Form.Field>
                        <label>Title</label>
                        <input onChange={event => setTitleInput(event.target.value)} value={titleInput} placeholder="Title" />
                    </Form.Field>
                    <Form.Field>
                        <label>Content</label>
                        <textarea onChange={event => setTextAreaInput(event.target.value)} value={textAreaInput} placeholder='Enter something...' />
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

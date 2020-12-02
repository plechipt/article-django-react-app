import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import { POST_DELETE_MUTATION } from '../../Api/post'
import DeleteModal from './DeleteModal'

const EditDeleteButtons = ({ id, detailData, currentUser }) => {
    const history = useHistory()

    const [ open, setOpen ] = useState(false)
    const [ postDelete ] = useMutation(POST_DELETE_MUTATION)
    
    const handleOnDelete = async () => {
        await postDelete({ variables: { id: id } })
        history.push('/posts')
    }

    const handleOnEdit = () => {
        history.push(`editPost/${id}`)
    }

    // Handle boolean from child's component
    const handleAction = (boolean) => {
        setOpen(boolean)
    }

    return (
        <>  
            {/* If post it is user's post -> show edit and delete button */}
            {(currentUser === detailData.findPost.user.username) ? (
                <>
                    <Button 
                        onClick={handleOnEdit} 
                        className="post-detail-edit-button" 
                        color="teal"
                    >
                        Edit
                    </Button>
                    <Button 
                        onClick={() => handleAction(true)} 
                        className="post-detail-delete-button" 
                        color="red"
                    >
                        Delete
                    </Button>
                    <DeleteModal 
                        open={open} 
                        handleAction={handleAction} 
                        handleOnDelete={handleOnDelete} 
                    />
                </>
            ) : null }
        </>
    )
}

export default EditDeleteButtons
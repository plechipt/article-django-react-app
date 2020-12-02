import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

import { MESSAGE_CREATE_MUTATION } from '../Api/message'

const CreateMessage = ({ currentUser }) => {
    const { chatUser } = useParams()

    const [ messageInput, setMessageInput ] = useState('')
    const [ createMessage ] = useMutation(MESSAGE_CREATE_MUTATION)


    const handleOnSubmit = async (event) => {
        const form_is_filled = messageInput !== ''
        const user_pressed_enter = event.key === 'Enter'
        const user_submited_button = event.target.tagName === 'I'

        if ((user_pressed_enter && form_is_filled) || user_submited_button) {
            await createMessage({ variables: { user: currentUser, chatUser: chatUser, content: messageInput }})
            setMessageInput('')
            window.location.reload(false) // Reset site
        }
    }

    return (
        <div className="message-create-container">
            <div className="message-create-form-container">
                <div className="form-group message-create-form-container">
                    <textarea
                        onChange={(event) => setMessageInput(event.target.value)}
                        onKeyPress={handleOnSubmit}
                        value={messageInput}
                        className="form-control form-control-lg text-area-container"
                        placeholder="Enter a message..." 
                        maxLength="565"
                        autoFocus
                    />
                </div>
            </div>
            <div onClick={handleOnSubmit} className="ml-3 message-button-container">
                <Icon name="send" size="big" />
            </div>

        </div>
    )
}

export default CreateMessage

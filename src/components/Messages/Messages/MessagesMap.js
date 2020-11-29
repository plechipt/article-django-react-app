import React from 'react'

import Message from './Message'
import '../Messages.css' 


const MessagesMap = ({ messagesData: { queryUserMessages: { messages }}, currentUser }) => {

    return (
        <div className="messages-container">
            {messages.map(({ id, content, messaged, user: { username } }) => {
                return (
                    <Message 
                        key={id} 
                        id={id}
                        username={username}
                        currentUser={currentUser}
                        content={content}
                        messaged={messaged}
                    />
                )
            })}
        </div>
    )
}

export default MessagesMap

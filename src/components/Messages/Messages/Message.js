import React from 'react'
import { useParams } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'

const Message = ({ id, content, messaged, username, currentUser }) => {
    const { chatUser } = useParams()

    
    return (
        <>
            {/*Chat users side*/}
            {(username === chatUser) ? (
                <div className="d-flex my-2 mr-auto">
                    <div className="py-3 px-3 rounded-pill chat-user-container message-container">
                        {/*Popup to show date*/}
                        <Popup
                            className="mr-4"
                            content={messaged}
                            inverted
                            position='left center'
                            trigger={
                                <p>{content}</p>
                            }
                        />
                    </div>
                </div>
            ) : (
                <div className="d-flex my-2 ml-auto">
                    <div className="py-3 px-3 rounded-pill bg-primary message-container">
                        {/*Popup to show date*/}
                        <Popup
                            className="ml-4"
                            content={messaged}
                            inverted
                            position='right center'
                            trigger={
                                <p className="text-white">{content}</p>
                            }
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Message
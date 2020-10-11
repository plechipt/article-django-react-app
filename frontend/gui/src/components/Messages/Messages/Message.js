import React from 'react'
import { useParams } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'

const Message = ({ id, content, messaged, username }) => {
    const user = localStorage.getItem('user')
    const { chatUser } = useParams()


    return (
        <>
            {(username !== user) ? (
                <div className="d-flex my-2 mr-auto">
                    <div className="py-3 px-3 rounded-pill chat-user-container message-container">
                        {/*Popup to show date*/}
                        <Popup
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
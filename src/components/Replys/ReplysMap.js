import React from 'react'

import CustomReply from './CustomReply'

// Map all replies
const ReplysMap = ({ replys, currentUser }) => {
    
    return (
        <div>
            {(replys.map(({ id, content, posted, user: { username, profile: { image } } }) => {
                return (
                    <CustomReply 
                        key={id}
                        id={id}
                        content={content}
                        posted={posted}
                        username={username}
                        currentUser={currentUser}
                        image={image}
                    />
                )
            }))}
        </div>
    )
}

export default ReplysMap

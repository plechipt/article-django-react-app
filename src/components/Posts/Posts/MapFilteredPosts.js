import React from 'react'

import Post from './Post'

//Map all filtered posts
const MapFilteredPosts = ({ filteredData }) => {
    const { postFilter: { filteredPosts }} = filteredData


    return (
        <div>
            {filteredPosts.map(({ user: { username }, title, posted, id }) => {
                return (
                    <Post 
                        key={id} 
                        username={username}
                        title={title}
                        posted={posted}
                        id={id}
                    />
                )})}
        </div>
    )
}

export default MapFilteredPosts

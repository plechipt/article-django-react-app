import React, { useState } from 'react'

import Post from './Post'

//Map all filtered posts
const MapPosts = ({ filteredData }) => {
    const { postFilter: { filteredPosts }} = filteredData

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ postsPerPage, setPostsPerPage ] = useState(5)
     
    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

    return (
        <div>
            {currentPosts.map(({ user: { username }, title, posted, id }) => {
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

export default MapPosts

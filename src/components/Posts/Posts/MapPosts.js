import React, { useState } from 'react'

import Post from './Post'

//Map all posts
const MapPosts = ({ postsData, searchInput }) => {
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ postsPerPage, setPostsPerPage ] = useState(10)
     
    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = postsData.allPosts.slice(indexOfFirstPost, indexOfLastPost)

    console.log(currentPosts)

    return (
        <div>
            {/*Prevents bugging posts to filtered posts*/}
            {(searchInput === '') ? (
                <>
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
                </>
            ) : null }
        </div>
    )
}

export default MapPosts

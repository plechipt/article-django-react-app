import React from 'react'

import Post from './Post'

//Map all posts
const MapPosts = ({ postsData, searchInput }) => {

    return (
        <div>
            {/*Prevents bugging posts to filtered posts*/}
            {(searchInput === '') ? (
                <>
                    {postsData.allPosts.map(({ user: { username }, title, posted, id }) => {
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

import React, { useState } from 'react'

import Post from './Post'
import CustomPagination from './Pagination'

//Map all filtered posts
const MapPosts = ({ filteredData, searchInput }) => {
    const { postFilter: { filteredPosts }} = filteredData

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ postsPerPage ] = useState(5)
     
    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

    //Change page
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value.activePage)
    }

    
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
                {searchInput === '' ? (
                    <CustomPagination
                        postsPerPage={postsPerPage}
                        totalPosts={filteredPosts.length}
                        handlePaginationChange={handlePaginationChange} 
                    /> 
                ) : null}
        </div>
    )
}

export default MapPosts

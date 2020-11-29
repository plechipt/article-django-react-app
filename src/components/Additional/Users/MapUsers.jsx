import React, { useState } from 'react'
import { Item } from 'semantic-ui-react'

import User from './User'
import CustomPagination from '../../Posts/Posts/Pagination'
import './Users.css'

const MapUsers = ({ users: { allProfiles: allUsers }}) => {
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ postsPerPage ] = useState(6)

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentUsers = allUsers.slice(indexOfFirstPost, indexOfLastPost)

    // Change page
    const handlePaginationChange = (event, value) => {
        setCurrentPage(value.activePage)
    }

    return (
        <> 
            <div className="users-container">
                <Item.Group link>
                    {currentUsers.map(({ user: { username }, id, image }) => {
                        return (
                            <User
                                key={id}
                                id={id}
                                username={username}
                                image={image}
                            />
                        ) 
                    })}
                </Item.Group>
            </div>
            <CustomPagination
                postsPerPage={postsPerPage}
                totalPosts={allUsers.length}
                handlePaginationChange={handlePaginationChange} 
            /> 
        </>
    )
}

export default MapUsers

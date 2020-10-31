import React from 'react'
import { Pagination } from 'semantic-ui-react'

const CustomPagination = ({ postsPerPage, totalPosts }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="paginate-container">
            <Pagination defaultActivePage={5} totalPages={10} />
        </div>
    )
}

export default CustomPagination

import React from 'react'
import { Pagination, Icon } from 'semantic-ui-react'

const CustomPagination = ({ postsPerPage, totalPosts, currentPage, handlePaginationChange }) => {
    const totalPages = Math.ceil(totalPosts / postsPerPage)

    return (
        <div className="paginate-container">
            <Pagination
                activePage={currentPage}
                onPageChange={handlePaginationChange}
                totalPages={totalPages}
                ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                prevItem={{ content: <Icon name='angle left' />, icon: true }}
                nextItem={{ content: <Icon name='angle right' />, icon: true }}
            />
        </div>
    )
}

export default CustomPagination

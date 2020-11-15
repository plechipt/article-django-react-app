import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { USER_PROFILE_LIST_QUERY } from '../../Api/user'
import MapUsers from './MapUsers'

const Users = () => {
    const { data: users } = useQuery(USER_PROFILE_LIST_QUERY)

    return (
        <div className="users-paginator-container">
            {users ? (
                <MapUsers users={users} /> 
            ) : null}
        </div>
    )
}

export default Users

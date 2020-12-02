import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { PROFILE_LIST_QUERY } from '../../Api/profile'
import MapUsers from './MapUsers'

const Users = () => {
    const { data: users } = useQuery(PROFILE_LIST_QUERY)

    return (
        <div className="users-paginator-container">
            {users ? (
                <MapUsers  users={users} /> 
            ) : null}
        </div>
    )
}

export default Users

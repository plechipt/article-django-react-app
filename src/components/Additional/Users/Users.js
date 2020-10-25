import React from 'react'
import { Item } from 'semantic-ui-react'
import { useQuery } from '@apollo/react-hooks'

import { USER_PROFILE_LIST_QUERY } from '../../Api/user'
import User from './User'
import './Users.css'

const Users = () => {
    const { data: users } = useQuery(USER_PROFILE_LIST_QUERY)


    return (
        <div className="users-container">
            {users ? (
                <Item.Group link>
                    {users.allProfiles.map(({ user: { username, email }, id, image }) => {
                        return (
                            <User
                                key={id}
                                id={id}
                                username={username}
                                email={email}
                                image={image}
                            />
                        ) 
                    })}
                </Item.Group>
            ) : null}
        </div>
    )
}

export default Users

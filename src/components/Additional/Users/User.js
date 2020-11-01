import React from 'react'
import { Item } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

const PATH_TO_PICTURES = 'Profiles/media/profile_pictures'

const User = ({ id, username, email, image }) => {
    const history = useHistory()

    const handleOnClick = () => {
        history.push(`/profile/${username}`)
    }

    return (
        <Item onClick={handleOnClick} className="user-container">
            <Item.Image size='tiny' src={require(`../../${PATH_TO_PICTURES}/large/${image}`)} />
            <Item.Content className="user-content-container">
                <Item.Header>{username}</Item.Header>
            </Item.Content>
        </Item>
    )
}

export default User

import React, { useState } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import './Navbar.css'

const Navbar = ({ currentUser }) => {
    const token = Cookies.get('token')

    const history = useHistory()
    const [ activeItem, setActiveItem ] = useState()

    const handleItemClick = (name) => {
        setActiveItem(name)
    }

    const handleOnLogout = () => {
        Cookies.remove('token')
        history.push('/login')
        //reset site
        window.location.reload(false);
    }

    
    return (
        <div className="navbar-container">
            <Segment inverted>
                <Menu inverted secondary>
                    {token ? (
                        <>
                            <Menu.Item
                                name="home"
                                active={activeItem === 'home'}
                                onClick={() => {
                                    handleItemClick('home')
                                    history.push('/posts')
                                }}
                            />
                            <Menu.Item
                                name="users"
                                active={activeItem === "users"}
                                onClick={() => {
                                    handleItemClick()
                                    history.push('/users')
                                }}
                            />
                            <Menu.Menu position="right">
                                <Menu.Item
                                    name="create"
                                    active={activeItem === "create"}
                                    onClick={() => {
                                        handleItemClick('home')
                                        history.push('/createPost')
                                    }}

                                />
                                <Menu.Item
                                    name="profile"
                                    active={activeItem === "profile"}
                                    onClick={() => {
                                        handleItemClick('profile')
                                        history.push(`/profile/${currentUser}`)
                                    }}
                                />
                                <Menu.Item
                                    name="support"
                                    active={activeItem === "support"}
                                    onClick={() => {
                                        handleItemClick('support')
                                        history.push(`/support`)
                                    }}
                                />
                                <Menu.Item
                                    name="logout"
                                    active={activeItem === "logout"}
                                    onClick={() => {
                                        handleItemClick('logout')
                                        handleOnLogout()
                                    }}
                                />
                            </Menu.Menu>
                        </>
                    ) : (
                        <Menu.Menu position="right">
                            <Menu.Item
                                name="login"
                                active={activeItem === 'login'}
                                onClick={() => {
                                    handleItemClick('login')
                                    history.push('/login')
                                }}
                            />
                            <Menu.Item
                                name="register"
                                active={activeItem === 'register'}
                                onClick={() => {
                                    handleItemClick('register')
                                    history.push('/register')
                                }}
                            />
                        </Menu.Menu>
                    )}
                </Menu>
            </Segment>
        </div>
    )
}

export default Navbar

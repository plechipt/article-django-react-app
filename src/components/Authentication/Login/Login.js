import React, { useState, useEffect } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import { USER_LOGIN_MUTATION, USER_CHECK_PROFILE_MUTATION } from '../../Api/user'
//import Cookies from 'js-cookie'
import './Login.css'


const Login = () => {
    const history = useHistory()
    const [ failedToLogin, setFailedToLogin ] = useState('') 
    const [ allowButton, setAllowButton ] = useState(false)
    
    const [ checkUserProfile ] = useMutation(USER_CHECK_PROFILE_MUTATION)
    const [ loginUser, { data: loginData }] = useMutation(USER_LOGIN_MUTATION)

    const [ usernameInput, setUsernameInput ] = useState('')
    const [ passwordInput, setPasswordInput ] = useState('')
    
    // If login wasn't successful
    useEffect(() => {
        if (loginData) {
            if (loginData.tokenAuth.success === false) {
                setFailedToLogin(true)
            }
        }
    }, [loginData]) 
    
    // If login was successful
    useEffect(() => {
        const afterSuccessfulLogin = async () => {
            if (loginData) {
                if (loginData.tokenAuth.success === true) {
                    // If user doesnt have profile -> create new one
                    await checkUserProfile({ variables: { user: usernameInput }})
                    
                    history.push('/posts')
                    window.location.reload(false);
                }
            }
        }
        afterSuccessfulLogin()
    }, [loginData, checkUserProfile, history, usernameInput])
   
    
    const handleOnSubmit = async (event) => {
        const username_and_password_are_filled = usernameInput !== '' && passwordInput !== ''
        const user_pressed_enter = event.key === 'Enter'
        const user_submited_button = event.target.tagName === 'FORM'

        if ((username_and_password_are_filled && user_pressed_enter) || user_submited_button) {
            await loginUser({ variables: {
                username: usernameInput, password: passwordInput
            }})
        }
    }
    
    // Check if username and password was filled
    useEffect(() => {
        const username_and_password_are_filled = usernameInput !== '' && passwordInput !== ''

        if (username_and_password_are_filled) {
            setAllowButton(true)
        }
    
        else {
            setAllowButton(false)
        }
    }, [usernameInput, passwordInput])


    return (
        <div className="login-container">
            {(failedToLogin !== false && failedToLogin !== '') ? (
                <Message
                    className="error-message-container"
                    error
                    header="Please, enter valid credentials"
                />
            ) : null }
            <Form onSubmit={handleOnSubmit}>
                <Form.Field>
                    <label>Username</label>
                    <input
                        onChange={event => setUsernameInput(event.target.value)}
                        value={usernameInput}
                        autoComplete="one-time-code"
                        placeholder='Username'
                        maxLength="40"
                        autoFocus
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input
                        onChange={event => setPasswordInput(event.target.value)}
                        value={passwordInput}
                        autoComplete="one-time-code"
                        type="password"
                        maxLength="30"
                        placeholder='Password' 
                    />
                </Form.Field>
                <Form.Field>
                    <p className="text-muted">
                        Need an account? <a href="/register" className="ml-2" >Sign up</a>
                    </p>
                </Form.Field>
                <Button 
                    disabled={allowButton} 
                    className="submit-button" 
                    type='submit' 
                    primary
                >
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Login

import React, { useState, useEffect } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import { USER_CHECK_PROFILE_MUTATION } from '../../Api/user'
import { BASE_URL } from '../../url'
import Cookies from 'js-cookie'
import './Login.css'


const ONE_DAY = 1
const SEVEN_DAYS = 7
const FIFTEEN_MINUTES = 15
const MINUES_IN_ONE_DAY = 1440 

const Login = () => {
    const history = useHistory()
    const [ failedToLogin, setFailedToLogin ] = useState('') 
    const [ allowButton, setAllowButton ] = useState(false)
    
    const [ checkUserProfile ] = useMutation(USER_CHECK_PROFILE_MUTATION)
    const [ loginData, setLoginData ] = useState({})

    const [ usernameInput, setUsernameInput ] = useState('')
    const [ passwordInput, setPasswordInput ] = useState('')
    
    // If login wasn't successful
    useEffect(() => {
        // If response send error message
        if (loginData.detail) {
            setFailedToLogin(true)
        }
    }, [loginData]) 
    
    // If login was successful
    useEffect(() => {
        const afterSuccessfulLogin = async () => {

            // If response send access token and refresh token
            if (loginData.access) {
                const { access: accessToken, refresh: refreshToken } = loginData
                
                // Cookie expires in 15 minutes
                Cookies.set('accessToken', accessToken, { 
                    expires: (ONE_DAY / MINUES_IN_ONE_DAY) * FIFTEEN_MINUTES
                })

                // Cookie expired in 7 days
                Cookies.set('refreshToken', refreshToken, { expires: SEVEN_DAYS })
                

                // If user doesnt have profile -> create new one
                await checkUserProfile({ variables: { user: usernameInput }})
                
                // History.push('/posts')
                //window.location.reload(false);
            }
        }
        afterSuccessfulLogin()
    }, [loginData, checkUserProfile, history, usernameInput])
   
    
    const handleOnSubmit = async (event) => {
        const csrftoken = Cookies.get('csrftoken')

        const username_and_password_are_filled = usernameInput !== '' && passwordInput !== ''
        const user_pressed_enter_key = event.key === 'Enter'
        const user_pressed_submit_button = event.target.tagName === 'FORM'

        if (username_and_password_are_filled && user_pressed_enter_key || user_pressed_submit_button) {
            await fetch(`${BASE_URL}/auth/token-get/`, {
                method:'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({ username: usernameInput, password: passwordInput })
            })
            
            .then(response => response.json())
            .then(data => (
                setLoginData(data)
            ))
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
                    <p className="text-muted">Need an account? <a href="/register" className="ml-2" >Sign up</a></p>
                </Form.Field>
                {/* If both fields were filled -> show undisabled button */}
                {(allowButton) ? (
                    <Button className="submit-button" type='submit' primary>Login</Button>
                ) : (
                    <Button disabled className="submit-button" type='submit' primary>Login</Button>
                )}
            </Form>
        </div>
    )
}

export default Login

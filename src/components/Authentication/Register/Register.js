import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { Button, Form, Message } from 'semantic-ui-react'

import { USER_REGISTER_MUTATION } from '../../Api/user'
import './Register.css'


const Register = () => {
  const [ usernameInput, setUsernameInput ] = useState('') 
  const [ emailInput, setEmailInput ] = useState('') 
  const [ passwordInput, setPasswordInput ] = useState('') 
  const [ passwordConfirmInput, setPasswordConfirmInput ] = useState('') 
  
  const history = useHistory()
  const [ allowButton, setAllowButton ] = useState(false)
  const [ message, setMessage ] = useState({type: '', text: []}) 
  const [ registerUser, { data } ] = useMutation(USER_REGISTER_MUTATION);

  useEffect(() => {
    // Set message TO DEFAULT
    setMessage({type: '', text: []}) //Reset previous state
    
    if (data) {
      // Set message to var
      const messageBoolean = data.register.success
      
      if (messageBoolean === false) {
        // Set the errors messages to var
        const errors = Object.entries(data.register.errors)
        
        errors.map(error => {
          const messageError = error[1][0].message
          
          // Set the message with previous message
          return setMessage((prevState) => ({
            type: 'error',
            text: [...prevState.text, messageError]
          }))
        })
      }
      
      else {
        history.push('/login')
      }
    }
  }, [data, history])
  
  const handleOnClick = async (event) => {
    const user_pressed_enter = event.key === 'Enter'
    const user_submited_button = event.target.tagName === 'FORM'
    const all_fields_are_filled = (
      usernameInput !== '' && emailInput !== '' && passwordInput !== '' && passwordConfirmInput !== ''
    )

    if ((all_fields_are_filled && user_pressed_enter) || user_submited_button) {
        await registerUser({ variables: {
          username: usernameInput, email: emailInput,
          password1: passwordInput, password2: passwordConfirmInput
      }})
    }
  }
  
  //check if username, email, password and 2nd password were filled
  useEffect(() => {
    const all_fields_are_filled = (
      usernameInput !== '' && emailInput !== '' && passwordInput !== '' && passwordConfirmInput !== ''
    )

    if (all_fields_are_filled) {
      setAllowButton(true)
    }

    else {
      setAllowButton(false)
    }
  }, [usernameInput, emailInput, passwordInput, passwordConfirmInput])


  return (
    <div className="register-container">
      {(message.type) ? (
        <Message
          className="error-message-container"
          error
          header="There was some errors with your submission"
          list={message.text}
        />
        ) : null }
      <Form onSubmit={handleOnClick}>
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
          <label>Email</label>
          <input
            onChange={event => setEmailInput(event.target.value)}
            value={emailInput}
            autoComplete="one-time-code"
            maxLength="50"
            placeholder='Email' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            onChange={event => setPasswordInput(event.target.value)}
            value={passwordInput}
            autoComplete="one-time-code"
            type="password"
            maxLength="30"
            placeholder='Password' />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input
            onChange={event => setPasswordConfirmInput(event.target.value)}
            value={passwordConfirmInput}
            autoComplete="one-time-code"
            type="password"
            maxLength="30"
            placeholder='Confirm Password' />
        </Form.Field>
        <Form.Field>
          <p className="text-muted">
            Already have an account? <a href="/login" className="ml-2" >Sign in</a>
          </p>
        </Form.Field>
        <Button disabled className="submit-button" type='submit' primary>Register</Button>
      </Form>
    </div>
  )
}

export default Register

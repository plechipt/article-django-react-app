import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { Button, Form, Message } from 'semantic-ui-react'

import { USER_REGISTER_MUTATION } from '../../Api/user'
import './Register.css'

//const authenticationList = ['username', 'email', 'password', 'passwordConfirm']

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
    //Set default message
    setMessage({type: '', text: []}) //Reset previous state
    
    if (data) {
      //set message to var
      const messageBoolean = data.register.success
      
      if (messageBoolean === false) {
        //set the errors messages to var
        const errors = Object.entries(data.register.errors)
        
        //loop all error messages
        errors.map(error => {
          //get the error message
          const messageError = error[1][0].message
          
          //set the message with previous message
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
  }, [data])
  
  const handleOnClick = (event) => {
    //if username and email and password and confirm passwowrd are filled and user hit enter or create button
    if (
      (usernameInput !== '' && emailInput && passwordInput !== '' && passwordConfirmInput !== '')
      && (event.key === 'Enter' || event.target.tagName === 'FORM')) {
        registerUser({ variables: {
          username: usernameInput, email: emailInput,
          password1: passwordInput, password2: passwordConfirmInput
      }})
    }
  }
  
  //check if username, email, password and 2nd password were filled
  useEffect(() => {
    if (
      usernameInput !== '' && emailInput !== '' &&
      passwordInput !== '' && passwordConfirmInput !== ''
    ) {
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
          <input onChange={event => setUsernameInput(event.target.value)} value={usernameInput} placeholder='Username' />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input onChange={event => setEmailInput(event.target.value)} value={emailInput} placeholder='Email' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input onChange={event => setPasswordInput(event.target.value)} value={passwordInput} type="password" placeholder='Password' />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input onChange={event => setPasswordConfirmInput(event.target.value)} value={passwordConfirmInput} type="password" placeholder='Confirm Password' />
        </Form.Field>
        <Form.Field>
          <p className="text-muted">Already have an account? <a href="/login" className="ml-2" >Sign in</a></p>
        </Form.Field>
        {/*If both fields were filled -> show undisabled button*/}
        {(allowButton) ? (
          <Button className="submit-button" type='submit' primary>Register</Button>
        ) : (
          <Button disabled className="submit-button" type='submit' primary>Register</Button>
        )}
      </Form>
    </div>
  )
}

export default Register

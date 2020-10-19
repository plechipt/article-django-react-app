import React, { useState, useEffect } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'

import './App.css'
import { USER_REFRESH_TOKEN_MUTATION } from './components/Api/user'

//Additional Components
import Navbar from './components/Additional/Navbar/Navbar'
import Users from './components/Additional/Users/Users'

//Authentication
import Login from './components/Authentication/Login/Login'
import Register from './components/Authentication/Register/Register'

//Posts
import Posts from './components/Posts/Posts/Posts'
import PostDetail from './components/Posts/PostDetail/PostDetail'
import PostCreate from './components/Posts/PostCreate/PostCreate'
import PostEdit from './components/Posts/PostEdit'

//Profiles
import Profile from './components/Profiles/Profile'

//Messages 
import MessagesContainer from './components/Messages/Messages/MessagesContainer'

function App () {
  const history = useHistory()
  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')
  const [ allowUserToEnter, setAllowUserToEnter ]= useState(false)

  const [ verifyToken, { data: tokenData }] = useMutation(USER_REFRESH_TOKEN_MUTATION)

  //verify user's token from localStorage
  useEffect(() => {
    const tokenVerifycation = () => {
      if (token) {
        verifyToken({ variables: { token: token } })
      }
    }
    tokenVerifycation()
  }, [token])

  
  useEffect(() => {
    if (tokenData) {
      const { verifyToken: { success, payload }} = tokenData

      //if success is true and the user from backend is same in frontend
      if (success === true && payload.username === user) {
        setAllowUserToEnter(true)
      }

      else {
        setAllowUserToEnter(false)

      }
    }
  }, [tokenData])

  
  return (
    <div className="App">
      <Navbar />
      <div>
        {(tokenData) ? (
          <div>
            {/*check if verification was successfull and user from localStorage is same from backend*/}
            {(allowUserToEnter) ? (
              <Switch>
                <Route path="/users" component={() => <Users />} />
                <Route path="/message/:chatUser" component={() => <MessagesContainer />} />
                <Route path="/profile/:user" component={() => <Profile />} />
                <Route path="/editPost/:id" component={() => <PostEdit />} />
                <Route path="/createPost" component={() => <PostCreate />} />
                <Route path="/:id" component={() => <PostDetail />} />
                <Route path="/" component={() => <Posts />} />
                {window.location.pathname === '/api/' ? (
                  <>
                    {history.push('/')}
                  </>
                ) : null}
              </Switch>  
            ) : (
              <h1 align="center">Failed to connect</h1>
            )}
          </div>
        ) : (
          <Switch>
            <Route path="/login" component={() => <Login />} />
            <Route path="/register" component={() => <Register />} />
          </Switch>
        ) }
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import Cookies from 'js-cookie'

import './App.css'
import { USER_REFRESH_TOKEN_MUTATION } from './components/Api/user'

//Additional Components
//import Welcome from './components/Additional/Welcome/Welcome'
import Navbar from './components/Additional/Navbar/Navbar'
import Users from './components/Additional/Users/Users'
import Support from './components/Additional/Support/Support'
import SupportSuccess from './components/Additional/Support/SupportSuccess'

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
  const token = Cookies.get('token')

  //current logged in user
  const [ currentUser, setCurrentUser ] = useState('')
  const [ dataToken, setDataToken ] = useState({})

  const [ loading, setLoading ] = useState(false)
  const [ allowUserToEnter, setAllowUserToEnter ]= useState(false)
  const [ darkMode, setDarkMode ] = useState(false)

  const [ verifyToken, { data: tokenData }] = useMutation(USER_REFRESH_TOKEN_MUTATION)

  //verify user's token from cookies
  useEffect(() => {
    const tokenVerifycation = () => {
      if (token) {
        setLoading(true)
        verifyToken({ variables: { token: token } })
      }
    }
    tokenVerifycation()
  }, [token])
  
  useEffect(() => {
    if (tokenData) {
      const { verifyToken: { success, payload }} = tokenData

      //if success is true and the user from backend is same in frontend
      if (success === true) {
        setLoading(false)
        setDataToken(tokenData)
        setCurrentUser(payload.username)
        setAllowUserToEnter(true)
      }

      else {
        setAllowUserToEnter(false)

      }
    }
  }, [tokenData])

  return (
    <div className="light-mode">
      <Navbar currentUser={currentUser} />
        <div>
        {(tokenData) ? (
          <>
            {/*check if verification was successfull and user from cookies is same from backend*/}
            {(loading === false && allowUserToEnter) ? (
              <Switch>
                <Route path="/posts" component={() => <Posts />} />
                <Route path="/users" component={() => <Users />} />
                <Route path="/support" component={() => <Support />} />
                <Route path="/support-success" component={() => <SupportSuccess />} />
                <Route path="/message/:chatUser" component={() => <MessagesContainer currentUser={currentUser} />} />
                <Route path="/profile/:user" component={() => <Profile currentUser={currentUser} />} />
                <Route path="/editPost/:id" component={() => <PostEdit currentUser={currentUser} />} />
                <Route path="/createPost" component={() => <PostCreate currentUser={currentUser} />} />
                <Route path="/:id" component={() => <PostDetail currentUser={currentUser} />} />

              </Switch>  
            ) : (
              <h1 align="center">Failed to connect</h1>
            ) }
          </>
        ) : ( 
          <>
            {loading === false ? (
              <Switch>
                <Route path="/register" component={() => <Register />} />
                <Route path="/" component={() => <Login />} />
              </Switch>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export default App;

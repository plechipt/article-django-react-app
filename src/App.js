import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import './App.css'
import { USER_ME_QUERY } from './components/Api/user'

//import components from index.js
import { 
  Navbar, Users, Support, SupportSuccess, Login, Register,
  Posts, PostDetail, PostCreate, PostEdit, Profile, MessagesContainer
} from './components';

function App () {
  //current logged in user
  const [ currentUser, setCurrentUser ] = useState(null)
  const { data: meQuery, loading } = useQuery(USER_ME_QUERY)


  useEffect(() => {
    if (meQuery && meQuery.me) {
      setCurrentUser(meQuery.me.username)
    }
  }, [meQuery]) 


  return (
    <div className="light-mode">
      <Navbar currentUser={currentUser} />
        <div>
          {currentUser && loading === false ? (
            <>
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
            </>
          ) : (
            <>
              {loading === false ? (
                <Switch>
                  <Route path="/register" component={() => <Register />} />
                  <Route path="/" component={() => <Login />} />
                </Switch>
              ) : null }
            </>
          )}
      </div>
    </div>
  );
}

export default App;

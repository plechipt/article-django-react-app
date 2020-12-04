import { useQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
// Import components from index.js
import {
  EditPost,
  Login,
  MessagesContainer,
  Navbar,
  PostCreate,
  PostDetail,
  Posts,
  Profile,
  Register,
  Support,
  SupportSuccess,
  Users,
} from "./components";
import { USER_ME_QUERY } from "./components/Api/user";

function App() {
  // Current logged in user
  const [currentUser, setCurrentUser] = useState(null);
  const { data: meQuery, loading } = useQuery(USER_ME_QUERY);

  useEffect(() => {
    if (meQuery && meQuery.me) {
      setCurrentUser(meQuery.me.username);
    }
  }, [meQuery]);

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
              <Route
                path="/support-success"
                component={() => <SupportSuccess />}
              />
              <Route
                path="/message/:chatUser"
                component={() => (
                  <MessagesContainer currentUser={currentUser} />
                )}
              />
              <Route
                path="/profile/:user"
                component={() => <Profile currentUser={currentUser} />}
              />
              <Route
                path="/editPost/:id"
                component={() => <EditPost currentUser={currentUser} />}
              />
              <Route
                path="/createPost"
                component={() => <PostCreate currentUser={currentUser} />}
              />
              <Route
                path="/:id"
                component={() => <PostDetail currentUser={currentUser} />}
              />
            </Switch>
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

import { useQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
// Import components from index.js
import { Login, Navbar, Register } from "./components";
import { USER_ME_QUERY } from "./components/Api/user";
import Routes from "./Routes";

function App() {
  // Current logged in user
  const [currentUser, setCurrentUser] = useState(null);
  const { data: meQuery, loading } = useQuery(USER_ME_QUERY, {
    fetchPolicy: "no-cache",
  });

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
              <Routes currentUser={currentUser} />
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

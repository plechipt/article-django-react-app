import { useQuery } from "@apollo/react-hooks";
import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Additional/Navbar/Navbar";
import { USER_ME_QUERY } from "./components/Api/user";
import { UserContext } from "./components/UserContext";
import Routes from "./Routes";

const Login = lazy(() => import("./components/Authentication/Login/Login"));
const Register = lazy(() =>
  import("./components/Authentication/Register/Register")
);

function App() {
  // Current logged in user
  const [user, setUser] = useState("TestUser");
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const { data: meQuery, loading } = useQuery(USER_ME_QUERY, {
    fetchPolicy: "network-only",
  });

  // Set user to memory
  useEffect(() => {
    if (meQuery && meQuery.me) {
      setUser(meQuery.me.username);
    }
  }, [meQuery]);

  return (
    <div className="light-mode">
      <Navbar user={user} />
      <div>
        {user && loading === false ? (
          <>
            <UserContext.Provider value={value}>
              <Routes />
            </UserContext.Provider>
          </>
        ) : (
          <>
            {loading === false ? (
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route path="/register" component={() => <Register />} />
                  <Route path="/" component={() => <Login />} />
                </Switch>
              </Suspense>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export default App;

import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { onError } from "apollo-link-error";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
// Import components from index.js
import { Login, Navbar, Register } from "./components";
import {
  USER_ME_QUERY,
  USER_REFRESH_TOKEN_SILENTLY_MUTATION,
} from "./components/Api/user";
import Routes from "./Routes";

function App() {
  // Current logged in user
  const [currentUser, setCurrentUser] = useState(null);

  const [refreshToken] = useMutation(USER_REFRESH_TOKEN_SILENTLY_MUTATION);
  const { data: meQuery, loading } = useQuery(USER_ME_QUERY, {
    fetchPolicy: "network-only",
  });

  // Set user to memory
  useEffect(() => {
    if (meQuery && meQuery.me) {
      setCurrentUser(meQuery.me.username);
    }
  }, [meQuery]);

  // Handle on access token expiration
  onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((error) => {
        const errorName = error.extensions.code;

        if (errorName === "UNAUTHENTICATED") {
          refreshToken();

          const oldHeaders = operation.getContext().headers;
          operation.setContext({
            headers: {
              ...oldHeaders,
            },
          });

          return forward(operation);
        }
      });
    }
  });

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

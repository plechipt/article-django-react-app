import { setContext } from "@apollo/client/link/context";
import {
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/react-hooks";
import ApolloClient from "apollo-client";
import Cookies from "js-cookie";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import {
  checkIfUserIsLoggedIn,
  refreshTokenSilently,
} from "./components/fetchEndpoint";

const BASE_URL = "http://127.0.0.1:8000";
//const BASE_URL = 'https://article-django-react-app.herokuapp.com'

// Refresh access token if it expired
const customFetch = async (uri, options) => {
  const date = new Date();
  const tokenExpiration = Cookies.get("tokenExpiration");

  const tokenExpired = tokenExpiration < date.getTime();
  const userIsNotAuthenticated = await checkIfUserIsLoggedIn();

  if (tokenExpired && userIsNotAuthenticated) {
    await refreshTokenSilently();
  }

  return fetch(uri, options);
};

const httpLink = createHttpLink({
  uri: `${BASE_URL}/graphql/`,
  credentials: "include",
  fetch: customFetch,
});

// Access token is send through httponly cookie
const authLink = setContext((_, { headers }) => {
  // Get csrftoken from Cookies
  const csrftoken = Cookies.get("csrftoken");
  const apiKey = process.env.REACT_APP_API_KEY;

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: apiKey,
      "X-CSRFToken": csrftoken,
      //"Content-Type": "application/javascript",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          filterPost: {
            merge: false,
          },
        },
      },
    },
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

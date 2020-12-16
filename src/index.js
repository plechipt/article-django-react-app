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

const MINUTES_IN_DAY = 1440;
const EXPIRATION_DATE = (1 / MINUTES_IN_DAY) * 10;
const BASE_URL = "http://127.0.0.1:8000";
//const BASE_URL = 'https://article-django-react-app.herokuapp.com'

// Refresh access token if it expired
const customFetch = async (uri, options) => {
  const date = new Date();
  const tokenExpiration = Cookies.get("tokenExpiration");
  const csrftoken = Cookies.get("csrftoken");

  if (tokenExpiration < date.getTime()) {
    // Cannot use useMutation, because its not in component
    await fetch(`${BASE_URL}/graphql/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        query: `
          mutation refreshTokenSilently {
            refreshToken {
              payload
              success
              errors
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const expirationDate = data.payload.exp * 1000;
          Cookies.set("tokenExpiration", expirationDate, {
            expires: EXPIRATION_DATE,
          });
        }
      });
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

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "X-CSRFToken": csrftoken,
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

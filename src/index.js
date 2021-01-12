import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import {
  refreshTokenSilently,
  verifyAccessToken,
} from "./components/fetchEndpoint";

//const BASE_URL = "http://127.0.0.1:8000";
const BASE_URL = "https://kubova-uzasna-socialni-sit.com";

// Verify if access token expired
const customFetch = async (uri, options) => {
  const tokenExpired = await verifyAccessToken();

  if (tokenExpired === "true") {
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

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Cookies from "js-cookie";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { refreshTokenSilently } from "./components/fetchEndpoint";

const BASE_URL = "http://127.0.0.1:8000";
//const BASE_URL = "https://article-django-react-app.herokuapp.com";

const httpLink = createHttpLink({
  uri: `${BASE_URL}/graphql/`,
  credentials: "include",
});

const refreshAccessToken = onError(({ networkError, operation, forward }) => {
  if (networkError.statusCode === 401) {
    return fromPromise(
      refreshTokenSilently().then(() => {
        const oldHeaders = operation.getContext().headers;
        console.log(oldHeaders);

        operation.setContext({
          headers: {
            ...oldHeaders,
          },
        });
        return forward(operation);
      })
    );
  }
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
    },
  };
});

const client = new ApolloClient({
  link: refreshAccessToken.concat(authLink.concat(httpLink)),
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

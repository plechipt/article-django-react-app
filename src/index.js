import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom'
import ApolloClient from 'apollo-client';
import { ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/react-hooks';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie'

const API_PATH = process.env.REACT_APP_API_PATH

const httpLink = new createHttpLink({
  uri: 'http://127.0.0.1:8000/graphql/'
});;

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});;


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <Router>
          <App />
        </Router>
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

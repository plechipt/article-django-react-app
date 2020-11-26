import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import ApolloClient from 'apollo-client';
import { BrowserRouter as Router } from 'react-router-dom'
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/react-hooks';

import Cookies from 'js-cookie'


const httpLink = createHttpLink({
  uri: 'https://article-django-react-app.herokuapp.com/graphql/',
  credentials: 'include'
})

// access token is send through httponly cookie
const authLink = setContext((_, { headers }) => {
  // get csrftoken from Cookies
  const csrftoken = Cookies.get('csrftoken')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'Host': 'domake.io',
      'X-CSRFToken': csrftoken,
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

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

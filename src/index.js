import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

//require('dotenv').config()
//const API_PATH = process.env.REACT_APP_API_PATH

const apiClient = new ApolloClient({
  uri: `https://article-django-react-app.herokuapp.com/api/`,
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apiClient}>
        <Router>
          <App />
        </Router>
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

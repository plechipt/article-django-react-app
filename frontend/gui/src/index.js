import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const apiClient = new ApolloClient({
  uri: 'http://127.0.0.1:8000/api/',
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

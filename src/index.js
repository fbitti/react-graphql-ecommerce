// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import App from './App';

const root = document.getElementById('root');

if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

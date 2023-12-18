// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import App from './App';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const root = document.getElementById('root');

if (!root) {
  throw new Error("Root element not found");
}

// Create a custom theme (optional)
const theme = createTheme({
  // You can customize your theme here.
  // For example, you might want to set your primary and secondary colors.
});

ReactDOM.createRoot(root).render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>
);

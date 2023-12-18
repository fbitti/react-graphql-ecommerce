import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      name
    }
  }
`;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { username, password } });
      
      // Save user data to local storage
      localStorage.setItem('user', JSON.stringify(data.login));

      // Call onLogin and navigate
      onLogin(data.login);
      navigate('/'); // Redirect to the catalog
    } catch (error) {
      console.error('Error logging in:', error);
      // The error message will be displayed, and the user will stay on the login page
    }
  };

  const navigate = useNavigate();

  return (
    <Paper style={{ padding: 16, maxWidth: 400, margin: "auto" }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleLoginSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          Login
        </Button>
      </form>
      {error && <Typography color="error">Error logging in. Please try again.</Typography>}
    </Paper>
  );
};

export default Login;
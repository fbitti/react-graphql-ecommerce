import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
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
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
      {error && <p>Error logging in. Please try again.</p>}
    </div>
  );
};

export default Login;
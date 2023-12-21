import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import UserContext from '../UserContext';

const NavigationBar = ({ onLogout }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const user = useContext(UserContext); // Ensure this is correctly set

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          GraphQL eCommerce
        </Typography>
        {currentPath !== '/' && (
          <Button component={NavLink} to="/" color="inherit">
            Home
          </Button>
        )}
        {!user ? (
          currentPath !== '/login' && (
            <Button color="inherit" component={NavLink} to="/login">
              Login
            </Button>
          )
        ) : (
          <>
            <Typography variant="subtitle1" component="div" sx={{ marginLeft: 2, marginRight: 2 }}>
              Welcome, {user.name}
            </Typography>
            {currentPath !== '/cart' && (
              <Button color="inherit" component={NavLink} to="/cart">
                Cart
              </Button>
            )}
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;

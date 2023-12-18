import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Catalog from './components/Catalog';
import Login from './components/Login';
import Cart from './components/Cart';
import UserContext from './UserContext';
import { AppBar, Toolbar, Typography, Button, Link } from '@mui/material';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user data in local storage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    // Remove user data from local storage
    localStorage.removeItem('user');
    // Reset user in state
    setUser(null);
  };


  return (
    <div className="App">
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              GraphQL E-Commerce Site
            </Typography>
            <Link component={NavLink} to="/" color="inherit">
              Home
            </Link>
            {!user ? (
              <Button color="inherit" component={NavLink} to="/login">
                Login
              </Button>
            ) : (
              <div>
                <Button color="inherit" component={NavLink} to="/cart">
                  Cart
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <UserContext.Provider value={user}>
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            {user && (
              <Route path="/cart" element={<Cart userId={user.id} userName={user.name} />} />
            )}
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

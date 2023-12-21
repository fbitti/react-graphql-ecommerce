import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catalog from './components/Catalog';
import Login from './components/Login';
import Cart from './components/Cart';
import UserContext from './UserContext';
import NavigationBar from './components/NavigationBar'; // Make sure this is imported

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
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={user}>
          <NavigationBar onLogout={handleLogout} />
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

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Catalog from './components/Catalog';
import Login from './components/Login';
import Cart from './components/Cart';
import UserContext from './UserContext';

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
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!user ? (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ) :
            (
              <div>
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </div>
            )}
          </ul>
        </nav>
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

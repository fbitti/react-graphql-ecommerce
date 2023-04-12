import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Catalog from './components/Catalog';
import Login from './components/Login';
import Cart from './components/Cart';
import UserContext from './UserContext';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Catalog</Link>
            </li>
            {!user && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {user && (
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            )}
          </ul>
        </nav>
        <UserContext.Provider value={user}>
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Catalog />
                ) : (
                  <Login onLogin={(loggedInUser) => handleLogin(loggedInUser)} />
                )
              }
            />
            {user && (
              <Route path="/cart" element={<Cart userId={user.id} />} />
            )}
            {!user && (
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
            )}
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

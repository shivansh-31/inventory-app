// src/App.js
import React, { useState } from "react";
import Inventory from "./Inventory";
import Login from "./Login"; // Login component banayenge

function App() {
  const [user, setUser] = useState(null); // User state

  const handleLogin = (username) => {
    setUser(username); // Login ke baad user set
  };

  const handleLogout = () => {
    setUser(null); // Logout → wapas login page
  };

  return (
    <div className="App">
      {user ? (
        <Inventory onLogout={handleLogout} /> // ✅ Inventory + Logout
      ) : (
        <Login onLogin={handleLogin} /> // ✅ Login page show
      )}
    </div>
  );
}

export default App;

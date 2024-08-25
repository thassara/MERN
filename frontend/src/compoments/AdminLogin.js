import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ onLogin, userType }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default login

    // Dummy logic - Replace with backend logic
    // Assume StoredRole is fetched based on the username and password
    const StoredRole = "General"; // Example stored role, replace with real logic

    if (username && password) {
        if (role === "Stock") {
            if (StoredRole === "Stock" || StoredRole === "General") {
                navigate('/StockDashBoardPage'); // Redirect
            } else {
                alert("Access denied. Incorrect role.");
            }
        } else if (role === "Deputy") {
            if (StoredRole === "Deputy" || StoredRole === "General") {
                navigate('/DMChoose'); // Redirect
            } else {
                alert("Access denied. Incorrect role.");
            }
        } else if (role === "Plant") {
            if (StoredRole === "Plant" || StoredRole === "General") {
                navigate('/PMChoose'); // Redirect
            } else {
                alert("Access denied. Incorrect role.");
            }
        } else if (role === "General") {
            navigate('/GMChoose'); // Redirect
        } else {
            alert("Invalid role selected.");
        }
    } else {
        alert("Please enter both username and password.");
    }
  };

  return (
    <div>
      <h2>{userType} Login Page</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="Stock">Stock</option>
            <option value="Deputy">Deputy</option>
            <option value="Plant">Plant</option>
            <option value="General">General</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;

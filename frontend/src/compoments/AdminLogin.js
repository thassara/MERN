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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',height: '70vh'}}>
      <div>
        <style>
          {`
          .AdminLoginBox {
              border-radius: 15px;
              border: 3px solid #031f42;
              width: 100%;
              max-width: 400px;
              padding: 20px;
              font-weight: bold;
              background-color: #f4f4f4;
          }
          `}
        </style>
      </div>
      <div className="AdminLoginBox">
        <h2 style={{ textAlign: 'center' }}>{userType} Login Page</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            />
          </div>
          <div>
            <label>Role:</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            >
              <option value="">Select Role</option>
              <option value="Stock">Stock</option>
              <option value="Deputy">Deputy</option>
              <option value="Plant">Plant</option>
              <option value="General">General</option>
            </select>
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', marginTop: '16px', fontSize: '16px',borderRadius : '15px' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;

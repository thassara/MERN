import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SMLogin({ onLogin, userType }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default login

    // Dummy logic (need replace in backend)
    if (username && password) {
      navigate('/AdminChoose/StockDashBoard'); // Redirect
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default SMLogin;
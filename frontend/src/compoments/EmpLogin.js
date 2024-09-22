import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmpLogin() {
  const [empID, setEmpID] = useState('');  // EmpID as username
  const [passKey, setPassKey] = useState('');  // PassKey as password
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8070/api/employees/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ empID, passKey }), // Send EmpID and PassKey
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          navigate('/EmployeeDashboardPage'); // Redirect to dashboard on success
        } else {
          setError(data.message); // Show error message
        }
      } else {
        const errorText = await response.text();
        setError('Login failed: ' + errorText);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Error during login: ' + error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <div className="EmpLoginBox">
        <style>
          {`
            .EmpLoginBox {
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
        <h2 style={{ textAlign: 'center' }}>Employee Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <label>Employee ID:</label>
            <input 
              type="text" 
              value={empID} 
              onChange={(e) => setEmpID(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            />
          </div>
          <div>
            <label>PassKey:</label>
            <input 
              type="password" 
              value={passKey} 
              onChange={(e) => setPassKey(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            />
          </div>
          <button 
            type="submit" 
            style={{ width: '100%', padding: '10px', marginTop: '16px', fontSize: '16px', borderRadius: '15px' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmpLogin;

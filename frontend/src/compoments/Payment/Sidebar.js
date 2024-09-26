import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleMouseEnter = (buttonName) => setHoveredButton(buttonName);
  const handleMouseLeave = () => setHoveredButton(null);

  // Function to navigate to the Handle Expenses page
  const navigateToExpenses = () => {
    navigate('/Handlepayment'); // Use navigate instead of history.push
  };
  const navigateToaddpaymentform = () => {
    navigate('/Addpaymentform'); // Use navigate instead of history.push
  };
  const navigateTomanagerprofile = () => {
    navigate('/PMprofile'); // Use navigate instead of history.push
  }

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.sidebarHeader}>Dashboard</h2>
      <button
        style={hoveredButton === 'profile' ? { ...styles.button, ...styles.buttonHover } : styles.button}
        onMouseEnter={() => handleMouseEnter('profile')}
        onMouseLeave={handleMouseLeave}
        onClick={navigateTomanagerprofile} 
      >
        Profile
      </button>


      <button
        style={hoveredButton === 'expenses' ? { ...styles.button, ...styles.buttonHover } : styles.button}
        onMouseEnter={() => handleMouseEnter('expenses')}
        onMouseLeave={handleMouseLeave}
        onClick={navigateToExpenses} 
      >
        Handle Expenses
      </button>


      <button
        style={hoveredButton === 'notifications' ? { ...styles.button, ...styles.buttonHover } : styles.button}
        onMouseEnter={() => handleMouseEnter('notifications')}
        onMouseLeave={handleMouseLeave}
      >
        See My Notifications
      </button>


      <button
        style={hoveredButton === 'logout' ? { ...styles.logoutButton, ...styles.logoutHover } : styles.logoutButton}
        onMouseEnter={() => handleMouseEnter('logout')}
        onMouseLeave={handleMouseLeave}
      >
        LOGOUT
      </button>
      
      <button     onClick={navigateToaddpaymentform} >
      <p>paymentform</p>
     
      </button>
      
    </div>
  );
};

// Styles remain unchanged
const styles = {
  sidebar: {
    width: '250px',
    backgroundColor: '#f5f5f5',
    height: '100vh',
    padding: '30px 20px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  },
  sidebarHeader: {
    marginBottom: '20px',
    fontSize: '22px',
    color: '#333',
    fontWeight: 'bold',
  },
  button: {
    display: 'block',
    width: '100%',
    margin: '15px 0',
    padding: '12px',
    backgroundColor: '#424242',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#616161',
  },
  logoutButton: {
    display: 'block',
    width: '100%',
    marginTop: '30px',
    padding: '12px',
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  logoutHover: {
    backgroundColor: '#e57373',
  },
};

export default Sidebar;

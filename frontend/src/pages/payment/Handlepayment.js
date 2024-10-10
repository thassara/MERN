import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseForm from '../../compoments/Payment/ExpenseForm';
import ExpenseList from '../../compoments/Payment/ExpenseList';
import Sidebar from '../../compoments/Payment/Sidebar';



function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:8070/expenses/all');
      setExpenses(res.data);
    } catch (error) {
      console.error('Error fetching expenses', error);
    }
  };

  const handleExpenseAdded = () => {
    fetchExpenses(); // Refresh the expense list after adding a new expense
  };

  useEffect(() => {
    fetchExpenses(); // Fetch expenses on component mount
  }, []);

  return (
    <div style={styles.app}>
      <div style={styles.layout}>
        <Sidebar />
        <div style={styles.mainContent}>
          <h2 style={styles.title}>Manage Your Expenses</h2>
          <div style={styles.container}>
            <ExpenseForm onExpenseAdded={handleExpenseAdded} />
            <ExpenseList expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  app: {
    textAlign: 'center',
    backgroundColor: '#f0f0f5',
    minHeight: '100vh',
    fontFamily: "'Roboto', sans-serif",
    padding: '20px',
  },
  layout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '20px',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // Space between form and list
  },
};

export default App;

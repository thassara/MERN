import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onExpenseAdded }) => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newExpense = { itemName, price: Number(price) };
      await axios.post('http://localhost:8070/expenses/add', newExpense);
      alert('Expenses added successfully');
      onExpenseAdded(); // Notify parent to refresh the expense list
      setItemName(''); // Clear input fields
      setPrice('');
      setSuccessMessage('Expense added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.error('Error adding expense', error);
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item Name"
          style={styles.input}
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price (RS)"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Add Expense
        </button>
      </form>
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
    </div>
  );
};

const styles = {
  formContainer: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  input: {
    display: 'block',
    padding: '10px',
    margin: '10px 0',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  successMessage: {
    marginTop: '10px',
    color: '#28a745',
    fontWeight: 'bold',
  },
};

export default ExpenseForm;

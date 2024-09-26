import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateExpenseForm from './ExpenseUpdateform';
import Modal from './Modal';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:8070/expenses/all');
      setExpenses(res.data);
      calculateTotal(res.data);
    } catch (error) {
      console.error('Error fetching expenses', error);
    }
  };

  //logic for calculating total expenses
  const calculateTotal = (expenses) => {
    const totalPrice = expenses.reduce((sum, expense) => sum + Number(expense.price), 0);
    setTotal(totalPrice);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:8070/expenses/update/${id}`, updatedData);
      alert("Expenses update Successfully");
      fetchExpenses(); // Refresh the list after updating
    } catch (error) {
      console.error('Error updating expense', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/expenses/delete/${id}`);
      alert("Expenses delete Successfully");
      fetchExpenses(); // Refresh the list after deleting
    } catch (error) {
      console.error('Error deleting expense', error);
    }
  };

  const openModal = (expense) => {
    setCurrentExpense(expense);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentExpense(null);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div style={styles.tableContainer}>
      <h2 style={styles.heading}>Expenses List</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Item Name</th>
            <th style={styles.th}>Price (RS)</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td style={styles.td}>{expense.itemName}</td>
              <td style={styles.td}>{expense.price}</td>
              <td style={styles.td}>
                <button onClick={() => openModal(expense)} style={styles.updateButton}>
                  Update
                </button>
                <button onClick={() => handleDelete(expense._id)} style={styles.deleteButton}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" style={styles.totalLabelCell}>
              <strong>Total Balance (RS):</strong>
            </td>
            <td style={styles.totalPriceCell}>
              <strong>{total}</strong>
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Modal for updating expense */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {currentExpense && (
            <UpdateExpenseForm
              expense={currentExpense}
              onUpdate={handleUpdate}
              onClose={closeModal}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

const styles = {
  tableContainer: {
    width: '100%',
    maxWidth: '800px', 
    backgroundColor: '#fff',
    padding: '40px', 
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    margin: '20px auto',
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '24px', 
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  td: {
    padding: '15px',
    border: '1px solid #ddd',
    textAlign: 'center',
    fontSize: '16px',
  },
  totalLabelCell: {
    padding: '15px',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '18px',
    borderTop: '2px solid #4CAF50', 
    backgroundColor: '#f9f9f9', 
  },
  totalPriceCell: {
    padding: '15px',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '18px',
    borderTop: '2px solid #4CAF50', 
    backgroundColor: '#f9f9f9', 
  },
  updateButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '12px 20px', 
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '10px', 
    fontSize: '16px',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '12px 20px', 
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default ExpenseList;

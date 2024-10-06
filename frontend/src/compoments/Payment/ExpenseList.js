import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import UpdateExpenseForm from './ExpenseUpdateform';
import Modal from './Modal';


const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:8070/expenses/all');
      setExpenses(res.data);
      calculateTotal(res.data);
    } catch (error) {
      console.error('Error fetching expenses', error);
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, []);
  const calculateTotal = (expenses) => {
    const totalPrice = expenses.reduce((sum, expense) => sum + Number(expense.price), 0);
    setTotal(totalPrice);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:8070/expenses/update/${id}`, updatedData);
      alert("Expense updated successfully");
      fetchExpenses();
    } catch (error) {
      console.error('Error updating expense', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/expenses/delete/${id}`);
      alert("Expense deleted successfully");
      fetchExpenses();
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

  const generatePDF = () => {
    const doc = new jsPDF();

    // Set title
    doc.setFontSize(18);
    doc.text('Expenses List', 14, 22);

    // Define table columns
    const columns = ['Item Name', 'Price (RS)'];

    // Map filtered expense data to rows for the table
    const filteredExpenses = expenses.filter(expense => 
      expense.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const rows = filteredExpenses.map((expense) => [
      expense.itemName,
      expense.price,
    ]);

    // Add table to PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30, // start after the title
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0] }, // black header background
      styles: { cellPadding: 3, fontSize: 12, halign: 'center' },
    });

    // Add total balance for filtered expenses
    const filteredTotal = filteredExpenses.reduce((sum, expense) => sum + Number(expense.price), 0);
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text(`Total Balance RS: ${filteredTotal} `, 14, finalY);

    // Save the PDF
    doc.save('filtered-expenses-list.pdf');
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  localStorage.setItem('expenses', JSON.stringify(total));

  return (
    <div style={styles.tableContainer}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Expenses List</h2>
        <input
          type="text"
          placeholder="Search by Item Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={generatePDF} style={styles.downloadButton}>
          Download PDF
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Item Name</th>
            <th style={styles.th}>Price (RS)</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.filter(expense => 
            expense.itemName.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((expense) => (
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
              <strong>{expenses.filter(expense => 
                expense.itemName.toLowerCase().includes(searchQuery.toLowerCase())
              ).reduce((sum, expense) => sum + Number(expense.price), 0)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>

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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  heading: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: '24px',
  },
  searchInput: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    marginRight: '10px',
    width: '200px',
    fontSize: '16px',
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
  downloadButton: {
    backgroundColor: '#000',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default ExpenseList;

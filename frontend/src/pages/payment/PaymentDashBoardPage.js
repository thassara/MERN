import React, { useState, useEffect } from 'react';
import Sidebar from '../../compoments/Payment/Sidebar';
import PaymentTable from '../../compoments/Payment/PaymentTable';
import SearchBar from '../../compoments/Payment/SearchBar';
import axios from 'axios';
import '../../style/payment/PaymentDashBoardPage.css';

const PaymentDashBoardPage = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalExpenses, setTotalExpenses] = useState(0); // State to store total expenses

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:8070/payments/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const res = await axios.get('http://localhost:8070/expenses/all');
        const expensesData = res.data;
        const total = expensesData.reduce((sum, expense) => sum + Number(expense.price), 0);
        setTotalExpenses(total); // Set total expenses
      } catch (error) {
        console.error('Error fetching expenses', error);
      }
    };

    fetchPayments();
    fetchExpenses(); // Fetch total expenses when the component mounts
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredPayments = payments.filter((payment) => {
    const idMatch = payment.id && payment.id.toString().toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = payment.email && payment.email.toLowerCase().includes(searchTerm.toLowerCase());
    return idMatch || emailMatch;
  });

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h1 className="dashboard-title">Payment Dashboard</h1>

        {/* Summary section */}
        <div className="balance-summary">
          <div className="summary-card">
            <h3>Total Income</h3>
            <p>Rs. 35,000</p>
          </div>
          <div className="summary-card">
            <h3>Total Expenses</h3>
            {/* Display total expenses */}
            <p>Rs. {totalExpenses}</p>
          </div>
          <div className="summary-card">
            <h3>Available Balance</h3>
            {/* Calculate and display the available balance */}
            <p>Rs. {35000 - totalExpenses}</p>
          </div>
        </div>

        {/* Search bar for filtering payments */}
        <SearchBar onSearch={handleSearch} />

        {/* Payment table showing filtered data */}
        {filteredPayments.length > 0 ? (
          <PaymentTable payments={filteredPayments} />
        ) : (
          <p>No payments found.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentDashBoardPage;

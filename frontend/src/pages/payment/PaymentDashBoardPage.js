import React, { useState, useEffect } from 'react';
import Sidebar from '../../compoments/Payment/Sidebar';
import PaymentTable from '../../compoments/Payment/PaymentTable';
import SearchBar from '../../compoments/Payment/SearchBar';
import '../../style/payment/PaymentDashBoardPage.css';


const PaymentDashBoardPage = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
    fetchPayments();
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
            <p>Rs. 2000</p>
          </div>
          <div className="summary-card">
            <h3>Available Balance</h3>
            <p>Rs. 33,000</p>
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

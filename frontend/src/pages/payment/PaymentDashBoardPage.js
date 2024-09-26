import React, { useState, useEffect } from 'react';
import Sidebar from '../../compoments/Payment/Sidebar';
import PaymentTable from '../../compoments/Payment/PaymentTable';
import SearchBar from '../../compoments/Payment/SearchBar';
import '../../style/payment/PaymentDashBoardPage.css';

function PaymentDashBoardPage() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulating fetching payment data
  useEffect(() => {
    const fetchedPayments = [
      { id: '66f1fe89d8243', total: 'Rs. 30,000', type: 'Slip Upload', status: 'Pending', email: 'Eranga@gmail.com', date: '20/12/2024' },
      { id: '66f8fe89d828a', total: 'Rs. 10,000', type: 'Slip Upload', status: 'Rejected', email: 'Madusha@gmail.com', date: '20/12/2024' },
      { id: '66f1628fe844a', total: 'Rs. 5,000', type: 'Card Payment', status: 'Verified', email: 'Bumal@gmail.com', date: '20/12/2024' },
    ];
    setPayments(fetchedPayments);
  }, []);

  // Function to handle search input
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter payments based on the search term (by ID or email)
  const filteredPayments = payments.filter(
    (payment) =>
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h1 className="dashboard-title">Payment Dashboard</h1>

        {/* Summary section */}
        <div className="balance-summary">
          <div className="summary-card">
            <h3>Total Income</h3>
            <p>Rs. 35000</p>
          </div>
          <div className="summary-card">
            <h3>Total Expenses</h3>
            <p>Rs. 0</p>
          </div>
          <div className="summary-card">
            <h3>Available Balance</h3>
            <p>Rs.35000</p>
          </div>
        </div>

        {/* Search bar for filtering payments */}
        <SearchBar onSearch={handleSearch} />

        {/* Payment table showing filtered data */}
        <PaymentTable payments={filteredPayments} />
      </div>
    </div>
  );
}

export default PaymentDashBoardPage;

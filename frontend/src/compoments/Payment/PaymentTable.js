import React, { useState, useEffect } from 'react';

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:8070/payments');
        const data = await response.json(); // Correctly parse the JSON data
        setPayments(data); // Set the state with the fetched data
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };
    fetchPayments();
  }, []);

  const onVerify = (id) => {
    console.log(`Verify payment with ID: ${id}`);
    // Add your verification logic here
  };

  const onReject = (id) => {
    console.log(`Reject payment with ID: ${id}`);
    // Add your rejection logic here
  };

  const onView = (id) => {
    console.log(`View payment with ID: ${id}`);
    // Add your view logic here
  };

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          
          <th>Customer Name</th>
          <th>Payment ID</th>
          <th>Email</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment) => (
          <tr key={payment.id}>
            <td>{payment.cardHolderName}</td>
            <td>{payment._id}</td>
            <td>{payment.email}</td>
            <td>{payment.expires}</td>
            
            <td>
              <button style={styles.verifyButton} onClick={() => onVerify(payment.id)}>Verify</button>
              <button style={styles.rejectButton} onClick={() => onReject(payment.id)}>Reject</button>
              <button style={styles.viewButton} onClick={() => onView(payment.id)}>View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  verifyButton: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    margin: '0 5px',
  },
  rejectButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    margin: '0 5px',
  },
  viewButton: {
    backgroundColor: '#1e90ff',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    margin: '0 5px',
  },
};

export default PaymentTable;

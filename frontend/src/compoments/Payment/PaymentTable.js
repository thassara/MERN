import React from 'react';

const PaymentTable = ({ payments }) => {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Payment ID</th>
          <th>Total Payment</th>
          <th>Payment Type</th>
          <th>Status</th>
          <th>Email</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment) => (
          <tr key={payment.id}>
            <td>{payment.id}</td>
            <td>{payment.total}</td>
            <td>{payment.type}</td>
            <td>{payment.status}</td>
            <td>{payment.email}</td>
            <td>{payment.date}</td>
            <td>
              <button style={styles.verifyButton}>Verify</button>
              <button style={styles.rejectButton}>Reject</button>
              <button style={styles.viewButton}>View</button>
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

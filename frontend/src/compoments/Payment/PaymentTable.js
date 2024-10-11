import React from 'react';

const PaymentTable = ({ payments, onVerify, onReject, onView }) => {
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
        {payments.length > 0 ? (
          payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.cardHolderName}</td>
              <td>{payment._id}</td>
              <td>{payment.email}</td>
              <td>{payment.date}</td> {/* Assuming 'date' is the correct field for the payment date */}
              <td>
                <button style={styles.verifyButton} onClick={() => onVerify(payment._id)}>Verify</button>
                <button style={styles.rejectButton} onClick={() => onReject(payment._id)}>Reject</button>
                <button style={styles.viewButton} onClick={() => onView(payment._id)}>View</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No payments found.</td>
          </tr>
        )}
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
    cursor: 'pointer',
  },
  rejectButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    margin: '0 5px',
    cursor: 'pointer',
  },
  viewButton: {
    backgroundColor: '#1e90ff',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    margin: '0 5px',
    cursor: 'pointer',
  },
};

export default PaymentTable;

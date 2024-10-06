import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [cardPayments, setCardPayments] = useState([]);
  const [slips, setSlips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPayment, setEditingPayment] = useState(null);
  const [editingSlip, setEditingSlip] = useState(null);
  const [formData, setFormData] = useState({
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    
    bankName: '',
    remark: '',
  });

  useEffect(() => {
    fetchCardPayments();
    fetchSlips();
  }, []);

  const fetchCardPayments = async () => {
    try {
      const response = await axios.get('http://localhost:8070/payments/');
      setCardPayments(response.data);
    } catch (error) {
      setError('Failed to fetch card payments. Please try again later.');
    }
  };

  const fetchSlips = async () => {
    try {
      const response = await axios.get('http://localhost:8070/slips/');
      setSlips(response.data);
    } catch (error) {
      setError('Failed to fetch slips. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePayment = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/payments/${id}`);
      setCardPayments(cardPayments.filter(payment => payment._id !== id));
    } catch (error) {
      setError('Failed to delete payment. Please try again later.');
    }
  };

  const handleDeleteSlip = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/slips/${id}`);
      setSlips(slips.filter(slip => slip._id !== id));
    } catch (error) {
      setError('Failed to delete slip. Please try again later.');
    }
  };

  const handleEditPayment = (payment) => {
    setEditingPayment(payment);
    setFormData({
      cardHolderName: payment.cardHolderName,
      cardNumber: payment.cardNumber,
      expiryDate: payment.expiryDate,
      cvv: payment.cvv,

    });
  };

  const handleEditSlip = (slip) => {
    setEditingSlip(slip);
    setFormData({
      bankName: slip.bankName,
      remark: slip.remark,
    });
  };

  const handleUpdatePayment = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8070/payments/${editingPayment._id}`, formData);
      setCardPayments(cardPayments.map(payment => payment._id === editingPayment._id ? { ...payment, ...formData } : payment));
      setEditingPayment(null);
    } catch (error) {
      setError('Failed to update payment. Please try again later.');
    }
  };

  const handleUpdateSlip = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8070/slips/${editingSlip._id}`, formData);
      setSlips(slips.map(slip => slip._id === editingSlip._id ? { ...slip, ...formData } : slip));
      setEditingSlip(null);
    } catch (error) {
      setError('Failed to update slip. Please try again later.');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Your Payments</h2>
      {error && <div className="error">{error}</div>}

      <div className="payments-section">
        <h3>Card Payments</h3>
        <ul className="payments-list">
          {cardPayments.map(payment => (
            <li key={payment._id} className="payment-item">
              <span>{payment.cardHolderName} - ${payment.amount}</span>
              <div>
                <button className="edit-btn" onClick={() => handleEditPayment(payment)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeletePayment(payment._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="slips-section">
        <h3>Uploaded Slips</h3>
        <ul className="slips-list">
          {slips.map(slip => (
            <li key={slip._id} className="slip-item">
              <span>{slip.bankName} - {slip.remark}</span>
              <div>
                <button className="edit-btn" onClick={() => handleEditSlip(slip)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteSlip(slip._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Payment Modal */}
      {editingPayment && (
        <div className="modal">
          <h3>Edit Payment</h3>
          <form onSubmit={handleUpdatePayment}>
            <input
              type="text"
              placeholder="Card Holder Name"
              value={formData.cardHolderName}
              onChange={(e) => setFormData({ ...formData, cardHolderName: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="CVV"
              value={formData.cvv}
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
              required
            />
            {/* Remove the amount input field */}
            {/* <input
              type="text"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            /> */}
            <div className="modal-actions">
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditingPayment(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Slip Modal */}
      {editingSlip && (
        <div className="modal">
          <h3>Edit Slip</h3>
          <form onSubmit={handleUpdateSlip}>
            <input
              type="text"
              placeholder="Bank Name"
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Remark"
              value={formData.remark}
              onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
            />
            <div className="modal-actions">
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditingSlip(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Internal CSS */}
      <style jsx>{`
  .dashboard {
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 20px auto;
  }

  h2 {
    text-align: center;
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
  }

  .error {
    color: red;
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .payments-section,
  .slips-section {
    margin-bottom: 30px;
  }

  .payments-list,
  .slips-list {
    list-style-type: none;
    padding: 0;
  }

  .payment-item,
  .slip-item {
    background: #fff;
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.3s ease;
  }

  .payment-item:hover,
  .slip-item:hover {
    transform: translateY(-3px);
  }

  .edit-btn,
  .delete-btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 12px;
    margin-left: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .edit-btn:hover {
    background-color: #0056b3;
  }

  .delete-btn {
    background: #dc3545;
  }

  .delete-btn:hover {
    background-color: #b02a37;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  .modal form {
    background: white;
    padding: 30px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    text-align: left;
  }

  .modal form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    transition: border-color 0.3s ease;
  }

  .modal form input:focus {
    border-color: #007bff;
    outline: none;
  }

  .modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .modal-actions button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .modal-actions button:hover {
    background-color: #0056b3;
  }

  .modal-actions button[type="button"] {
    background-color: #6c757d;
  }

  .modal-actions button[type="button"]:hover {
    background-color: #565e64;
  }
`}</style>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import '../../style/delivery/IssueDeliveryForm.css'; 

const IssueDeliveryForm = ({ delivery, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    CusId: '',
    OrderId: '',
    TotalQty: '',
    TotalAmt: '',
    IssueDate: '',
    DeliveryDate: '',
    Status: 'Pending', // Default status
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Populate form data when editing
  useEffect(() => {
    if (delivery) {
      setFormData(delivery);
    }
  }, [delivery]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to parent component (ViewAllDeliveries)
      await onSubmit(formData);
      setSuccessMessage('Issue Delivery submitted successfully');
      setErrorMessage('');
    } catch (error) {
      console.error('Error submitting issue delivery:', error);
      setErrorMessage('Failed to submit the issue delivery. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="issue-delivery-container">
      <h2>{delivery ? 'Edit Issue Delivery' : 'New Issue Delivery'}</h2>

      {/* Display success or error message */}
      {successMessage && <div className="status-message success">{successMessage}</div>}
      {errorMessage && <div className="status-message error">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="issue-delivery-form">
        <label>
          Customer ID:
          <input
            type="number"
            name="CusId"
            value={formData.CusId}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Order ID:
          <input
            type="number"
            name="OrderId"
            value={formData.OrderId}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Total Quantity:
          <input
            type="number"
            name="TotalQty"
            value={formData.TotalQty}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Total Amount:
          <input
            type="number"
            name="TotalAmt"
            value={formData.TotalAmt}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Issue Date:
          <input
            type="date"
            name="IssueDate"
            value={formData.IssueDate}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Delivery Date:
          <input
            type="date"
            name="DeliveryDate"
            value={formData.DeliveryDate}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Status:
          <select
            name="Status"
            value={formData.Status}
            onChange={handleInputChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
          </select>
        </label>

        <button type="submit" className="issue-button">Submit</button>
        <button type="button" className="issue-button-cancel" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default IssueDeliveryForm;
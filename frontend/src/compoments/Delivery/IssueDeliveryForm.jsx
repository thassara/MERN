import React, { useState, useEffect } from 'react';
import '../../style/delivery/IssueDeliveryForm.css';

const IssueDeliveryForm = ({ delivery, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    OrderId: '',
    TotalQty: '',
    TotalAmt: '',
    IssueDate: '',
    DeliveryDate: '',
    Status: 'Pending',
    Location: '', // Added Location field
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (delivery) {
      setFormData(delivery);
    }
  }, [delivery]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.OrderId) {
      newErrors.OrderId = 'Order ID is required';
    } else if (formData.OrderId < 1) {
      newErrors.OrderId = 'Order ID must be a positive number';
    }

    if (!formData.TotalQty) {
      newErrors.TotalQty = 'Total Quantity is required';
    } else if (formData.TotalQty < 0) {
      newErrors.TotalQty = 'Total Quantity cannot be negative';
    }

    if (!formData.TotalAmt) {
      newErrors.TotalAmt = 'Total Amount is required';
    } else if (formData.TotalAmt < 0) {
      newErrors.TotalAmt = 'Total Amount cannot be negative';
    }

    if (!formData.IssueDate) {
      newErrors.IssueDate = 'Issue Date is required';
    }

    if (!formData.DeliveryDate) {
      newErrors.DeliveryDate = 'Delivery Date is required';
    }

    if (!formData.Location) {
      newErrors.Location = 'Location is required'; // Location validation
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await onSubmit(formData);
        setSuccessMessage('Issue Delivery submitted successfully');
        setErrorMessage('');
        setErrors({});
      } catch (error) {
        console.error('Error submitting issue delivery:', error);
        setErrorMessage('Failed to submit the issue delivery. Please try again.');
        setSuccessMessage('');
      }
    } else {
      setErrorMessage('Please fix the errors before submitting.');
    }
  };

  return (
    <div className="issue-delivery-container">
      <h2>{delivery ? 'Edit Issue Delivery' : 'New Issue Delivery'}</h2>

      {successMessage && <div className="status-message success">{successMessage}</div>}
      {errorMessage && <div className="status-message error">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="issue-delivery-form">
        <label>
          Order ID:
          <input
            type="number"
            name="OrderId"
            value={formData.OrderId}
            onChange={handleInputChange}
            required
          />
          {errors.OrderId && <span className="error-message">{errors.OrderId}</span>}
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
          {errors.TotalQty && <span className="error-message">{errors.TotalQty}</span>}
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
          {errors.TotalAmt && <span className="error-message">{errors.TotalAmt}</span>}
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
          {errors.IssueDate && <span className="error-message">{errors.IssueDate}</span>}
        </label>

        <label>
          Delivery Date:
          <input
            type="date"
            name="DeliveryDate"
            value={formData.DeliveryDate}
            onChange={handleInputChange}
            required
          />
          {errors.DeliveryDate && <span className="error-message">{errors.DeliveryDate}</span>}
        </label>

        <label>
          Location:
          <input
            type="text"
            name="Location"
            value={formData.Location}
            onChange={handleInputChange}
            required
          />
          {errors.Location && <span className="error-message">{errors.Location}</span>}
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

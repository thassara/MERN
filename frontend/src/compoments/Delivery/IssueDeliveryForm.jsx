import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../style/delivery/IssueDeliveryForm.css'; // Adjust the path as necessary
import axios from 'axios';

const IssueDeliveryForm = ({ delivery }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    OrderId: '',
    TotalQty: '',
    TotalAmt: '',
    IssueDate: '',
    DeliveryDate: '',
    Status: 'Pending',
    Location: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (delivery) {
      // Set the form data with existing delivery data
      setFormData({
        ...delivery,
        IssueDate: delivery.IssueDate.split('T')[0],
        DeliveryDate: delivery.DeliveryDate.split('T')[0],
      });
    }
  }, [delivery]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Remove validation error for the current field as the user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));

    validateForm({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.OrderId) {
      newErrors.OrderId = 'Order ID is required';
    } else if (data.OrderId < 1) {
      newErrors.OrderId = 'Order ID must be a positive number';
    }

    if (!data.TotalQty) {
      newErrors.TotalQty = 'Total Quantity is required';
    } else if (data.TotalQty < 0) {
      newErrors.TotalQty = 'Total Quantity cannot be negative';
    }

    if (!data.TotalAmt) {
      newErrors.TotalAmt = 'Total Amount is required';
    } else if (data.TotalAmt < 0) {
      newErrors.TotalAmt = 'Total Amount cannot be negative';
    }

    if (!data.IssueDate) {
      newErrors.IssueDate = 'Issue Date is required';
    }

    if (!data.DeliveryDate) {
      newErrors.DeliveryDate = 'Delivery Date is required';
    }

    if (!data.Location) {
      newErrors.Location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm(formData)) {
      try {
        if (delivery) {
          // Prompt for confirmation before updating
          const confirmUpdate = window.confirm("Are you sure you want to update this delivery?");
          if (!confirmUpdate) {
            return; // Exit if the user cancels the update
          }

          // Update existing delivery
          await axios.put(`http://localhost:8070/api/issue-delivery/${delivery._id}`, formData);
          setSuccessMessage('Delivery updated successfully');
          window.alert('Delivery updated successfully!'); // Alert for update success
        } else {
          // Create new delivery (alert after successful creation)
          await axios.post('http://localhost:8070/api/issue-delivery', formData);
          setSuccessMessage('Delivery created successfully');
          window.alert('Delivery created successfully!'); // Alert for new delivery creation
        }
        setErrorMessage('');
        setErrors({});

        // Reset the form after submission
        setFormData({
          OrderId: '',
          TotalQty: '',
          TotalAmt: '',
          IssueDate: '',
          DeliveryDate: '',
          Status: 'Pending',
          Location: '',
        });

        // Navigate to ViewAllDeliveries after submission
        navigate('/ViewAllDeliveries', { replace: true });
      } catch (error) {
        console.error('Error submitting delivery:', error);
        setErrorMessage('Failed to submit delivery. Please try again.');
        setSuccessMessage('');
      }
    } else {
      setErrorMessage('Please fix the errors before submitting.');
    }
  };

  const handleCancel = () => {
    navigate('/ViewAllDeliveries', { replace: true }); // Use replace on cancel
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
        <button type="button" className="issue-button-cancel" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default IssueDeliveryForm;

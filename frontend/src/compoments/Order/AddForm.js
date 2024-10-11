import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [packageType, setPackageType] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!customerName) {
      newErrors.customerName = 'Please enter your name.';
    }

    if (!customerEmail || !/\S+@\S+\.\S+/.test(customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email.';
    }

    if (quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1.';
    }

    if (!packageType) {
      newErrors.packageType = 'Please select a package type.';
    }

    if (!customerNote) {
      newErrors.customerNote = 'Please add a customer note.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) {
      return;
    }

    const orderData = {
      customerName,
      customerEmail,
      quantity,
      packageType,
      customerNote,
      date,
    };

    localStorage.setItem('orderData', JSON.stringify(orderData));
    navigate(`/Or_Add/order-details`);
  };

  return (
    <div>
      <style>
        {`
        body{background-color:#e6eee4;}
        .Or_addcard {
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
          transition: 0.3s;
          width: 50%; 
          max-width: 1200px; 
          margin: 0 auto; 
          padding: 2rem; 
          background-color: #fff; 
          border-radius: 8px;
          text-align: center;
          margin-bottom:2rem;
          margin-top:2rem;
        }

        .Or_addhead {
          text-align: center;
        }

        .or_addform {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top:50px;
        }

        .or_form-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 1rem;
          width: 100%;
          max-width: 600px;
        }

        .or_addleable {
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .or_form-group input, select, textarea {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 100%;
        }

        .or_addtextarea {
          height: 100px;
          resize: vertical;
        }

        .or_addbuttonx {
          padding: 0.7rem 1.5rem;
          border: none;
          background-color: #7289d5;
          color: white;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-top: 1rem;
        }

        .or_addbuttonx:hover {
          background-color: #385cd2;
        }

        .or_error-message {
          color: red;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          border: 1px solid red;
          padding: 0.5rem;
          border-radius: 4px;
          width: 100%;
          background-color: #fdecea;
        }
        `}
      </style>

      <div className="Or_addcard">
        <h2 className="Or_addhead">Place Your Order</h2>
        <form className="or_addform" onSubmit={(e) => e.preventDefault()}>
          <div className="or_form-group">
            <label className="or_addleable" htmlFor="customerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
            {errors.customerName && <div className="or_error-message">{errors.customerName}</div>}
          </div>

          <div className="or_form-group">
            <label className="or_addleable" htmlFor="customerEmail">Your Email:</label>
            <input
              type="email"
              id="customerEmail"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
            {errors.customerEmail && <div className="or_error-message">{errors.customerEmail}</div>}
          </div>

          <div className="or_form-group">
            <label className="or_addleable" htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
            />
            {errors.quantity && <div className="or_error-message">{errors.quantity}</div>}
          </div>

          <input
            hidden
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <div className="or_form-group">
            <label className="or_addleable" htmlFor="packageType">Package Type:</label>
            <select
              id="packageType"
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
              required
            >
              <option value="">Select a package</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
              <option value="custom">Custom</option>
            </select>
            {errors.packageType && <div className="or_error-message">{errors.packageType}</div>}
          </div>

          <div className="or_form-group">
            <label className="or_addleable" htmlFor="customerNote">Customer Note:</label>
            <textarea
              className="or_addtextarea"
              id="customerNote"
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              required
            />
            {errors.customerNote && <div className="or_error-message">{errors.customerNote}</div>}
          </div>

          <button className="or_addbuttonx" type="submit" onClick={handleNext}>
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;

import React, { useState } from 'react';

const OrderForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [packageType, setPackageType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderData = {
      customerName,
      quantity,
      packageType,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Handle successful order submission
        alert('Order submitted successfully!');
      } else {
        // Handle error in order submission
        alert('Failed to submit order.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div>
      <h2>Order Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="packageType">Package Type:</label>
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
        </div>
        <br />
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default OrderForm;

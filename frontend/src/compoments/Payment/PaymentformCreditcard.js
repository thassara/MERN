import React, { useState } from 'react';

const PaymentForm = () => {
  const [paymentType, setPaymentType] = useState('Card Payment');

  const renderForm = () => {
    if (paymentType === 'Card Payment') {
      return (
        <form className="payment-form">
          <h2>Fill your Card Payment details</h2>
          <div className="form-Details">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" placeholder="eranga@gmail.com" required />
          </div>
          <div className="form-Details">
            <label htmlFor="name">Holder Name</label>
            <input type="text" id="name" placeholder="Card Holder Name" required />
          </div>
          <div className="form-Details">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              placeholder="3421 2345 2134 1234"
              required
            />
          </div>
          <div className="form-Details">
            <label htmlFor="expires">Expires</label>
            <input type="text" id="expires" placeholder="MM/YY" required />
          </div>
          <div className="form-Details">
            <label htmlFor="cvv">CVV</label>
            <input type="text" id="cvv" placeholder="678" required />
          </div>
          <button type="submit" className="payment-button">Make Payment</button>
        </form>
      );
    } else if (paymentType === 'Slip Upload') {
      return (
        <form className="payment-form">
          <h2>Upload Payment Slip</h2>
          <div className="form-Details">
        
            <label htmlFor="Bankname">Enter money deposit bank Name</label>
            <input type="text" id="Bankname" placeholder="sampath bank" required />
            <label htmlFor="Remark">Remark</label>
            <input type="text" id="Remark" placeholder="name or anything" required />
         
            <label htmlFor="slipUpload">Upload Payment Slip</label>
            <input type="file" id="slipUpload" required />
          </div>
          <button type="submit" className="payment-button">Submit Slip</button>
        </form>
      );
    }
  };

  return (
    <div className="payment-UI">
      <h2>Select Your Payment Type</h2>
      <div className="payment-type-selector">
        <button
          className={paymentType === 'Card Payment' ? 'active' : ''}
          onClick={() => setPaymentType('Card Payment')}
        >
          Card Payment
        </button>
        <button
          className={paymentType === 'Slip Upload' ? 'active' : ''}
          onClick={() => setPaymentType('Slip Upload')}
        >
          Slip Upload
        </button>
      </div>
      {renderForm()}
    </div>
  );
};

export default PaymentForm;

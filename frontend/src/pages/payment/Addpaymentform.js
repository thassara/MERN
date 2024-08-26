import React from 'react';
import '../../style/payment/Addpayment.css';

function App() {
  return (
    <div className="app-container">
      <div className="items-section">
        <h2>Your Cart</h2>
        <div className="item">
          <p>Item Name: Product 1</p>
          <p>Quantity: 2</p>
          <p>Price: Rs. 750</p>
        </div>
        <div className="item">
          <p>Item Name: Product 2</p>
          <p>Quantity: 1</p>
          <p>Price: Rs. 820</p>
        </div>
        <div className="total">
          <h3>Total Amount To be Paid: Rs. 1570</h3>
        </div>
      </div>
      <div className="payment-section">
        <h2>Add Payment Section</h2>
        <form className="payment-form">
          <div className="form-group">
            <label>Your Email</label>
            <input type="email" placeholder="" />
          </div>
          <div className="form-group">
            <label>Holder Name</label>
            <input type="text" placeholder="" />
          </div>
          <div className="form-group">
            <label>Card Number</label>
            <input type="text" placeholder="6362 9700 0045 7013" />
          </div>
          <div className="form-group">
            <label>Expires</label>
            <input type="text" placeholder="MM/YY" />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input type="text" placeholder="123" />
          </div>
          <div className="form-group">
            <label>District</label>
            <select>
              <option>Galle</option>
              <option>Colombo</option>
              <option>Kandy</option>
            </select>
          </div>
          <div className="form-group">
            <label>Nearest Town</label>
            <input type="text" placeholder="" />
          </div>
          <button type="submit" className="payment-button">Make Payment</button>
        </form>
      </div>
    </div>
  );
}

export default App;

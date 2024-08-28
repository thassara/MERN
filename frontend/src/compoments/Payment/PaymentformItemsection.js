import React from 'react';

function PaymentformItemsection() {
  return (
    <div className="items-section">
      <h2>Your Package Details section</h2>
      <div className="item">
        <img src='' alt='Product 2' />
        <p>Item Name: Product 1</p>
        <p>Quantity: 11</p>
        <p>Price: Rs. 7750</p>
      </div>
      <div className="item">
        <img src='' alt='Product 2' />
        <p>Item Name: Product 2</p>
        <p>Quantity: 11</p>
        <p>Price: Rs. 7750</p>
      </div>
      <div className="total">
        <h3>Total Amount To be Paid: Rs. 11570</h3>
      </div>
    </div>
  );
}

export default PaymentformItemsection;

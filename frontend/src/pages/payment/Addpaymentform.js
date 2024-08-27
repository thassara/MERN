import React from 'react';
import '../../style/payment/Addpayment.css';
import PaymentformCreditcard from '../../compoments/Payment/PaymentformCreditcard.js';
import PaymentformItemsection from '../../compoments/Payment/PaymentformItemsection.js';

function Addpaymentform() {
  return (
    <div className="app-container">
      <PaymentformItemsection />
      <PaymentformCreditcard />
    </div>
  );
}

export default Addpaymentform;

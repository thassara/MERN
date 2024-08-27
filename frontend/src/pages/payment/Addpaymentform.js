import React from 'react';
import '../../style/payment/Addpayment.css';
import PaymentformItemsection from '../../compoments/Payment/PaymentformItemsection.js';
import PaymentformCreditcard from '../../compoments/Payment/PaymentformCreditcard.js';
function App() {
  return (
    <div className="app-container">
      <PaymentformItemsection />
      <PaymentformCreditcard/>
    </div>
  );
}

export default App;

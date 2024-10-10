import React from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentDashBoard() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(`/paymentdashboard${path}`);
  };

  return (
    <div>
      <div>
        <style>
          {`
            .tilesAdmin {
              
            }
          `}
        </style>
      </div>
      <h1>This is the Payment Dashboard for the Managers</h1>
      <button onClick={() => handleNavigate('/Paymentsadd')}>Go to Add Payment</button>
    </div>
  );
}

export default PaymentDashBoard;

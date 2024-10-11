import React from 'react';
import { useNavigate } from 'react-router-dom';

function GMChoose() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(`${path}`);
  };
  return (
    <div>
        <div>
          <style>
            {`
            .tilesAdmin {
                display: inline-block;
                width: 21%;
                height: 500px;
                margin: 50px 20px 50px 20px;
                padding: 20px;
                color: black;
                text-align: center;
                text-decoration: none;
                border-radius: 15px;
                border: 3px solid #031f42;
                font-family: Arial, sans-serif;
                font-weight: bold;
                font-size: 40px;
             }
              .GMCTileLayout {
                display: flex;
                flex-wrap: wrap; /* Allow wrapping of items */
                justify-content: center; /* Center align items */
              }
            }
          `}
            
          </style>
        </div>
        <div className='GMCTileLayout'>
        <button className="tilesAdmin" onClick={() => handleNavigate('/PackageDashBoardPage')}>Packages</button>
        <button className="tilesAdmin" onClick={() => handleNavigate('/OrderDashBoardPage')}>Orders</button>
        <button className="tilesAdmin" onClick={() => handleNavigate('/PaymentDashBoardPage')}>Payments</button>
        <button className="tilesAdmin" onClick={() => handleNavigate('/MachineDashBoardPage')}>Machines</button>
        <button className="tilesAdmin" onClick={() => handleNavigate('/DeliveryDashBoardPage')}>Deliveries</button>
        <button className="tilesAdmin" onClick={() => handleNavigate('/EmployeeDashBoardPage')}>Employees</button>
        <button className="tilesAdmin" onClick={() => handleNavigate('/CustomerDashBoardPage')}>Customers</button>
        </div>
      </div>
       
  );
}
export default GMChoose;
import React from 'react';
import { useNavigate } from 'react-router-dom';
function EmployeeDashBoardOne() {
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
              .EDBOTileLayout{  
                text-align: center;
              }
            }
          `}
            
          </style>
        </div>
        <div className='EDBOTileLayout'>
        <button className="tilesAdmin" onClick={() => handleNavigate('/MachineDashBoardPage')}>DashBoard One</button>
        <button className="tilesAdmin" onClick={() => handleNavigate('/DeliveryDashBoardPage')}>DashBoard </button>Two
        </div>
      </div>
       
  );
  }
  export default EmployeeDashBoardOne;
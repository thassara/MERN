import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeDashBoardOne from '../../compoments/Employee/EmployeeDashBoardOne';
import EmployeeDashBoardTwo from '../../compoments/Employee/EmployeeDashBoardTwo';

function EmployeeDashBoardPage() {
  return (
    <div>
      <div>
          <style>
            {`
              .EDPGLayout{  
                display:flex;
                justify-content:center;
              }
            }
          `}
            
          </style>
        </div>
        <div classname="EDPGLayout">
          <EmployeeDashBoardOne />
          <EmployeeDashBoardTwo />
        </div>
      
      <Routes>
      </Routes>
    </div>
  );
}

export default EmployeeDashBoardPage;

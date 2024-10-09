import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeDashBoardOne from '../../compoments/Employee/EmployeeDashBoardOne';

function EmployeeDashBoardPage() {
  return (
    <div>
      <h1>This is the Employee Dashboard Page</h1>
      <Routes>
        <Route path="/" element={<EmployeeDashBoardOne />} />
      </Routes>
    </div>
  );
}

export default EmployeeDashBoardPage;

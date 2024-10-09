
import React, { useState } from 'react';
import EmployeeDashBoardOne from '../../compoments/Employee/EmployeeDashBoardOne';
import EmployeeDashBoardTwo from '../../compoments/Employee/EmployeeDashBoardTwo';
import EmployeeDashBoardThree from '../../compoments/Employee/EmployeeDashBoardThree';

function EmployeeDashBoardPage() {
  const [activeComponent, setActiveComponent] = useState('EmployeeDashBoardOne');

  // Function to render the active component based on the button clicked
  const renderComponent = () => {
    if (activeComponent === 'EmployeeDashBoardOne') {
      return <EmployeeDashBoardOne />;
    } else if (activeComponent === 'EmployeeDashBoardTwo') {
      return <EmployeeDashBoardTwo />;
    } else if (activeComponent === 'EmployeeDashBoardThree') {
      return <EmployeeDashBoardThree />;
    }
  };

  return (
    <div>
      <style>
        {`
          .EDPGLayout {  
            display: flex;
            justify-content: center;
            width: 100%;
            gap: 30px;
          }
          .buttonContainer {
            display: flex;
            justify-content: center;
            gap: 20px; /* Spacing between buttons */
            margin-top: 20px; /* Margin above buttons */
          }
          .button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            border: none;
            border-radius: 5px;
            background-color: #007bff; /* Bootstrap primary color */
            color: white;
            transition: background-color 0.3s;
          }
          .button:hover {
            background-color: #0056b3; /* Darker shade on hover */
          }
        `}
      </style>
      <div className="EDPGLayout">
        {renderComponent()} {/* Render the active component */}
      </div>
      <div className="buttonContainer">
        <button className="button" onClick={() => setActiveComponent('EmployeeDashBoardOne')}>Manage Employees</button>
        <button className="button" onClick={() => setActiveComponent('EmployeeDashBoardTwo')}>Report Generating</button>
        <button className="button" onClick={() => setActiveComponent('EmployeeDashBoardThree')}>Search Records</button>
      </div>
      <br />
    </div>
  );
}

export default EmployeeDashBoardPage;

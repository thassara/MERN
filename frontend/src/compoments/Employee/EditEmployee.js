import React from 'react';
import { useNavigate } from 'react-router-dom';

function EditEmployee() {
  const navigate = useNavigate();

  const handleNavigate = (path) => navigate(path);

  return (
    <div>
      <style>
        {`
          .container {
            padding: 20px;
            border-radius: 8px;
            max-width: 800px;
            width: 100%;
            background-color: white;
            margin: 0 auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          h1 {
            text-align: center;
            margin-bottom: 20px;
            font-size: 24px;
          }

          .form-group {
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
          }

          .form-group label {
            flex: 1;
            font-weight: bold;
          }

          .form-group input {
            flex: 2;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .button-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
          }

          .button {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            background-color: #007bff; /* Blue color */
            color: white;
          }

          .button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
      
      <div className="container">
        <h1>Edit Profile</h1>
        <div className="form-group">
          <label htmlFor="employee-id">Employee ID:</label>
          <input type="text" id="employee-id" defaultValue="8001" />
        </div>
        <div className="form-group">
          <label htmlFor="emp-name">Emp Name:</label>
          <input type="text" id="emp-name" defaultValue="S.PY Bumali" />
        </div>
        <div className="form-group">
          <label htmlFor="full-name">Full Name:</label>
          <input type="text" id="full-name" defaultValue="Sirisenalage Premadasage Yugoslavia Bumali" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" defaultValue="138, Athagahapu Junction, Walgama, Matara" />
        </div>
        <div className="form-group">
          <label htmlFor="qualifications">Qualifications:</label>
          <input type="text" id="qualifications" defaultValue="NAQ-Level 4 Mechanics, NVQ-Level 2 English" />
        </div>
        <div className="form-group">
          <label htmlFor="experience">Experience:</label>
          <input type="text" id="experience" defaultValue="3 years Machine Operator, 1 Year Class 2 Operator" />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input type="text" id="position" defaultValue="Operator - Heavy" />
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary/Wage:</label>
          <input type="text" id="salary" defaultValue="500" />
        </div>
        <div className="form-group">
          <label htmlFor="join-date">Join Date:</label>
          <input type="text" id="join-date" defaultValue="13/02/2012" />
        </div>
        <div className="form-group">
          <label htmlFor="passkey">PassKey:</label>
          <input type="text" id="passkey" defaultValue="9010" />
        </div>
        <div className="button-container">
          <button className="button" onClick={() => handleNavigate('/EmployeeDashBoardPage')}>Go Back</button>
          <button className="button">Submit Changes</button>
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;

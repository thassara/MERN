import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    EmpID: '',
    EmpName: '',
    EmpFullName: '',
    EmpAddress: '',
    EmpQualifications: '',
    EmpExperience: '',
    EmpPosition: '',
    EmpWage: '',
    EmpJoin: '',
    EmpPassKey: ''
  });

  const [errors, setErrors] = useState({});

  // Set Join Date to today's date and disable it
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData((prevData) => ({
      ...prevData,
      EmpJoin: today
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};

    // Validation rules
    if (!/^\d{4}$/.test(formData.EmpID)) newErrors.EmpID = 'Employee ID must be 4 digits';
    if (/\d/.test(formData.EmpName)) newErrors.EmpName = 'Name cannot contain numbers';
    if (/\d/.test(formData.EmpFullName)) newErrors.EmpFullName = 'Full Name cannot contain numbers';
    if (/\d/.test(formData.EmpPosition)) newErrors.EmpPosition = 'Position cannot contain numbers';
    if (/\d/.test(formData.EmpExperience)) newErrors.EmpExperience = 'Experience cannot contain numbers';
    if (formData.EmpWage <= 0) newErrors.EmpWage = 'Salary cannot be negative or zero';
    if (!/^\d{4}$/.test(formData.EmpPassKey)) newErrors.EmpPassKey = 'PassKey must be 4 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch('http://localhost:8070/api/addEmployee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Employee added successfully');
        navigate('/EmployeeDashBoardPage');
      } else {
        alert('Failed to add employee');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding employee');
    }
  };

  return (
    <div className="container">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID:</label>
          <input type="number" id="EmpID" value={formData.EmpID} onChange={handleChange} />
          <small className="error">{errors.EmpID}</small>
        </div>

        <div className="form-group">
          <label>Emp Name:</label>
          <input type="text" id="EmpName" value={formData.EmpName} onChange={handleChange} />
          <small className="error">{errors.EmpName}</small>
        </div>

        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" id="EmpFullName" value={formData.EmpFullName} onChange={handleChange} />
          <small className="error">{errors.EmpFullName}</small>
        </div>

        <div className="form-group">
          <label>Position:</label>
          <input type="text" id="EmpPosition" value={formData.EmpPosition} onChange={handleChange} />
          <small className="error">{errors.EmpPosition}</small>
        </div>

        <div className="form-group">
          <label>Experience:</label>
          <input type="text" id="EmpExperience" value={formData.EmpExperience} onChange={handleChange} />
          <small className="error">{errors.EmpExperience}</small>
        </div>

        <div className="form-group">
          <label>Salary/Wage:</label>
          <input type="number" id="EmpWage" value={formData.EmpWage} onChange={handleChange} />
          <small className="error">{errors.EmpWage}</small>
        </div>

        <div className="form-group">
          <label>Join Date:</label>
          <input type="date" id="EmpJoin" value={formData.EmpJoin} disabled />
        </div>

        <div className="form-group">
          <label>PassKey:</label>
          <input type="number" id="EmpPassKey" value={formData.EmpPassKey} onChange={handleChange} />
          <small className="error">{errors.EmpPassKey}</small>
        </div>

        <div className="button-container">
          <button type="button" onClick={() => navigate('/EmployeeDashBoardPage')}>Go Back</button>
          <button type="submit">Add Employee</button>
        </div>
      </form>

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
          }

          .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .form-group input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .error {
            color: red;
            font-size: 14px;
            margin-top: 5px;
            display: block;
          }

          .button-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
          }

          .button-container button {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            background-color: #007bff;
            color: white;
          }

          .button-container button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
  );
}

export default AddEmployee;

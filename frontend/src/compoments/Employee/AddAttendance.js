import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAttendance = ({ empID }) => {
    const navigate = useNavigate();
  const [empName, setEmpName] = useState('');
  const [workHours, setWorkHours] = useState('');
  const [otHours, setOTHours] = useState('');
  const [error, setError] = useState('');
  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:8070/api/employees/${empID}`);
        if (response.ok) {
          const data = await response.json();
          setEmpName(data.EmpName);
        } else {
          setError('Failed to fetch employee');
        }
      } catch (error) {
        setError('Error fetching employee: ' + error.message);
      }
    };

    if (empID) {
      fetchEmployeeData();
    }
  }, [empID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAttendance = {
      EmpID: empID,
      EmpName: empName,
      WorkDate: todayDate,
      WorkHours: Number(workHours),
      OTHours: Number(otHours),
    };

    try {
      const response = await fetch('http://localhost:8070/api/AddAttendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAttendance),
      });
      if (response.ok) {
        alert('Attendance added successfully!');
        navigate('/');
        // Reset form or perform any other action
        setWorkHours('');
        setOTHours('');
      } else {
        setError('Failed to add attendance.');
      }
    } catch (error) {
      setError('Error adding attendance: ' + error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <div className="AddAttendanceBox">
        <h2 style={{ textAlign: 'center' }}>Add Attendance</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>EmpID:</label>
            <input
              type="text"
              value={empID}
              readOnly
              style={{ width: '100%', padding: '8px', margin: '10px 0', backgroundColor: '#e9e9e9' }}
            />
          </div>
          <div>
            <label>EmpName:</label>
            <input
              type="text"
              value={empName}
              readOnly
              style={{ width: '100%', padding: '8px', margin: '10px 0', backgroundColor: '#e9e9e9' }}
            />
          </div>
          <div>
            <label>Work Date:</label>
            <input
              type="text"
              value={todayDate}
              readOnly
              style={{ width: '100%', padding: '8px', margin: '10px 0', backgroundColor: '#e9e9e9' }}
            />
          </div>
          <div>
            <label>Work Hours:</label>
            <input
              type="number"
              value={workHours}
              onChange={(e) => setWorkHours(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            />
          </div>
          <div>
            <label>OT Hours:</label>
            <input
              type="number"
              value={otHours}
              onChange={(e) => setOTHours(e.target.value)}
              style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            />
          </div>
          {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
          <button
            type="submit"
            style={{ width: '100%', padding: '10px', marginTop: '16px', fontSize: '16px', borderRadius: '15px' }}
          >
            Add Attendance
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAttendance;

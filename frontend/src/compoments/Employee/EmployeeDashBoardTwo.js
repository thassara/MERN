import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeDashBoardTwo() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch('/api/GetAttendance'); // Adjust the API endpoint as needed
        const data = await response.json();
        setEmployeeData(data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleDelete = (path) => {
    navigate(path);
  };

  const filteredEmployees = employeeData.filter((record) =>
    record.EmpName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <style>
          {`
          .tilesAdmin {
              display: inline-block;
              width: 600px;
              height: auto;
              margin: 30px;
              padding: 20px;
              border-radius: 15px;
              border: 3px solid #031f42;
           }

           .tableContainer {
              max-height: 265px; /* Adjust this value as needed */
              overflow-y: auto;
              margin-top: 20px;
           }

           table {
              width: 100%;
              border-collapse: collapse;
           }

           th, td {
              padding: 8px;
              border: 1px solid #ddd;
              text-align: left;
           }

           th {
              background-color: #f2f2f2;
           }
          `}
        </style>
      </div>
      <div className="tilesAdmin">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>Month</h2>
          <select className="dropdown" onChange={(e) => handleMonthChange(e.target.value)}>
            <option value="">Select Month</option>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by employee name"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '100%', padding: '8px', marginTop: '20px' }}
          />
        </div>
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Work Date</th>
                <th>Work Hours</th>
                <th>OT Hours</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((record) => (
                <tr key={record.EmpID}>
                  <td>{record.EmpID}</td>
                  <td>{record.EmpName}</td>
                  <td>{new Date(record.WorkDate).toLocaleDateString()}</td>
                  <td>{record.WorkHours}</td>
                  <td>{record.OTHours || 0}</td>
                  <td>
                    <button
                      className="buttonX"
                      onClick={() => handleNavigate('/EditRecord')}
                      style={{ padding: '5px 10px' }}
                    >
                      Update
                    </button>
                    <button
                      className="buttonX"
                      onClick={() => handleDelete(record.EmpID)}
                      style={{ padding: '5px 10px', marginLeft: '5px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashBoardTwo;

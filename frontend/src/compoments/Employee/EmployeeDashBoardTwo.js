import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeDashBoardTwo() {
  const navigate = useNavigate();

  const [selectedMonth, setSelectedMonth] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [employeeData, setEmployeeData] = useState([
    { id: 8002, name: 'S.P.Y Bumal', status: 'Present', date: '01' },
    { id: 8002, name: 'S.P.Y Bumal', status: 'Present', date: '02' },
    { id: 8002, name: 'S.P.Y Bumal', status: 'Present', date: '03' },
    { id: 8015, name: 'A.N.Kumara', status: 'Absent', date: '01' },
    { id: 8021, name: 'W.J.K Jaya', status: 'Present', date: '01' },
    // Add more dummy data here
  ]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const filteredEmployees = employeeData.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
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
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.date}</td>
                  <td>{employee.status}</td>
                  <td>
                    <button
                      className="buttonX"
                      onClick={() => handleNavigate('/EditRecord')}
                      style={{ padding: '5px 10px' }}
                    >
                      Update
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

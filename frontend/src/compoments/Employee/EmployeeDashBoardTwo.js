import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeDashBoardTwo() {
  const handleNavigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch('http://localhost:8070/api/GetAttendance');
        const data = await response.json();
        setEmployeeData(data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  
  // Updated to accept AttID for deletion
  const handleDelete = async (AttID) => {
    if (window.confirm("Are you sure you want to delete this attendance record?")) {
      try {
        const response = await fetch(`http://localhost:8070/api/DelAttendance/${AttID}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Attendance record deleted successfully');
          setEmployeeData(prev => prev.filter(emp => emp.AttID !== AttID));
        } else {
          const errorText = await response.text();
          alert('Failed to delete attendance record: ' + errorText);
        }
      } catch (error) {
        console.error('Error deleting attendance record:', error);
      }
    }
  };

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
          <h2>Employee Attendance</h2>
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
              {employeeData.map((record) => (
                <tr key={record.AttID}>
                  <td>{record.EmpID}</td>
                  <td>{record.EmpName}</td>
                  <td>{new Date(record.WorkDate).toLocaleDateString()}</td>
                  <td>{record.WorkHours}</td>
                  <td>{record.OTHours || 0}</td>
                  <td>
                    <button
                      className="buttonX"
                      onClick={() => handleNavigate(`/EditAttendance/${record.AttID}`)}
                      style={{ padding: '5px 10px' }}
                    >
                      Update
                    </button>
                    <button
                      className="buttonX"
                      // Pass AttID to handleDelete
                      onClick={() => handleDelete(record.AttID)}
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

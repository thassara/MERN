import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function EmployeeDashBoardTwo() {
  const handleNavigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to hold search term (EmpID)
  const [selectedMonth, setSelectedMonth] = useState(''); // State for selected month
  const [filteredData, setFilteredData] = useState([]); // State for filtered data

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch('http://localhost:8070/api/GetAttendance');
        const data = await response.json();
        setEmployeeData(data);
        setFilteredData(data); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  // Update filtered data whenever searchTerm or selectedMonth changes
  useEffect(() => {
    const filtered = employeeData.filter(record => {
      // Search by Employee ID
      const matchesEmpID = record.EmpID.toString().includes(searchTerm);
      // Filter by selected month, if any
      const matchesMonth = selectedMonth
        ? new Date(record.WorkDate).getMonth() + 1 === parseInt(selectedMonth)
        : true; // If "All Months" is selected, match all records
  
      return matchesEmpID && matchesMonth;
    });
  
    setFilteredData(filtered);
  }, [searchTerm, selectedMonth, employeeData]);
  
  // The handleMonthChange function should now only set the month
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value); // This will trigger the useEffect to re-apply the filters
  };
  //The delete function
  const handleDelete = async (AttID) => {
    if (window.confirm("Are you sure you want to delete this attendance record?")) {
      try {
        const response = await fetch(`http://localhost:8070/api/DelAttendance/${AttID}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Attendance record deleted successfully');
          setEmployeeData(prev => prev.filter(emp => emp.AttID !== AttID));
          setFilteredData(prev => prev.filter(emp => emp.AttID !== AttID)); // Update filtered data
        } else {
          const errorText = await response.text();
          alert('Failed to delete attendance record: ' + errorText);
        }
      } catch (error) {
        console.error('Error deleting attendance record:', error);
      }
    }
  };

  // Function to generate the PDF report
  const generateReport = () => {
    const doc = new jsPDF();
    const tableColumn = ["Employee ID", "Employee Name", "Work Date", "Work Hours", "OT Hours", "Wage", "Payment"];
    const tableRows = [];
    let grandTotalPayment = 0; // Initialize grand total payment

    filteredData.forEach(record => {
      const workHoursPayment = record.WorkHours * record.EmpWage; // Calculate payment for Work Hours
      const overtimePayment = (record.OTHours || 0) * record.EmpWage * 1.5; // Calculate payment for OT Hours
      const totalPayment = workHoursPayment + overtimePayment; // Total payment

      const rowData = [
        record.EmpID,
        record.EmpName,
        new Date(record.WorkDate).toLocaleDateString(),
        record.WorkHours,
        record.OTHours || 0,
        record.EmpWage,
        totalPayment.toFixed(2) // Include total payment in the report
      ];

      tableRows.push(rowData);
      grandTotalPayment += totalPayment; // Add to grand total payment
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    // Add total payment row
    doc.autoTable({
      head: [['', '', '', '', '', 'Total Payment', grandTotalPayment.toFixed(2)]],
      startY: doc.autoTable.previous.finalY + 10, // Position below the previous table
      theme: 'plain',
    });

    doc.save(`Attendance_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div>
      <div>
        <style>
          {`
          .tilesAdmin {
              display: inline-block;
              width: 650px;
              height: auto;
              margin: 30px;
              padding: 20px;
              border-radius: 15px;
              border: 3px solid #031f42;
           }

           .tableContainer {
              max-height: 360px; 
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

           .buttonX {
              padding: 5px 10px;
              background-color: #031f42;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
           }

           .buttonX:hover {
              background-color: #00509e;
           }

           .spaced-buttons {
              margin-right: 5px;
              margin-bottom: 5px;
           }

           input[type="text"], select {
              padding: 5px;
              border-radius: 5px;
              border: 1px solid #ccc;
              margin-left: 10px;
           }

           .download-button {
              padding: 10px 20px;
              margin-left: 10px;
              background-color: #0091c7;
              color: white;
              border: none;
              border-radius: 5px; 
              cursor: pointer;
           }

           .download-button:hover {
              background-color: #00509e;
           }
          `}
        </style>
      </div>
      <div className="tilesAdmin">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>Employee Attendance</h2>
          
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          
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
                <th>Wage</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record) => (
                <tr key={record.AttID}>
                  <td>{record.EmpID}</td>
                  <td>{record.EmpName}</td>
                  <td>{new Date(record.WorkDate).toLocaleDateString()}</td>
                  <td>{record.WorkHours}</td>
                  <td>{record.OTHours || 0}</td>
                  <td>{record.EmpWage}</td>
                  <td>
                    <button
                      className="buttonX spaced-buttons"
                      style={{ backgroundColor: '#f7c600', color: 'white' }}
                      onClick={() => handleNavigate(`/EditAttendance?AttID=${record.AttID}&EmpID=${record.EmpID}&EmpName=${encodeURIComponent(record.EmpName)}&WorkDate=${record.WorkDate}&WorkHours=${record.WorkHours}&OTHours=${record.OTHours}`)}
                    >
                      Update
                    </button>
                    <button
                      className="buttonX spaced-buttons"
                      style={{ backgroundColor: '#ea2c03', color: 'white' }}
                      onClick={() => handleDelete(record.AttID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br></br>
        <input
            type="text"
            placeholder="All Employees"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={generateReport}
            className="download-button"
          >
            Generate Report
          </button>
      </div>
    </div>
  );
}

export default EmployeeDashBoardTwo;
//test

import React from 'react';
import avatar from '../../images/avatar.png';
import { useNavigate } from 'react-router-dom';

function EmployeeDashBoardOne() {
  const navigate = useNavigate();

  const handleNavigate = (path) => navigate(path);

  const employeeData = [
    { id: '8002', name: 'S.P.Y Bumal' },
    { id: '8015', name: 'A.N.Kumara' },
    { id: '8021', name: 'W.J.K Jaya' },
    { id: '8023', name: 'M.G.K devil' },
    { id: '8043', name: 'J.R.T.M Siriya' },
  ];

  return (
    <div>
      <style>
        {`
          .tilesAdmin {
            display: inline-block;
            width: 600px;
            height: 500px;
            margin: 30px;
            padding: 20px;
            border-radius: 15px;
            border: 3px solid #031f42;
          }
          .buttonX {
            background-color: #031f42;
            border-radius: 8px;
            color: white;
            padding: 4px 15px;
            margin: 0 5px;
          }
          table {
            margin-top:14px;
            width: 100%;
            border-collapse: collapse;
        }
          td {
            padding: 10px;
            text-align: center;
          }
        `}
      </style>
      
      <div className="tilesAdmin">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>Manage Employees</h2>
          <button className="buttonX" onClick={() => handleNavigate('/AddEmployee')}>Add Account</button>
        </div>
        
        <table>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee.id}>
                <td><img src={avatar} alt="AVT" style={{ width: '40px', height: '40px', margin: '5px' }} /></td>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td><button className="buttonX" onClick={() => handleNavigate('/EditEmployee')}>Edit</button></td>
                <td><button className="buttonX" onClick={() => handleNavigate('/DeleteEmployee')}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeDashBoardOne;

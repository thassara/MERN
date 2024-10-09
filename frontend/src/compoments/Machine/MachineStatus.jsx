import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MachineStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { machineNames } = location.state || { machineNames: [] };

  // Function to get the initial statuses from localStorage or default to 'Available'
  const getInitialStatuses = (machineNames) => {
    const savedStatuses = localStorage.getItem('machineStatuses');
    return savedStatuses ? JSON.parse(savedStatuses) : machineNames.map(() => 'Available');
  };

  // State to hold the status for each machine
  const [machineStatuses, setMachineStatuses] = useState(getInitialStatuses(machineNames));
  const [currentMachineNames, setCurrentMachineNames] = useState(machineNames);

  // Sync machineStatuses to localStorage on every change
  useEffect(() => {
    localStorage.setItem('machineStatuses', JSON.stringify(machineStatuses));
  }, [machineStatuses]);

  // Update machine statuses when currentMachineNames change
  useEffect(() => {
    setMachineStatuses(getInitialStatuses(currentMachineNames));
  }, [currentMachineNames]);

  // Function to update machine status
  const handleStatusChange = (index, newStatus) => {
    const updatedStatuses = [...machineStatuses];
    updatedStatuses[index] = newStatus;
    setMachineStatuses(updatedStatuses);
  };

  // Function to get the row color based on machine status
  const getRowColor = (status) => {
    switch (status) {
      case 'Available':
        return '#d4edda'; // Green background for Available
      case 'In process':
        return '#f8d7da'; // Red background for In process
      case 'Maintain':
        return '#fff3cd'; // Yellow background for Maintain
      default:
        return 'transparent'; // Default background
    }
  };

  // Function to handle Assign Order and navigate to AssignMachine
  const handleAssignOrder = (index) => {
    console.log(`Assigning order to machine: ${currentMachineNames[index]}`);
    navigate('/MachineStatus/Assign-machine', { state: { machineId: currentMachineNames[index] } });
  };

  // Function to remove a machine
  const handleRemoveMachine = (index) => {
    const updatedNames = currentMachineNames.filter((_, i) => i !== index);
    const updatedStatuses = machineStatuses.filter((_, i) => i !== index);
    
    setCurrentMachineNames(updatedNames);
    setMachineStatuses(updatedStatuses);
  };

  // Count the machines by status
  const availableCount = machineStatuses.filter(status => status === 'Available').length;
  const inProcessCount = machineStatuses.filter(status => status === 'In process').length;
  const maintainCount = machineStatuses.filter(status => status === 'Maintain').length;

  return (
    <div style={styles.container}>
      {/* Status summary boxes */}
      <div style={styles.statusBoxes}>
        <div style={styles.statusBox}>
          <h3>Available Machines</h3>
          <h2>{availableCount}</h2>
        </div>
        <div style={styles.statusBox}>
          <h3>Machines in Process</h3>
          <h2>{inProcessCount}</h2>
        </div>
        <div style={styles.statusBox}>
          <h3>Maintenance</h3>
          <h2>{maintainCount}</h2>
        </div>
      </div>

      {/* Machines table with status dropdowns */}
      <div style={styles.tableFrame}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Machine ID</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMachineNames.map((machineName, index) => (
              <tr
                key={index}
                style={{ backgroundColor: getRowColor(machineStatuses[index]) }} // Apply dynamic background color
              >
                <td style={styles.tableCell}>{machineName}</td>
                <td style={styles.tableCell}>
                  <select
                    value={machineStatuses[index]}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    style={styles.select}
                  >
                    <option value="Available">Available</option>
                    <option value="In process">In process</option>
                    <option value="Maintain">Maintain</option>
                  </select>
                </td>
                <td style={styles.tableCell}>
                  {machineStatuses[index] === 'Available' && (
                    <button
                      onClick={() => handleAssignOrder(index)}
                      style={styles.actionButton}
                    >
                      Assign Order
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveMachine(index)}
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  statusBoxes: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '900px',
    marginBottom: '20px',
  },
  statusBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '30%',
    textAlign: 'center',
  },
  tableFrame: {
    width: '100%',
    maxWidth: '900px',
    border: '2px solid #007bff',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
  select: {
    padding: '5px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  actionButton: {
    padding: '5px 10px',
    marginRight: '5px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  removeButton: {
    padding: '5px 10px',
    marginLeft: '5px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default MachineStatus;

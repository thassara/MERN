import React, { useState, useEffect } from 'react';

const AssignMachine = () => {
  // Initialize state from localStorage, or fallback to default if localStorage is empty
  const [orderQueue, setOrderQueue] = useState({ orderId: '', priority: '' });
  const [infoOrders, setInfoOrders] = useState(() => JSON.parse(localStorage.getItem('infoOrders')) || []);
  const [machineAssign, setMachineAssign] = useState({ machineId: '', orderId: '' });
  const [infoMachines, setInfoMachines] = useState(() => JSON.parse(localStorage.getItem('infoMachines')) || []);

  // Persist orders and machines in localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem('infoOrders', JSON.stringify(infoOrders));
  }, [infoOrders]);

  useEffect(() => {
    localStorage.setItem('infoMachines', JSON.stringify(infoMachines));
  }, [infoMachines]);

  // Handle the input changes for the first form (Manage Order Queue)
  const handleOrderInputChange = (e) => {
    setOrderQueue({
      ...orderQueue,
      [e.target.name]: e.target.value,
    });
  };

  // Handle the input changes for the second form (Machine Assign)
  const handleMachineInputChange = (e) => {
    setMachineAssign({
      ...machineAssign,
      [e.target.name]: e.target.value,
    });
  };

  // Handle the "Assign" button in the first form (Manage Order Queue)
  const handleAssignOrder = () => {
    if (orderQueue.orderId && orderQueue.priority) {
      setInfoOrders([...infoOrders, orderQueue]);
      setOrderQueue({ orderId: '', priority: '' }); // Clear input fields
    }
  };

  // Handle the "Assign" button in the second form (Machine Assign)
  const handleAssignMachine = () => {
    if (machineAssign.machineId && machineAssign.orderId) {
      setInfoMachines([...infoMachines, machineAssign]);
      setMachineAssign({ machineId: '', orderId: '' }); // Clear input fields
    }
  };

  // Handle the "Remove" button in the first "INFO" section
  const handleRemoveOrder = (index) => {
    const updatedOrders = [...infoOrders];
    updatedOrders.splice(index, 1); // Remove the selected order
    setInfoOrders(updatedOrders);
  };

  // Handle the "Remove" button in the second "INFO" section
  const handleRemoveMachine = (index) => {
    const updatedMachines = [...infoMachines];
    updatedMachines.splice(index, 1); // Remove the selected machine assignment
    setInfoMachines(updatedMachines);
  };

  return (
    <div style={styles.container}>
      {/* Manage Order Queue Section */}
      <div style={styles.manageOrderQueue}>
        <h2>Manage Order Queue</h2>
        <div style={styles.box}>
          <div style={styles.details}>
            <div>
              <strong>Order Id:</strong> 
              <input
                type="text"
                name="orderId"
                value={orderQueue.orderId}
                onChange={handleOrderInputChange}
                style={styles.inputField}
              />
            </div>
            <div>
              <strong>Priority:</strong>
              <input
                type="text"
                name="priority"
                value={orderQueue.priority}
                onChange={handleOrderInputChange}
                style={styles.inputField}
              />
            </div>
          </div>
          <button onClick={handleAssignOrder} style={styles.assignButton}>Assign</button>
        </div>
      </div>

      {/* Info Section for Orders */}
      <div style={styles.infoSection}>
        <h2>INFO</h2>
        {infoOrders.map((order, index) => (
          <div key={index} style={styles.infoBox}>
            <div><strong>Order ID:</strong> {order.orderId}</div>
            <div><strong>Priority:</strong> {order.priority}</div>
            <button onClick={() => handleRemoveOrder(index)} style={styles.removeButton}>Remove</button>
          </div>
        ))}
      </div>

      {/* Machine Assign Section */}
      <div style={styles.machineAssign}>
        <h2>Machine Assign</h2>
        <div style={styles.box}>
          <div style={styles.details}>
            <div>
              <strong>Machine Id:</strong>
              <input
                type="text"
                name="machineId"
                value={machineAssign.machineId}
                onChange={handleMachineInputChange}
                style={styles.inputField}
              />
            </div>
            <div>
              <strong>Order Id:</strong>
              <input
                type="text"
                name="orderId"
                value={machineAssign.orderId}
                onChange={handleMachineInputChange}
                style={styles.inputField}
              />
            </div>
          </div>
          <button onClick={handleAssignMachine} style={styles.assignButton}>Assign</button>
        </div>
      </div>

      {/* Info Section for Machines */}
      <div style={styles.infoSection}>
        <h2>INFO</h2>
        {infoMachines.map((machine, index) => (
          <div key={index} style={styles.infoBox}>
            <div><strong>Machine ID:</strong> {machine.machineId}</div>
            <div><strong>Order ID:</strong> {machine.orderId}</div>
            <button onClick={() => handleRemoveMachine(index)} style={styles.removeButton}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '20px',
  },
  manageOrderQueue: {
    flexBasis: '45%',
    backgroundColor: '#e0e0e0',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  machineAssign: {
    flexBasis: '45%',
    backgroundColor: '#e0e0e0',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  infoSection: {
    flexBasis: '45%',
    backgroundColor: '#e0e0e0',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  box: {
    backgroundColor: '#d3d3d3',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  assignButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  infoBox: {
    backgroundColor: '#d3d3d3',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputField: {
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginTop: '5px',
    width: '100%',
  },
};
export default AssignMachine;

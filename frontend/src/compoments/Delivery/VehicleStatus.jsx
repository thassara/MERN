import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/delivery/VehicleStatus.css'; 

const VehicleStatus = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/vehicle');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:8070/api/vehicle/${id}`, { status });
      fetchVehicles();
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  return (
    <div className="vehicle-status-container">
      <h2>Vehicle Management</h2>
      <div className="table-frame">
        <table className="vehicle-status-table">
          <thead>
            <tr>
              <th>Vehicle Name</th>
              <th>Status</th>
             
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle._id}>
                <td>{vehicle.name}</td>
                <td>
                  <select 
                    value={vehicle.status}
                    onChange={(e) => handleStatusChange(vehicle._id, e.target.value)}
                    className="vehicle-status-select"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </td>
             
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleStatus;

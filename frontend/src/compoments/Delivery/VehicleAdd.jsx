import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import '../../style/delivery/VehicleAdd.css'; 

const VehicleAdd = () => {
    const [vehicleId, setVehicleId] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [capacity, setCapacity] = useState('');
    const [nextServiceDate, setNextServiceDate] = useState('');
    const [lastServiceDate, setLastServiceDate] = useState(''); 

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const vehicleData = {
            vehicleId,
            name,
            type,
            registrationNumber,
            capacity,
            lastServiceDate,
            nextServiceDate
           
        };

        try {
            const response = await axios.post('http://localhost:8070/api/vehicle/add', vehicleData);
            alert('Vehicle added successfully');

            // Clear form
            setVehicleId('');
            setName('');
            setType('');
            setRegistrationNumber('');
            setCapacity('');
            setNextServiceDate('');
            setLastServiceDate(''); 

            // Redirect to Vehicle Management page after adding the vehicle
            navigate('/DeliveryDashBoardPage');
        } catch (error) {
            console.error('Error adding vehicle:', error);
        }
    };

    return (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2 className="heading">Add Vehicle</h2>
    
            <label htmlFor="vehicle-id" className="label">Vehicle ID:</label>
            <input
              type="text"
              id="vehicle-id"
              name="vehicle-id"
              placeholder="Enter vehicle ID"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              required
              className="input"
            />
    
            <label htmlFor="name" className="label">Vehicle Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter vehicle name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input"
            />
    
            <label htmlFor="type" className="label">Vehicle Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              placeholder="Enter vehicle type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="input"
            />
    
            <label htmlFor="registration-number" className="label">Registration Number:</label>
            <input
              type="text"
              id="registration-number"
              name="registration-number"
              placeholder="Enter registration number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              required
              className="input"
            />
    
            <label htmlFor="capacity" className="label">Capacity:</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              placeholder="Enter capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
              className="input"
            />

            <label htmlFor="last-service-date" className="label">Last Service Date:</label>
            <input
              type="date"
              id="last-service-date"
              name="last-service-date"
              value={lastServiceDate}
              onChange={(e) => setLastServiceDate(e.target.value)}
              required
              className="input"
            />

            <label htmlFor="next-service-date" className="label">Next Service Date:</label>
            <input
              type="date"
              id="next-service-date"
              name="next-service-date"
              value={nextServiceDate}
              onChange={(e) => setNextServiceDate(e.target.value)}
              required
              className="input"
            />
    
            
    
            <button type="submit" className="button">Add Vehicle</button>
          </form>
        </div>
      );
};

export default VehicleAdd;

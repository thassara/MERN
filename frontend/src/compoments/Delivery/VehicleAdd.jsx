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
    const [errors, setErrors] = useState({});

    const navigate = useNavigate(); 

    const validateForm = () => {
        let formErrors = {};

        if (!vehicleId) formErrors.vehicleId = 'Vehicle ID is required';
        if (!name) formErrors.name = 'Vehicle name is required';
        if (!type) formErrors.type = 'Vehicle type is required';
        if (!registrationNumber) formErrors.registrationNumber = 'Registration number is required';
        if (!capacity) {
            formErrors.capacity = 'Capacity is required';
        } else if (Number(capacity) <= 0) {
            formErrors.capacity = 'Capacity must be a positive number';
        }
        if (!lastServiceDate) formErrors.lastServiceDate = 'Last service date is required';
        if (!nextServiceDate) formErrors.nextServiceDate = 'Next service date is required';

        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

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
            // Show a confirmation window alert on successful addition
            window.alert('Vehicle added successfully!'); 

            // Clear form
            setVehicleId('');
            setName('');
            setType('');
            setRegistrationNumber('');
            setCapacity('');
            setNextServiceDate('');
            setLastServiceDate(''); 
            setErrors({}); // Clear any errors

            // Redirect to Vehicle Management page after adding the vehicle with replace to avoid back navigation
            navigate('/DeliveryDashBoardPage', { replace: true });
        } catch (error) {
            console.error('Error adding vehicle:', error);
        }
    };

    // Function to handle cancel button click
    const handleCancel = () => {
        navigate('/DeliveryDashBoardPage', { replace: true }); // Use replace to avoid going back to the form
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
              className={`input ${errors.vehicleId ? 'input-error' : ''}`}
              required
            />
            {errors.vehicleId && <p className="error-message">{errors.vehicleId}</p>}
    
            <label htmlFor="name" className="label">Vehicle Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter vehicle name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`input ${errors.name ? 'input-error' : ''}`}
              required
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
    
            <label htmlFor="type" className="label">Vehicle Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              placeholder="Enter vehicle type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={`input ${errors.type ? 'input-error' : ''}`}
              required
            />
            {errors.type && <p className="error-message">{errors.type}</p>}
    
            <label htmlFor="registration-number" className="label">Registration Number:</label>
            <input
              type="text"
              id="registration-number"
              name="registration-number"
              placeholder="Enter registration number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className={`input ${errors.registrationNumber ? 'input-error' : ''}`}
              required
            />
            {errors.registrationNumber && <p className="error-message">{errors.registrationNumber}</p>}
    
            <label htmlFor="capacity" className="label">Capacity:</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              placeholder="Enter capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className={`input ${errors.capacity ? 'input-error' : ''}`}
              required
            />
            {errors.capacity && <p className="error-message">{errors.capacity}</p>}
    
            <label htmlFor="last-service-date" className="label">Last Service Date:</label>
            <input
              type="date"
              id="last-service-date"
              name="last-service-date"
              value={lastServiceDate}
              onChange={(e) => setLastServiceDate(e.target.value)}
              className={`input ${errors.lastServiceDate ? 'input-error' : ''}`}
              required
            />
            {errors.lastServiceDate && <p className="error-message">{errors.lastServiceDate}</p>}
    
            <label htmlFor="next-service-date" className="label">Next Service Date:</label>
            <input
              type="date"
              id="next-service-date"
              name="next-service-date"
              value={nextServiceDate}
              onChange={(e) => setNextServiceDate(e.target.value)}
              className={`input ${errors.nextServiceDate ? 'input-error' : ''}`}
              required
            />
            {errors.nextServiceDate && <p className="error-message">{errors.nextServiceDate}</p>}
    
            <button type="submit" className="button">Add Vehicle</button>
            <button type="button" className="button-cancel" onClick={handleCancel}>Cancel</button>
          </form>
        </div>
    );
};

export default VehicleAdd;

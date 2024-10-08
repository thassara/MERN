import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../style/delivery/UpdateVehicle.css';

const UpdateVehicle = () => {
    const [vehicleId, setVehicleId] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [capacity, setCapacity] = useState('');
    const [nextServiceDate, setNextServiceDate] = useState('');
    const [lastServiceDate, setLastServiceDate] = useState('');
    const [status, setStatus] = useState('Available');
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    // Helper function to format date to 'YYYY-MM-DD'
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (!isNaN(date)) {
            const year = date.getFullYear();
            const month = (`0${date.getMonth() + 1}`).slice(-2);
            const day = (`0${date.getDate()}`).slice(-2);
            return `${year}-${month}-${day}`;
        }
        return '';
    };

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/api/vehicle/${id}`);
                const { vehicleId, name, type, registrationNumber, capacity, nextServiceDate, lastServiceDate, status } = response.data;
                setVehicleId(vehicleId);
                setName(name);
                setType(type);
                setRegistrationNumber(registrationNumber);
                setCapacity(capacity);
                setNextServiceDate(formatDate(nextServiceDate));
                setLastServiceDate(formatDate(lastServiceDate));
                setStatus(status);
            } catch (error) {
                console.error('Error fetching vehicle details:', error);
            }
        };
        fetchVehicleDetails();
    }, [id]);

    // Validation function
    const validateForm = () => {
        const formErrors = {};
        
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

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Confirm if the user wants to proceed with the update
        const confirmUpdate = window.confirm('Are you sure you want to update this vehicle?');
        if (!confirmUpdate) return; // Exit if user cancels

        const formattedNextServiceDate = formatDate(nextServiceDate);
        const formattedLastServiceDate = formatDate(lastServiceDate);

        // Validate the form
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const updatedVehicleData = {
            vehicleId,
            name,
            type,
            registrationNumber,
            capacity,
            nextServiceDate: formattedNextServiceDate,
            lastServiceDate: formattedLastServiceDate,
            status
        };

        try {
            await axios.put(`http://localhost:8070/api/vehicle/${id}`, updatedVehicleData);
            console.log('Vehicle updated successfully');
            navigate('/DeliveryDashBoardPage');
        } catch (error) {
            console.error('Error updating vehicle:', error);
        }
    };

    // Handle Cancel button click
    const handleCancel = () => {
        navigate('/DeliveryDashBoardPage');
    };

    return (
        <div className="form-container">
            <form onSubmit={handleUpdate}>
                <h2 className="heading">Update Vehicle</h2>
                <label htmlFor="vehicle-id" className="label">Vehicle ID:</label>
                <input
                    type="text"
                    id="vehicle-id"
                    name="vehicle-id"
                    placeholder="Enter vehicle ID"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    className={`input ${errors.vehicleId ? 'input-error' : ''}`}
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
                />
                {errors.nextServiceDate && <p className="error-message">{errors.nextServiceDate}</p>}

                <label htmlFor="status" className="label">Status:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`select ${errors.status ? 'input-error' : ''}`}
                >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                    <option value="Maintenance">Maintenance</option>
                </select>
                {errors.status && <p className="error-message">{errors.status}</p>}

                <button type="submit" className="button">Update Vehicle</button>
                <button type="button" className="button-cancel" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default UpdateVehicle;

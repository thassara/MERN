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

    //  handleUpdate function to correctly format the date before sending to backend
    const handleUpdate = async (e) => {
        e.preventDefault();

        const formattedNextServiceDate = formatDate(nextServiceDate);
        const formattedLastServiceDate = formatDate(lastServiceDate);
    
        const updatedVehicleData = {
            vehicleId,
            name,
            type,
            registrationNumber,
            capacity,
            nextServiceDate: formattedNextServiceDate, 
            lastServiceDate: formattedLastServiceDate, // Use the formatted date
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

               
                <label htmlFor="status" className="label">Status:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                    className="select"
                >
                    <option value="Available">Available</option>
                    <option value="Uvailable">Unavailable</option>
                    <option value="maintenance">Maintenance</option>
                </select>

                <button type="submit" className="button">Update Vehicle</button>
            </form>
        </div>
    );
};

export default UpdateVehicle;

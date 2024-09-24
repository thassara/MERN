import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import { useParams, useNavigate } from 'react-router-dom'; 

const UpdateMachine = () => {
    const [machineName, setMachineName] = useState('');
    const [durationTime, setDurationTime] = useState('');
    const [description, setDescription] = useState('');
    const [qualityDetails, setQualityDetails] = useState('');
    const { id } = useParams(); // Fetching machine ID from the URL params
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMachineDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/machines/read/${id}`); // Ensure the correct endpoint
                const { machineName, durationTime, description, qualityDetails } = response.data;
                setMachineName(machineName);
                setDurationTime(durationTime);
                setDescription(description);
                setQualityDetails(qualityDetails);
            } catch (error) {
                console.error('Error fetching machine details:', error);
            }
        };
        fetchMachineDetails();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedMachineData = {
            machineName,
            durationTime,
            description,
            qualityDetails,
        };

        try {
            await axios.put(`http://localhost:8070/machines/update/${id}`, updatedMachineData);
            console.log('Machine updated successfully');
            navigate('/MachineDashBoardPage'); // Redirect to MachineManager.jsx after update
        } catch (error) {
            console.error('There was an error updating the machine:', error);
        }
    };

    return (
        <div style={styles.formContainer}>
            <form onSubmit={handleUpdate}>
                <h2 style={styles.heading}>Update Machine</h2>
                <label htmlFor="machine-name" style={styles.label}>Machine Name:</label>
                <input
                    type="text"
                    id="machine-name"
                    name="machine-name"
                    placeholder="Enter machine name"
                    value={machineName}
                    onChange={(e) => setMachineName(e.target.value)}
                    required
                    style={styles.input}
                />

                <label htmlFor="duration-time" style={styles.label}>Duration Time (in hours):</label>
                <input
                    type="number"
                    id="duration-time"
                    name="duration-time"
                    placeholder="Enter duration time"
                    value={durationTime}
                    onChange={(e) => setDurationTime(e.target.value)}
                    required
                    style={styles.input}
                />

                <label htmlFor="description" style={styles.label}>Description:</label>
                <textarea
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={styles.textarea}
                ></textarea>

                <label htmlFor="quality-details" style={styles.label}>Quality Details:</label>
                <textarea
                    type="text"
                    id="quality-details"
                    name="quality-details"
                    placeholder="Enter quality details"
                    rows="4"
                    value={qualityDetails}
                    onChange={(e) => setQualityDetails(e.target.value)}
                    required
                    style={styles.textarea}
                ></textarea>

                <button type="submit" style={styles.button}>Update Machine</button>
            </form>
        </div>
    );
};

const styles = {
    formContainer: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        maxWidth: '450px',
        margin: '20px auto'
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333'
    },
    label: {
        marginBottom: '10px',
        display: 'block',
        color: '#555',
        fontWeight: 'bold'
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
    },
    buttonHover: {
        backgroundColor: '#218838'
    }
};

export default UpdateMachine;

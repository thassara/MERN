import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const MachineAdd = () => {
    const [machineName, setMachineName] = useState('');
    const [durationTime, setDurationTime] = useState('');
    const [description, setDescription] = useState('');
    const [qualityDetails, setQualityDetails] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    // Regex to match symbols
    const symbolRegex = /[^a-zA-Z0-9\s]/g;

    // Real-time validation for machine name, description, and quality details
    const validateRealTime = (field, value) => {
        let error = '';
        const invalidSymbols = value.match(symbolRegex);

        if (invalidSymbols) {
            error = `Invalid symbol(s): ${invalidSymbols.join(', ')} are not allowed in ${field}.`;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateFields();

        if (Object.keys(validationErrors).length === 0) {
            const machineData = {
                machineName,
                durationTime,
                description,
                qualityDetails,
            };

            try {
                const response = await axios.post('http://localhost:8070/machines/add', machineData);
                alert('Machine added successfully:', response.data);

                // Clear form
                setMachineName('');
                setDurationTime('');
                setDescription('');
                setQualityDetails('');

                // Redirect to MachineManager page after adding the machine
                navigate('/MachineDashBoardPage');
            } catch (error) {
                console.error('Error adding machine:', error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    // Full validation when form is submitted
    const validateFields = () => {
        const validationErrors = {};

        if (symbolRegex.test(machineName)) {
            validationErrors.machineName = 'Symbols are not allowed in Machine Name.';
        }
        if (symbolRegex.test(description)) {
            validationErrors.description = 'Symbols are not allowed in Description.';
        }
        if (symbolRegex.test(qualityDetails)) {
            validationErrors.qualityDetails = 'Symbols are not allowed in Quality Details.';
        }
        if (!durationTime || isNaN(durationTime) || durationTime <= 0) {
            validationErrors.durationTime = 'Please enter a valid duration time in hours.';
        }

        return validationErrors;
    };

    return (
        <div style={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <h2 style={styles.heading}>Add Machine</h2>
                
                <label htmlFor="machine-name" style={styles.label}>Machine Name:</label>
                <input
                    type="text"
                    id="machine-name"
                    name="machine-name"
                    placeholder="Enter machine name"
                    value={machineName}
                    onChange={(e) => {
                        setMachineName(e.target.value);
                        validateRealTime('machineName', e.target.value);
                    }}
                    required
                    style={styles.input}
                />
                {errors.machineName && <p style={styles.error}>{errors.machineName}</p>}

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
                {errors.durationTime && <p style={styles.error}>{errors.durationTime}</p>}

                <label htmlFor="description" style={styles.label}>Description:</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    rows="4"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        validateRealTime('description', e.target.value);
                    }}
                    required
                    style={styles.textarea}
                ></textarea>
                {errors.description && <p style={styles.error}>{errors.description}</p>}

                <label htmlFor="quality-details" style={styles.label}>Quality Details:</label>
                <textarea
                    id="quality-details"
                    name="quality-details"
                    placeholder="Enter quality details"
                    rows="4"
                    value={qualityDetails}
                    onChange={(e) => {
                        setQualityDetails(e.target.value);
                        validateRealTime('qualityDetails', e.target.value);
                    }}
                    required
                    style={styles.textarea}
                ></textarea>
                {errors.qualityDetails && <p style={styles.error}>{errors.qualityDetails}</p>}

                {/* Submit button */}
                <button type="submit" style={styles.button}>Add Machine</button>
            </form>
        </div>
    );
};

const styles = {
    formContainer: {
        backgroundColor: '#ffffff',
        padding: '20px 40px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
        margin: 'auto'
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px'
    },
    label: {
        marginBottom: '8px',
        fontWeight: 'bold'
    },
    input: {
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box'
    },
    textarea: {
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box'
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    },
    buttonHover: {
        backgroundColor: '#0056b3'
    },
    error: {
        color: 'red',
        fontSize: '12px',
        marginBottom: '10px',
    }
};

export default MachineAdd;

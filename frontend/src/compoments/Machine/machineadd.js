import React, { useState } from 'react';

const MachineAdd = () => {
    const [machineName, setMachineName] = useState('');
    const [durationTime, setDurationTime] = useState('');
    const [description, setDescription] = useState('');
    const [qualityDetails, setQualityDetails] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ machineName, durationTime, description, qualityDetails });
        // Handle form submission logic here
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
<<<<<<< Updated upstream
                />
=======
                />    
>>>>>>> Stashed changes

                <label htmlFor="description" style={styles.label}>Description:</label>
                <textarea
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
                    id="quality-details"
                    name="quality-details"
                    placeholder="Enter quality details"
                    rows="4"
                    value={qualityDetails}
                    onChange={(e) => setQualityDetails(e.target.value)}
                    required
                    style={styles.textarea}
                ></textarea>

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
    }
};

export default MachineAdd;

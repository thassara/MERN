import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MachineManager = () => {
    const [machines, setMachines] = useState([]);
    const [form, setForm] = useState({
        machineName: '',
        durationTime: '',
        description: '',
        qualityDetails: '',
        id: ''
    });

    useEffect(() => {
        fetchMachines();
    }, []);

    const fetchMachines = async () => {
        const response = await axios.get('http://localhost:5000/machines');
        setMachines(response.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.id) {
            await axios.put(`http://localhost:5000/machines/${form.id}`, form);
        } else {
            await axios.post('http://localhost:5000/machines', form);
        }
        fetchMachines();
        setForm({ machineName: '', durationTime: '', description: '', qualityDetails: '', id: '' });
    };

    const handleEdit = (machine) => {
        setForm(machine);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/machines/${id}`);
        fetchMachines();
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>{form.id ? 'Update Machine' : 'Add Machine'}</h2>
                <label htmlFor="machine-name" style={styles.label}>Machine Name:</label>
                <input
                    type="text"
                    id="machine-name"
                    name="machineName"
                    placeholder="Enter machine name"
                    value={form.machineName}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <label htmlFor="duration-time" style={styles.label}>Duration Time (in hours):</label>
                <input
                    type="number"
                    id="duration-time"
                    name="durationTime"
                    placeholder="Enter duration time"
                    value={form.durationTime}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <label htmlFor="description" style={styles.label}>Description:</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    rows="4"
                    value={form.description}
                    onChange={handleChange}
                    required
                    style={styles.textarea}
                ></textarea>

                <label htmlFor="quality-details" style={styles.label}>Quality Details:</label>
                <textarea
                    id="quality-details"
                    name="qualityDetails"
                    placeholder="Enter quality details"
                    rows="4"
                    value={form.qualityDetails}
                    onChange={handleChange}
                    required
                    style={styles.textarea}
                ></textarea>

                <button type="submit" style={styles.button}>{form.id ? 'Update Machine' : 'Add Machine'}</button>
            </form>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Machine Name</th>
                        <th>Duration Time</th>
                        <th>Description</th>
                        <th>Quality Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {machines.map(machine => (
                        <tr key={machine._id}>
                            <td>{machine.machineName}</td>
                            <td>{machine.durationTime}</td>
                            <td>{machine.description}</td>
                            <td>{machine.qualityDetails}</td>
                            <td>
                                <button onClick={() => handleEdit(machine)} style={styles.editButton}>Edit</button>
                                <button onClick={() => handleDelete(machine._id)} style={styles.deleteButton}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        maxWidth: '1200px',
        margin: 'auto',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    },
    form: {
        marginBottom: '20px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold'
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        boxSizing: 'border-box'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
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
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    },
    tableHeader: {
        backgroundColor: '#007bff',
        color: '#fff'
    },
    tableCell: {
        padding: '10px',
        border: '1px solid #ddd'
    },
    editButton: {
        padding: '5px 10px',
        backgroundColor: '#ffc107',
        color: '#000',
        border: 'none',
        borderRadius: '5px',
        marginRight: '5px'
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px'
    }
};

export default MachineManager;

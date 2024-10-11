import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importing the plugin for table in pdf

const MachineManager = () => {
    const navigate = useNavigate();
    const [machines, setMachines] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [filteredMachines, setFilteredMachines] = useState([]); 

    useEffect(() => {
        fetchMachines();
    }, []);

    useEffect(() => {
        const filtered = machines.filter(machine =>
            machine.machineName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMachines(filtered);
    }, [searchQuery, machines]);

    const fetchMachines = async () => {
        try {
            const response = await axios.get('http://localhost:8070/machines/Allread');
            setMachines(response.data);
        } catch (error) {
            console.error('Error fetching machines:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/machines/delete/${id}`);
            fetchMachines();
        } catch (error) {
            console.error('Error deleting machine:', error);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update-machine/${id}`);
    };

    const handleViewProcess = () => {
        const machineNames = machines.map(machine => machine.machineName);
        navigate('/MachineDashBoardPage/Machine-Status', { state: { machineNames } });
    };

    // Function to generate and download PDF
    const handleDownloadReport = () => {
        const doc = new jsPDF();
        doc.text('Machine Report', 14, 16);
        
        const tableColumn = ['Machine Name', 'Duration Time', 'Description', 'Quality Details'];
        const tableRows = [];

        filteredMachines.forEach(machine => {
            const machineData = [
                machine.machineName,
                machine.durationTime,
                machine.description,
                machine.qualityDetails
            ];
            tableRows.push(machineData);
        });

        // Add table to PDF
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        // Save the PDF
        doc.save('machines_report.pdf');
    };

    return (
        <div style={styles.container}>
            <div style={styles.buttonContainer}>
                <button onClick={() => navigate('/MachineDashBoardPage/add-machine')} style={styles.addButton}>
                    Add Machine
                </button>
                <button onClick={handleViewProcess} style={styles.viewProcessButton}>
                    Manage Machine Process
                </button>
                {/* Report Generator Button */}
                <button onClick={handleDownloadReport} style={styles.reportButton}>
                    Generate PDF Report
                </button>
            </div>

            {/* Search Input */}
            <div style={styles.searchContainer}>
                <input 
                    type="text" 
                    placeholder="Search by machine name..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    style={styles.searchInput} 
                />
            </div>

            <div style={styles.tableFrame}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Machine Name</th>
                            <th style={styles.tableHeader}>Duration Time</th>
                            <th style={styles.tableHeader}>Description</th>
                            <th style={styles.tableHeader}>Quality Details</th>
                            <th style={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMachines.map(machine => (
                            <tr key={machine._id}>
                                <td style={styles.tableCell}>{machine.machineName}</td>
                                <td style={styles.tableCell}>{machine.durationTime}</td>
                                <td style={styles.tableCell}>{machine.description}</td>
                                <td style={styles.tableCell}>{machine.qualityDetails}</td>
                                <td style={styles.tableCell}>
                                    <button onClick={() => handleUpdate(machine._id)} style={styles.editButton}>Edit</button>
                                    <button onClick={() => handleDelete(machine._id)} style={styles.deleteButton}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    addButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    viewProcessButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    reportButton: {
        padding: '10px 20px',
        backgroundColor: '#17a2b8',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    searchContainer: {
        marginBottom: '20px',
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    tableFrame: {
        border: '2px solid #007bff',
        borderRadius: '10px',
        padding: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    tableHeader: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '12px',
        textAlign: 'left',
        border: '1px solid #ddd',
    },
    tableCell: {
        padding: '10px',
        border: '1px solid #ddd',
    },
    editButton: {
        padding: '5px 10px',
        backgroundColor: '#ffc107',
        color: '#000',
        border: 'none',
        borderRadius: '5px',
        marginRight: '5px',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default MachineManager;

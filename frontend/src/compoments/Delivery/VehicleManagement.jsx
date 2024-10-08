import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../style/delivery/VehicleManagement.css'; 
import addVehicleIcon from '../../assets/addvehicle.png';
import manageVehicleIcon from '../../assets/managevehicle.png';
import generateReportIcon from '../../assets/generatereport.jpg';
import DeliveryIcon from '../../assets/delivery.png';

const VehicleManagement = () => {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [filteredVehicles, setFilteredVehicles] = useState([]); 

    useEffect(() => {
        fetchVehicles();
    }, []);

    useEffect(() => {
        const filtered = vehicles.filter(vehicle =>
            vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredVehicles(filtered);
    }, [searchQuery, vehicles]);

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://localhost:8070/api/vehicle');
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };
    
    const handleDelete = async (id) => {
        // Prompt user for confirmation
        const confirmDelete = window.confirm("Are you sure you want to delete this vehicle?");
        if (!confirmDelete) {
            return; // Exit if the user cancels the action
        }

        try {
            await axios.delete(`http://localhost:8070/api/vehicle/${id}`);
            fetchVehicles(); 
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update-vehicle/${id}`);
    };

    const handleViewProcess = () => {
        const vehicleNames = vehicles.map(vehicle => vehicle.name);
        navigate('/DeliveryDashBoardPage/Vehicle-Status', { state: { vehicleNames } });
    };

    const handleDownloadReport = () => {
        const doc = new jsPDF();
    
        doc.text("Ruhi Package Vehicles Report", 20, 10);

        const headers = [['Vehicle Name', 'Vehicle Type', 'Registration Number', 'Last Service Date', 'Next Service Date', 'Capacity', 'Status']];
    
        const data = filteredVehicles.map(vehicle => [
            vehicle.name,
            vehicle.type,
            vehicle.registrationNumber,
            new Date(vehicle.lastServiceDate).toLocaleDateString(), 
            new Date(vehicle.nextServiceDate).toLocaleDateString(), 
            vehicle.capacity.toString(),
            vehicle.status
        ]);
    
        const content = {
            startY: 20,
            head: headers,
            body: data
        };
    
        doc.autoTable(content);
        doc.save('vehicles_report.pdf');
    };

    return (
        <div className="container">
            <h5 style={{ textAlign: 'center', fontSize: '30px', marginTop: '15px', marginBottom: '35px' }}>Delivery Dashboard</h5>

            <div className="searchContainer">
                <input 
                    type="text" 
                    placeholder="Search by vehicle name..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="searchInput"
                />
            </div>

            <div className="tableFrame">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="tableHeader">Vehicle Name</th>
                            <th className="tableHeader">Vehicle Type</th>
                            <th className="tableHeader">Registration Number</th>
                            <th className="tableHeader">Last Service Date</th>
                            <th className="tableHeader">Next Service Date</th>
                            <th className="tableHeader">Capacity</th>
                            <th className="tableHeader">Status</th> 
                            <th className="tableHeader">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVehicles.map(vehicle => (
                            <tr key={vehicle._id}>
                                <td className="tableCell">{vehicle.name}</td>
                                <td className="tableCell">{vehicle.type}</td>
                                <td className="tableCell">{vehicle.registrationNumber}</td>
                                <td className="tableCell">{new Date(vehicle.lastServiceDate).toLocaleDateString()}</td>
                                <td className="tableCell">{new Date(vehicle.nextServiceDate).toLocaleDateString()}</td>
                                <td className="tableCell">{vehicle.capacity}</td>
                                <td className="tableCell">{vehicle.status}</td> 
                                <td className="tableCell">
                                    <button onClick={() => handleUpdate(vehicle._id)} className="editButton">Edit</button>
                                    <button onClick={() => handleDelete(vehicle._id)} className="deleteButton">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <section className="stock-cards">
                <div className="card" onClick={() => navigate('/DeliveryDashBoardPage/add-vehicle')}>
                    <img src={addVehicleIcon} alt="Add Vehicle" />
                    <h3 style={{ marginTop: '20px' }}>Add Vehicle</h3>
                </div>
                <div className="card" onClick={handleViewProcess}>
                    <img src={manageVehicleIcon} alt="Manage Vehicle" />
                    <h3 style={{ marginTop: '20px' }}>Manage Vehicle</h3>
                </div>
                <div className="card">
                    <Link to="/ViewAllDeliveries">
                        <img src={DeliveryIcon} alt="View Delivery" />
                        <h3 style={{ marginTop: '20px' }}>View Delivery</h3>
                    </Link>
                </div>
                <div className="card" onClick={handleDownloadReport}>
                    <img src={generateReportIcon} alt="Generate Report" />
                    <h3 style={{ marginTop: '20px' }}>Generate Report</h3>
                </div>
            </section>
        </div>
    );
};

export default VehicleManagement;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from './Breadcrumb'; // Import the Breadcrumb component
import SearchPackages from './SearchPackages'; // Import the SearchPackages component
import UpdatePackageModal from './UpdatePackageModal'; // Import the UpdatePackageModal component

const PackageList = () => {
    const [packages, setPackages] = useState([]); // State to hold all packages
    const [filteredPackages, setFilteredPackages] = useState([]); // State to hold filtered packages
    const [selectedPackage, setSelectedPackage] = useState(null); // State for the selected package to update
    const [error, setError] = useState(''); // State to hold error messages

    // Define an array of colors for the package cards
    const cardColors = [
        '#f8f9fa', '#e9ecef', '#f1f3f5', '#fff3cd', '#d4edda', '#cce5ff',
    ];

    // Fetch packages from backend API
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get('http://localhost:8070/package');
                setPackages(response.data);
                setFilteredPackages(response.data);
            } catch (err) {
                setError('Error fetching packages.');
                console.error(err);
            }
        };

        fetchPackages();
    }, []);

    // Function to handle deleting a package
    const deletePackage = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/package/delete/${id}`);
            setPackages(packages.filter(pkg => pkg._id !== id));
            setFilteredPackages(filteredPackages.filter(pkg => pkg._id !== id));
            
        } catch (err) {
            setError('Error deleting package.');
            console.error(err);
        }
    };

    // Function to handle search/filtering
    const handleSearch = (filteredPackages) => {
        setFilteredPackages(filteredPackages);
    };

    // Function to handle updating a package
    const handleUpdate = (updatedPackage) => {
        setPackages(packages.map(pkg => (pkg._id === updatedPackage._id ? updatedPackage : pkg)));
        setFilteredPackages(filteredPackages.map(pkg => (pkg._id === updatedPackage._id ? updatedPackage : pkg)));
        setSelectedPackage(null); // Close the modal after updating
    };

    return (
        <div>
            <Breadcrumb />
            <h1>Package List</h1>

            {/* Search and Material Filter Component */}
            <SearchPackages packages={packages} onSearch={handleSearch} />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display filtered packages */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {filteredPackages.map((pkg, index) => (
                    <div key={pkg._id} style={{ ...cardStyle, backgroundColor: cardColors[index % cardColors.length] }}>
                        <h2>{pkg.PackageName}</h2>
                        <p>Type: {pkg.PackageType}</p>
                        <p>Description: {pkg.PackageDescription}</p>
                        <p>Material: {pkg.Material}</p>
                        <p>Dimensions: {pkg.Length} x {pkg.Width} x {pkg.Height}</p>
                        <div style={buttonContainerStyle}>
                            <button
                                style={updateButtonStyle}
                                onClick={() => setSelectedPackage(pkg)}> {/* Open modal for updating */}
                                Update
                            </button>
                            
                            <button
                                style={deleteButtonStyle}
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this package?')) {
                                        deletePackage(pkg._id);
                                    }
                                }}
                            >
                                Delete
                            </button>
                            

                        </div>
                    </div>
                ))}
            </div>

            {/* Conditionally render the update modal */}
            {selectedPackage && (
                <UpdatePackageModal
                    pkg={selectedPackage}
                    onClose={() => setSelectedPackage(null)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

// Inline styles for card and buttons
const cardStyle = {
    border: '1px solid #dee2e6',
    borderRadius: '10px',
    padding: '20px',
    margin: '10px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s',
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
};

const updateButtonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

const deleteButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

export default PackageList;

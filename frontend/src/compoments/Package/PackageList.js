import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from './Breadcrumb';
import SearchPackages from './SearchPackages';
import UpdatePackageModal from './UpdatePackageModal';

const PackageList = () => {
    const [packages, setPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [error, setError] = useState('');

    const cardColors = [
        '#f8f9fa', '#e9ecef', '#f1f3f5', '#fff3cd', '#d4edda', '#cce5ff',
    ];

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

    const handleSearch = (filteredPackages) => {
        setFilteredPackages(filteredPackages);
    };

    // Update package list after editing the package
    const handleUpdate = (updatedPackage) => {
        // Update the list of packages
        const updatedPackages = packages.map(pkg => 
            pkg._id === updatedPackage._id ? updatedPackage : pkg
        );

        setPackages(updatedPackages);
        setFilteredPackages(updatedPackages);
        setSelectedPackage(null); // Close the modal after update
    };

    return (
        <div>
            <Breadcrumb />
            <h1>Package List</h1>

            <SearchPackages packages={packages} onSearch={handleSearch} />

            {error && <p style={{ color: 'red' }}>{error}</p>}

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
                                onClick={() => setSelectedPackage(pkg)}> {/* Set full package object */}
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

            {selectedPackage && (
                <UpdatePackageModal
                    selectedPackage={selectedPackage}
                    onClose={() => setSelectedPackage(null)}
                    onUpdate={handleUpdate} // Pass the handleUpdate function
                />
            )}
        </div>
    );
};

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
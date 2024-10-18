import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePackageModal = ({ selectedPackage, onClose, onUpdate }) => {
    const [packageName, setPackageName] = useState('');
    const [packageType, setPackageType] = useState('');
    const [packageDescription, setPackageDescription] = useState('');
    const [material, setMaterial] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (selectedPackage) {
            setPackageName(selectedPackage.PackageName || '');
            setPackageType(selectedPackage.PackageType || '');
            setPackageDescription(selectedPackage.PackageDescription || '');
            setMaterial(selectedPackage.Material || '');
            setLength(selectedPackage.Length || '');
            setWidth(selectedPackage.Width || '');
            setHeight(selectedPackage.Height || '');
        }
    }, [selectedPackage]);

    const handleUpdate = async () => {
        setLoading(true);
        setError('');

        if (!packageName || !packageType || !material) {
            setError('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        const updatedPackage = {
            PackageName: packageName,
            PackageType: packageType,
            PackageDescription: packageDescription,
            Material: material,
            Length: length,
            Width: width,
            Height: height,
        };

        try {
            const response = await axios.put(`http://localhost:8070/package/update/${selectedPackage._id}`, updatedPackage);
            console.log('API response:', response);

            // Pass the updated package to the parent component
            onUpdate({ ...updatedPackage, _id: selectedPackage._id });

            onClose(); // Close modal after updating
        } catch (err) {
            console.error('Error updating package:', err);
            setError('Error updating package. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h2>Update Package</h2>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <label style={labelStyle}>
                    Package Name:
                    <input
                        type="text"
                        value={packageName}
                        onChange={(e) => setPackageName(e.target.value)}
                        style={inputStyle}
                    />
                </label>
                <label style={labelStyle}>
                    Package Type:
                    <select
                        value={packageType}
                        onChange={(e) => setPackageType(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="Bottle">Bottle</option>
                        <option value="Box">Box</option>
                        <option value="Bag">Bag</option>
                        <option value="Can">Can</option>
                    </select>
                </label>
                <label style={labelStyle}>
                    Package Description:
                    <textarea
                        value={packageDescription}
                        onChange={(e) => setPackageDescription(e.target.value)}
                        style={inputStyle}
                    />
                </label>
                <label style={labelStyle}>
                    Material:
                    <select
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="Glass">Glass</option>
                        <option value="Plastic">Plastic</option>
                        <option value="Cardboard">Cardboard</option>
                        <option value="Metal">Metal</option>
                        <option value="Fabric">Fabric</option>
                        <option value="Paper">Paper</option>
                    </select>
                </label>
                <label style={labelStyle}>
                    Length (cm):
                    <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        style={inputStyle}
                    />
                </label>
                <label style={labelStyle}>
                    Width (cm):
                    <input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        style={inputStyle}
                    />
                </label>
                <label style={labelStyle}>
                    Height (cm):
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        style={inputStyle}
                    />
                </label>

                <div style={buttonContainerStyle}>
                    <button onClick={onClose} style={cancelButtonStyle}>
                        Cancel
                    </button>
                    <button onClick={handleUpdate} disabled={loading} style={updateButtonStyle}>
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
};

const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
};

const labelStyle = {
    marginBottom: '10px',
};

const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #ced4da',
    borderRadius: '5px',
    marginBottom: '10px',
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

const cancelButtonStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

export default UpdatePackageModal;
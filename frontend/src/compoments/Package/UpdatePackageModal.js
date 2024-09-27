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

    // Initialize state with the selected package's data when the component is mounted
    useEffect(() => {
        if (selectedPackage) {
            setPackageName(selectedPackage.PackageName);
            setPackageType(selectedPackage.PackageType);
            setPackageDescription(selectedPackage.PackageDescription);
            setMaterial(selectedPackage.Material);
            setLength(selectedPackage.Length);
            setWidth(selectedPackage.Width);
            setHeight(selectedPackage.Height);
        }
    }, [selectedPackage]);

    // Function to handle the update submission
    const handleUpdate = async () => {
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
            await axios.put(`http://localhost:8070/package/update/${selectedPackage._id}`, updatedPackage);
            onUpdate(updatedPackage); // Call the onUpdate function passed from parent
            onClose(); // Close the modal
        } catch (err) {
            console.error('Error updating package:', err);
        }
    };

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h2>Update Package</h2>
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
                        <option value="Polythene">Polythene</option>
                    </select>
                </label>
                <label style={labelStyle}>
                    Length:
                    <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        style={inputStyle}
                    />
                </label>
                <label style={labelStyle}>
                    Width:
                    <input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        style={inputStyle}
                    />
                </label>
                <label style={labelStyle}>
                    Height:
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        style={inputStyle}
                    />
                </label>
                <div style={buttonContainerStyle}>
                    <button onClick={handleUpdate} style={buttonStyle}>Save Changes</button>
                    <button onClick={onClose} style={buttonStyle}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

// Inline Styles
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
};

const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
};

const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
};

const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '5px',
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
};

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

buttonStyle[':hover'] = {
    opacity: '0.9',
};

export default UpdatePackageModal;

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
            Height: height
        };

        try {
            await axios.put(`http://localhost:8070/package/update/${selectedPackage._id}`, updatedPackage); // Adjust the URL based on your backend
            onUpdate(updatedPackage); // Call the onUpdate function passed from parent
            onClose(); // Close the modal
        } catch (err) {
            console.error('Error updating package:', err);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Update Package</h2>
                <label>
                    Package Name:
                    <input
                        type="text"
                        value={packageName}
                        onChange={(e) => setPackageName(e.target.value)}
                    />
                </label>
                <label>
                    Package Type:
                    <select
                        value={packageType}
                        onChange={(e) => setPackageType(e.target.value)}
                    >
                        <option value="Bottle">Bottle</option>
                        <option value="Box">Box</option>
                        <option value="Bag">Bag</option>
                        <option value="Can">Can</option>

                        {/* Add other options here */}
                    </select>
                </label>
                <label>
                    Package Description:
                    <textarea
                        value={packageDescription}
                        onChange={(e) => setPackageDescription(e.target.value)}
                    />
                </label>
                <label>
                    Material:
                    <select
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                    >
                        <option value="Glass">Glass</option>
                        <option value="Plastic">Plastic</option>
                        <option value="Cardboard">Cardboard</option>
                        <option value="Metal">Metal</option>
                        <option value="Fabric">Fabric</option>
                        <option value="Paper">Paper</option>
                        <option value="Polythene">Polythene</option>
                        {/* Can add other options as needed */}
                    </select>
                </label>
                <label>
                    Length:
                    <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                    />
                </label>
                <label>
                    Width:
                    <input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                    />
                </label>
                <label>
                    Height:
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </label>
                <div className="modal-buttons">
                    <button onClick={handleUpdate}>Save Changes</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

// Simple CSS styles for modal (adjust as per your design)
const modalStyles = `
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
}

.modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    opacity: 0.9;
}

button:focus {
    outline: none;
}
`;

// Inject modal styles into the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = modalStyles;
document.head.appendChild(styleSheet);

export default UpdatePackageModal;

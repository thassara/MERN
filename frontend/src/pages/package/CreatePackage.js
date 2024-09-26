// src/compoments/Package/CreatePackage.js

import React, { useState } from 'react';
import axios from 'axios';

const CreatePackage = () => {
    const [packageData, setPackageData] = useState({
        PackageName: '',
        PackageType: '',
        PackageDescription: '',
        Material: '',
        Length: '',
        Width: '',
        Height: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPackageData({
            ...packageData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/packages/create', packageData);
            alert('Package created successfully!');
            setPackageData({
                PackageName: '',
                PackageType: '',
                PackageDescription: '',
                Material: '',
                Length: '',
                Width: '',
                Height: ''
            });
        } catch (error) {
            console.error("Error creating package:", error);
            alert('Failed to create package');
        }
    };

    return (
        <div>
            <h2>Create Package</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="PackageName" placeholder="Package Name" value={packageData.PackageName} onChange={handleChange} required />
                <input type="text" name="PackageType" placeholder="Package Type" value={packageData.PackageType} onChange={handleChange} required />
                <input type="text" name="PackageDescription" placeholder="Package Description" value={packageData.PackageDescription} onChange={handleChange} />
                <input type="text" name="Material" placeholder="Material" value={packageData.Material} onChange={handleChange} required />
                <input type="number" name="Length" placeholder="Length" value={packageData.Length} onChange={handleChange} required />
                <input type="number" name="Width" placeholder="Width" value={packageData.Width} onChange={handleChange} required />
                <input type="number" name="Height" placeholder="Height" value={packageData.Height} onChange={handleChange} required />
                <button type="submit">Create Package</button>
            </form>
        </div>
    );
};

export default CreatePackage;

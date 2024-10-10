import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="container mt-5 mb-5" style={containerStyle}>
            <h2 className="text-center mb-4" style={headingStyle}>Create a New Package</h2>
            <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded" style={formStyle}>
                <div className="mb-3">
                    <label htmlFor="PackageName" className="form-label">Package Name:</label>
                    <input
                        type="text"
                        name="PackageName"
                        className="form-control"
                        placeholder="Enter Package Name"
                        value={packageData.PackageName}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="PackageType" className="form-label">Package Type:</label>
                    <input
                        type="text"
                        name="PackageType"
                        className="form-control"
                        placeholder="Enter Package Type"
                        value={packageData.PackageType}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="PackageDescription" className="form-label">Package Description:</label>
                    <textarea
                        name="PackageDescription"
                        className="form-control"
                        placeholder="Enter Package Description"
                        value={packageData.PackageDescription}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="Material" className="form-label">Material:</label>
                    <input
                        type="text"
                        name="Material"
                        className="form-control"
                        placeholder="Enter Material"
                        value={packageData.Material}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="Length" className="form-label">Length:</label>
                        <input
                            type="number"
                            name="Length"
                            className="form-control"
                            placeholder="Length"
                            value={packageData.Length}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="Width" className="form-label">Width:</label>
                        <input
                            type="number"
                            name="Width"
                            className="form-control"
                            placeholder="Width"
                            value={packageData.Width}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="Height" className="form-label">Height:</label>
                        <input
                            type="number"
                            name="Height"
                            className="form-control"
                            placeholder="Height"
                            value={packageData.Height}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary" style={submitButtonStyle}>Submit</button>
                </div>
            </form>
        </div>
    );
};

// Inline styles for better modern appearance
const containerStyle = {
    maxWidth: '600px',
    backgroundColor: '#fff',
};

const headingStyle = {
    color: '#343a40',
    fontWeight: 'bold',
};

const formStyle = {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
};

const submitButtonStyle = {
    padding: '10px',
    fontSize: '18px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    boxShadow: '0px 4px 6px rgba(0, 123, 255, 0.1)',
};

export default CreatePackage;


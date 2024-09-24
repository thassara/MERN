import React, { useState } from 'react';
import axios from 'axios';

function CreatePackage() {
    const [formData, setFormData] = useState({
        packageName: '',
        packageType: '',
        material: '',
        length: '',
        width: '',
        height: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.packageName) newErrors.packageName = "Package name is required.";
        if (!formData.packageType) newErrors.packageType = "Package type is required.";
        if (!formData.material) newErrors.material = "Material is required.";

        if (!formData.length) {
            newErrors.length = "Length is required.";
        } else if (formData.length <= 0) {
            newErrors.length = "Length must be greater than zero.";
        }

        if (!formData.width) {
            newErrors.width = "Width is required.";
        } else if (formData.width <= 0) {
            newErrors.width = "Width must be greater than zero.";
        }

        if (!formData.height) {
            newErrors.height = "Height is required.";
        } else if (formData.height <= 0) {
            newErrors.height = "Height must be greater than zero.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form Data:', formData);
            // Process the formData here
        }
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
    };

    const formGroupStyle = {
        marginBottom: '15px',
    };

    const labelStyle = {
        marginBottom: '5px',
        fontWeight: 'bold'
    };

    const inputStyle = {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
        boxSizing: 'border-box'
    };

    const errorStyle = {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px'
    };

    const dimensionsStyle = {
        display: 'flex',
        justifyContent: 'space-between',
    };

    const dimensionInputStyle = {
        width: '30%',
    };

    const buttonStyle = {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: '#0056b3',
    };

    //function for after submit button
    function sendData(e){
        e.preventDefault();

        const newPackage = {
            packageName: formData.packageName,
            packageType: formData.packageType,
            material: formData.material,
            length: formData.length,
            width: formData.width,
            height: formData.height
        }
        axios.post('http://localhost:8070/package/create', newPackage).then(() => {
            alert("Package added");
            window.location.reload();
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <form onSubmit={sendData} style={formStyle}>
            <div style={formGroupStyle}>
                <label htmlFor="packageName" style={labelStyle}>Package Name:</label>
                <input
                    type="text"
                    id="packageName"
                    name="packageName"
                    value={formData.packageName}
                    onChange={handleChange}
                    style={inputStyle}
                    required />
                {errors.packageName && <div style={errorStyle}>{errors.packageName}</div>}
            </div>

            <div style={formGroupStyle}>
                <label htmlFor="packageType" style={labelStyle}>Package Type:</label>
                <input
                    type="text"
                    id="packageType"
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleChange}
                    style={inputStyle}
                    required />
                {errors.packageType && <div style={errorStyle}>{errors.packageType}</div>}
            </div>

            <div style={formGroupStyle}>
                <label htmlFor="material" style={labelStyle}>Material:</label>
                <input
                    type="text"
                    id="material"
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    style={inputStyle}
                    required />
                {errors.material && <div style={errorStyle}>{errors.material}</div>}
            </div>

            <div style={formGroupStyle}>
                <label style={labelStyle}>Dimensions:</label>
                <div style={dimensionsStyle}>
                    <div style={dimensionInputStyle}>
                        <label htmlFor="length" style={labelStyle}>Length:</label>
                        <input
                            type="number"
                            id="length"
                            name="length"
                            value={formData.length}
                            onChange={handleChange}
                            style={inputStyle}
                            required />
                        {errors.length && <div style={errorStyle}>{errors.length}</div>}
                    </div>
                    <div style={dimensionInputStyle}>
                        <label htmlFor="width" style={labelStyle}>Width:</label>
                        <input
                            type="number"
                            id="width"
                            name="width"
                            value={formData.width}
                            onChange={handleChange}
                            style={inputStyle}
                            required />
                        {errors.width && <div style={errorStyle}>{errors.width}</div>}
                    </div>
                    <div style={dimensionInputStyle}>
                        <label htmlFor="height" style={labelStyle}>Height:</label>
                        <input
                            type="number"
                            id="height"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            style={inputStyle}
                            required />
                        {errors.height && <div style={errorStyle}>{errors.height}</div>}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                style={buttonStyle}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#007bff'}
            >
                Submit
            </button>
        </form>
    );
}

export default CreatePackage;
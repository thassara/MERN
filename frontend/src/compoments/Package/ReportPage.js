import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Breadcrumb from "./Breadcrumb"; // Import the Breadcrumb component
import SearchPackages from "./SearchPackages"; // Import the SearchPackages component

const ReportPage = () => {
    const [packages, setPackages] = useState([]); // State to hold all packages
    const [filteredPackages, setFilteredPackages] = useState([]); // State to hold filtered packages
    const [error, setError] = useState(""); // State to hold error messages

    // Fetch packages from backend API
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get("http://localhost:8070/package"); // Adjust the URL based on your backend API
                setPackages(response.data); // Set the packages state with the fetched data
                setFilteredPackages(response.data); // Initially set filteredPackages to all packages
            } catch (err) {
                setError("Error fetching packages."); // Handle error
                console.error(err);
            }
        };

        fetchPackages(); // Call the fetch function
    }, []); // Empty dependency array to run once on component mount

    // Function to handle printing of a single package
    const handlePrint = (pkg) => {
        const printContent = `
            <div>
                <h2>${pkg.PackageName}</h2>
                <p>Type: ${pkg.PackageType}</p>
                <p>Description: ${pkg.PackageDescription}</p>
                <p>Material: ${pkg.Material}</p>
                <p>Dimensions: ${pkg.Length} x ${pkg.Width} x ${pkg.Height}</p>
            </div>
        `;

        const newWindow = window.open("", "_blank");
        newWindow.document.write(`
            <html>
                <head>
                    <title>Print Package</title>
                </head>
                <body>
                    ${printContent}
                </body>
            </html>
        `);
        newWindow.document.close();
        newWindow.print();
        newWindow.close();
    };

    return (
        <div>
            <Breadcrumb /> {/* Display the Breadcrumb component at the top */}
            <h1>Package Report</h1>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error if any */}
            
            <SearchPackages packages={packages} onSearch={setFilteredPackages} /> {/* Use the search component */}

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                {filteredPackages.map((pkg) => (
                    <div key={pkg._id} style={cardStyle}>
                        <h2>{pkg.PackageName}</h2>
                        <p>Type: {pkg.PackageType}</p>
                        <p>Description: {pkg.PackageDescription}</p>
                        <p>Material: {pkg.Material}</p>
                        <p>Dimensions: {pkg.Length} x {pkg.Width} x {pkg.Height}</p>
                        <div style={buttonContainerStyle}>
                            <button style={printButtonStyle} onClick={() => handlePrint(pkg)}>Print</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Inline styles for card and buttons
const cardStyle = {
    border: "1px solid #dee2e6",
    borderRadius: "10px",
    padding: "20px",
    margin: "10px",
    width: "300px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s",
};

const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
};

const printButtonStyle = {
    backgroundColor: "#ffc107", // Yellow background for print button
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    boxShadow: "0 0 10px rgba(255, 193, 7, 0.5)", // Glowing effect
};

export default ReportPage;

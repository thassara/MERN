import React, { useState } from 'react';
import Breadcrumb from '../../compoments/Package/Breadcrumb'; // Import Breadcrumb component
import { Link } from 'react-router-dom'; // Import Link component
import ReportPage from '../../compoments/Package/ReportPage';

const PackageDashBoardPage = () => {
    return (
        <div style={containerStyle}>
            <Breadcrumb />
            <h2 style={headingStyle}>Package Dashboard</h2>

            <div className="container">
                <div className="row">
                    {/* Cards for key stats */}
                    <div className="col-md-4">
                        <div style={cardStyle}>
                            <h3>Total Packages</h3>
                            <p style={statsStyle}>120</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div style={cardStyle}>
                            <h3>New Orders</h3>
                            <p style={statsStyle}>35</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div style={cardStyle}>
                            <h3>Pending Approvals</h3>
                            <p style={statsStyle}>15</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* Action buttons with glowing effect */}
                    <div className="col-md-6">
                        <Link to="/create">
                            <button
                                style={{ ...actionButtonStyle, ...glowingEffect }}
                                onMouseEnter={(e) => (e.target.style.boxShadow = glowHoverEffect)}
                                onMouseLeave={(e) => (e.target.style.boxShadow = glowingEffect.boxShadow)}
                            >
                                Add New Package
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <Link to="/reportGen">
                            <button
                                style={{ ...actionButtonStyle, ...glowingEffect }}
                                onMouseEnter={(e) => (e.target.style.boxShadow = glowHoverEffect)}
                                onMouseLeave={(e) => (e.target.style.boxShadow = glowingEffect.boxShadow)}
                            >
                                View Reports
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="row">
                    {/* Links to other sections */}
                    <div className="col-md-4">
                        <div style={cardStyle}>
                            <h3>Manage Packages</h3>
                            <p>View, Edit, or Delete packages</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div style={cardStyle}>
                            <h3>Analytics</h3>
                            <p>View package usage statistics</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div style={cardStyle}>
                            <h3>Settings</h3>
                            <p>Adjust system settings</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

// Inline styles for the dashboard layout
const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
};

const headingStyle = {
    textAlign: 'center',
    margin: '20px 0',
    fontSize: '2rem',
    color: '#343a40',
};

const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '20px 0',
    textAlign: 'center',
};

const statsStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#007bff',
};

const actionButtonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    margin: '10px 0',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
};

const glowingEffect = {
    boxShadow: '0 0 15px rgba(0, 123, 255, 0.5)',
};

const glowHoverEffect = '0 0 25px rgba(0, 123, 255, 0.8)';

export default PackageDashBoardPage;
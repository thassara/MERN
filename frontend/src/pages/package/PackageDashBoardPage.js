import React from 'react';
import Breadcrumb from '../../compoments/Package/Breadcrumb'; // Import Breadcrumb component
import { Link } from 'react-router-dom'; // Import Link component

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
                            <p>120</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div style={cardStyle}>
                            <h3>New Orders</h3>
                            <p>35</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div style={cardStyle}>
                            <h3>Pending Approvals</h3>
                            <p>15</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* Action buttons */}
                    <div className="col-md-6">
                        <Link to="/create">
                            <button style={actionButtonStyle}>
                                Add New Package
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <Link to="/add-new-package">
                            <button style={actionButtonStyle}>
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

// Inline styles
const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
};

const headingStyle = {
    textAlign: 'center',
    margin: '20px 0',
};

const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '20px 0',
    textAlign: 'center',
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
    transition: 'background-color 0.3s ease',
};

export default PackageDashBoardPage;

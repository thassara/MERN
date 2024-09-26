import React from 'react';
import { Link } from 'react-router-dom';

function PackageDashBoard() {
  return (
    <div>
      <div style={{ backgroundColor: '#333', overflow: 'hidden' }}>
        <div style={{ float: 'left', padding: '14px 16px' }}>
          <h2 style={{ color: '#fff', margin: 0 }}>Package Management</h2>
        </div>
        <div style={{ float: 'right' }}>
          <a href="#" style={{ float: 'left', display: 'block', color: '#f2f2f2', textAlign: 'center', padding: '14px 16px', textDecoration: 'none' }}>
            Dashboard
          </a>
          <a href="/create" style={{ float: 'left', display: 'block', color: '#f2f2f2', textAlign: 'center', padding: '14px 16px', textDecoration: 'none' }}>
            Create Package
          </a>
          <a href="/" style={{ float: 'left', display: 'block', color: '#f2f2f2', textAlign: 'center', padding: '14px 16px', textDecoration: 'none' }}>
            Manage Packages
          </a>
          <a href="#" style={{ float: 'left', display: 'block', color: '#f2f2f2', textAlign: 'center', padding: '14px 16px', textDecoration: 'none' }}>
            Reports
          </a>
          <a href="#" style={{ float: 'left', display: 'block', color: '#f2f2f2', textAlign: 'center', padding: '14px 16px', textDecoration: 'none' }}>
            Logout
          </a>
        </div>
      </div>

      <div style={{ padding: '280px' }}>
        <h3>Welcome to the Package Management Dashboard</h3>
        <p>Use the navigation bar to manage your packages, create new ones, view reports, and more.</p>
      </div>
    </div>
  );
}
export default PackageDashBoard;

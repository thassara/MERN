import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllPackages.css'; // Import the CSS file

export default function AllPackages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    function getPackages() {
      axios.get("http://localhost:8070/package/")
        .then((res) => {
          setPackages(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getPackages();
  }, []);

  return (
    <div className="packages-container">
      <h1>All Packages</h1>
      <div className="packages-grid">
        {packages.map((pkg) => (
          <div className="package-card" key={pkg._id}>
            <h2>{pkg.PackageName}</h2>
            <p><strong>Type:</strong> {pkg.PackageType}</p>
            <p><strong>Description:</strong> {pkg.PackageDescription}</p>
            <p><strong>Material:</strong> {pkg.Material}</p>
            <p><strong>Dimensions:</strong> {pkg.Length}x{pkg.Width}x{pkg.Height} cm</p>
          </div>
        ))}
      </div>
    </div>
  );
}

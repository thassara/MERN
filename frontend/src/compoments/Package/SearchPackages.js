import React, { useState } from 'react';

const SearchPackages = ({ packages, onSearch }) => {
    const [query, setQuery] = useState('');
    const [selectedType, setSelectedType] = useState(''); // State to hold selected package type
    const [selectedMaterial, setSelectedMaterial] = useState(''); // State to hold selected material

    // Get unique types and materials from packages for dropdown options
    const uniqueTypes = [...new Set(packages.map(pkg => pkg.PackageType.toLowerCase()))];
    const uniqueMaterials = [...new Set(packages.map(pkg => pkg.Material.toLowerCase()))];

    const handleSearch = () => {
        const filteredPackages = packages.filter(pkg => {
            return (
                pkg.PackageName.toLowerCase().includes(query.toLowerCase()) &&
                (selectedType === '' || pkg.PackageType.toLowerCase() === selectedType.toLowerCase()) &&
                (selectedMaterial === '' || pkg.Material.toLowerCase() === selectedMaterial.toLowerCase())
            );
        });
        onSearch(filteredPackages); // Send filtered results back to parent
    };

    // Handle text input search
    const handleQueryChange = (e) => {
        setQuery(e.target.value);
        handleSearch(); // Trigger search on query change
    };

    // Handle package type selection
    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        handleSearch(); // Trigger search on type change
    };

    // Handle material selection
    const handleMaterialChange = (e) => {
        setSelectedMaterial(e.target.value);
        handleSearch(); // Trigger search on material change
    };

    return (
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search packages..."
                value={query}
                onChange={handleQueryChange}
                style={{ padding: '10px', width: '40%' }}
            />

            {/* Dropdown for Package Type */}
            <select value={selectedType} onChange={handleTypeChange} style={{ padding: '10px', width: '25%' }}>
                <option value="">All Types</option>
                {uniqueTypes.map((type, index) => (
                    <option key={index} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                ))}
            </select>

            {/* Dropdown for Material */}
            <select value={selectedMaterial} onChange={handleMaterialChange} style={{ padding: '10px', width: '25%' }}>
                <option value="">All Materials</option>
                {uniqueMaterials.map((material, index) => (
                    <option key={index} value={material}>
                        {material.charAt(0).toUpperCase() + material.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SearchPackages;

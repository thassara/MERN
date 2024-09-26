
import React from 'react';
import { Link } from 'react-router-dom';
import PackageList from '../../compoments/Package/PackageList';
import Breadcrumb from '../../compoments/Package/Breadcrumb'; // Import Breadcrumb component

const PackageDashBoardPage = () => {
    return (
        <div>
            <Breadcrumb />
            <h2>Package Dashboard</h2>
            
        </div>
    );
}

export default PackageDashBoardPage;

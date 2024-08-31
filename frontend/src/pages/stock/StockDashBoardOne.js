import React from 'react';
import { useNavigate } from 'react-router-dom';
function StockDashBoardOne() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
      navigate(`/AdminChoose${path}`);
    };
    return (
        <div>
            <h1>Stock Dashboard</h1>
            <button onClick={() => handleNavigate('/StockAddForm')}>View Stock</button>
            
        </div>
    );
}
export default StockDashBoardOne;
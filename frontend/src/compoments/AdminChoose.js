import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminChoose() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(`/AdminChoose${path}`);
  };
  return (
        <div>
          <div>
            <style>
              {`
              .tilesAdmin {
                display: inline-block;
                width: 21%;
                height: 500px;
                margin: 50px 20px 50px 20px;
                padding: 20px;
                color: black;
                text-align: center;
                text-decoration: none;
                border-radius: 15px;
                border: 3px solid #031f42;
                font-family: Arial, sans-serif;
                font-weight: bold;
                font-size: 40px;
               }
              .ACTileLayout{  
                text-align: center;
              }
              }
            `}
              
            </style>
          </div>
          <div  className ="ACTileLayout">
            <button className="tilesAdmin" onClick={() => handleNavigate('/GMLogin')}>General Manager</button>
            <button className="tilesAdmin" onClick={() => handleNavigate('/DMLogin')}>Deputy Manager</button>
            <button className="tilesAdmin" onClick={() => handleNavigate('/PMLogin')}>Plant Manager</button>
            <button className="tilesAdmin" onClick={() => handleNavigate('/SMLogin')}>Stock Manager</button>
          </div>
        </div>
       
  );
}
export default AdminChoose;
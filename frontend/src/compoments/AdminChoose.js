import React from 'react';

function AdminChoose() {
  return (
        <div>
          <div>
            <style>
              {`
              .tilesAdmin {
                display: inline-block;
                width: 20%;
                height: 500px;
                margin: 10px;
                padding: 20px;
                backgroud: #007bff;
                color: white;
                text-align: center;
                text-decoration: none;
                border-radius: 15px;
                border: none;
                cursor: pointer;
                font-size: 1.5rem;
                line-height: 160px; 
               }
              }
              `}
              
            </style>
          </div>
          <a class = "tilesAdmin" href=""><button>General Manager</button></a>
          <a class = "tilesAdmin" href=""><button>Deputy Manager</button></a>
          <a class = "tilesAdmin" href=""><button>Plant Manager</button></a>
          <a class = "tilesAdmin" href=""><button>Stock Manager</button></a>
        </div>
       
  );
}
export default AdminChoose;
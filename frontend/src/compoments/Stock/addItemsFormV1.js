import React from 'react';
import './../../style/stock/addItemsFormV1.css';

function addItemsFormV1() {
  return (
  
    <div className="stock-dashboard-container">
      <h3 className="mngItems">Manage Items</h3>

      <div className="flex-container">

        <div className="form-container">

        <h4>Add New Item</h4>

        <form>
          <div class="mb-3">
            <label for="Item Name" class="form-label">Item Name</label>
            <input type="text" class="form-control" id="itemName" placeholder="Enter Item Name" onChange={(e)=>{

             //setitemName(e.target.value);

            }}
            />
  
          </div>

          <div className="mb-3">
            <label for="Alert Quantity" className="form-label">Alert Quantity</label>
            <input type="number" className="form-control" id="alertQty" placeholder="Enter Alert Quantity" onChange={(e)=>{

            //setalrtQty(e.target.value);

            }}
            />
  
          </div>

          <div class="mb-3">
            <label for="measurement" className="form-label">Measurement</label>
            <input type="text" className="form-control" id="measurement" placeholder="Enter item measurement" onChange={(e)=>{

            //setMeasurement(e.target.value);

            }}

            />
  
          </div>

          <button type="submit" className="addItemsbtn">Submit</button>

        </form>
       </div>

      
      <div className="table-container">
        <div className="table-header">Details</div>
        
        <div className="controls">
          
          <div>
            <input type="search" placeholder="Search..." />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Alert Quantity</th>
              <th>Measurement</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {/* Add table rows here */}
            <tr>
              <td>Ink</td>
              <td>1000</td>
              <td>ml</td>
              <td className="edit-icon">&#9998;</td> {/* Unicode for pencil/edit icon */}
            </tr>
            {/* Repeat <tr> as necessary for more rows */}
          </tbody>
        </table>

        </div>
      </div>
    </div>


  );

}




export default addItemsFormV1;
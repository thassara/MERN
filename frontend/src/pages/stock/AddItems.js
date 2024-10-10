import React from "react";
import AddItemsFormV1 from './addItemsFormV1';
import AllStock from './allStock';
import '../../style/stock/addItemsFormV1.css';

export default function AddNewItemForm() {
  return (
    <div className="form-table-container">
      <div className="add-items-form">
        <AddItemsFormV1 />
      </div>
      
      <div className="manage-items-table">
        <AllStock />
      </div>
    </div>
  );
}

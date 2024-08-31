import React from 'react';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <style>
        {`
          .or_container {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          .or_header {
            font-size: 24px;
            text-align: center;
            color: #031f42;
            margin-bottom: 30px;
          }
          .or_orderSection {
            display: flex;
            justify-content: space-between;
          }
          .or_orderBox {
            width: 45%;
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 20px;
            background-color: #f7f7f7;
          }
          .or_title {
            font-size: 18px;
            margin-bottom: 20px;
          }
          .or_trackingBar {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .or_step {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background-color: #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #fff;
          }
          .or_completedStep {
            background-color: green;
          }
          .or_stepLine {
            width: 100%;
            height: 2px;
            background-color: #ccc;
          }
          .or_trackingLabels {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
          }
          .or_labelText {
            font-size: 14px;
          }
          .or_infoBox {
            background-color: #ccc;
            padding: 10px;
            border-radius: 5px;
          }
          .or_infoText {
            font-size: 14px;
            margin: 5px 0;
          }
          .or_infoSpan {
            font-weight: bold;
          }
          .or_actionButtons {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
          }
          .or_editButton {
            background-color: #2da6ab;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
          }
          .or_deleteButton {
            background-color: #f44336;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
          }
          .or_otherOrders {
            margin-top: 30px;
          }
          .or_table {
            width: 100%;
            border-collapse: collapse;
          }
          .or_tableHeader {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: left;
          }
          .or_tableData {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: left;
          }
          .or_moreButton {
            background-color: #6a5acd;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
          }
        `}
      </style>

      <div className="or_orderSection">
        <div className="or_orderBox">
          <h2 className="or_title">ORDER TRACKING</h2>
          <div className="or_trackingBar">
            <div className="or_step or_completedStep">✔</div>
            <div className="or_stepLine"></div>
            <div className="or_step or_completedStep">✔</div>
            <div className="or_stepLine"></div>
            <div className="or_step">⚪</div>
          </div>
          <div className="or_trackingLabels">
            <p className="or_labelText">Approval Order</p>
            <p className="or_labelText">Processing Order</p>
            <p className="or_labelText">Finish Product</p>
          </div>
        </div>

        <div className="or_orderBox">
          <h2 className="or_title">ORDER INFO</h2>
          <div className="or_infoBox">
            <p className="or_infoText">Order ID : <span className="or_infoSpan">E43D213</span></p>
            <p className="or_infoText">Quantity : <span className="or_infoSpan">250 pcs</span></p>
            <p className="or_infoText">Package Type : <span className="or_infoSpan">restaurants pack</span></p>
            <p className="or_infoText">Finishing data : <span className="or_infoSpan">15/05/2024</span></p>
          </div>
          <div className="or_actionButtons">
            <button className="or_editButton">Edit</button>
            <button className="or_deleteButton">Delete</button>
          </div>
        </div>
      </div>

      <div className="or_otherOrders">
        <h2 className="or_title">OTHER ORDERS</h2>
        <table className="or_table">
          <thead>
            <tr>
              <th className="or_tableHeader">Order ID</th>
              <th className="or_tableHeader">Package type</th>
              <th className="or_tableHeader">Order ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="or_tableData">E2895A</td>
              <td className="or_tableData">Cardboard pack</td>
              <td className="or_tableData"><button className="or_moreButton">More</button></td>
            </tr>
            <tr>
              <td className="or_tableData">E2895A</td>
              <td className="or_tableData">Restaurants packs</td>
              <td className="or_tableData"><button className="or_moreButton">More</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

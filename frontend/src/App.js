import React from 'react';
import './App.css';
import Header from './compoments/Header'; // Importing Header component
import Footer from './compoments/Footer'; // Importing Footer component
import Intro from './compoments/Intro'; // Importing Intro component
import CustomerLogin from './compoments/Login/CustomerLogin'; // Importing Customer Login component
import CustomerProfilePage from './pages/customer/CustomerProfilePage'; // Importing Customer Profile Page component
import AdminLogin from './compoments/AdminLogin'; // Importing Admin Login component
import EmpLogin from './compoments/EmpLogin'; // Importing Employee Login component
import GMChoose from './compoments/GMChoose'; // Importing GM Choose component
import DMChoose from './compoments/DMChoose'; // Importing DM Choose component
import PMChoose from './compoments/PMChoose'; // Importing PM Choose component
import StockDashBoardPage from './pages/stock/StockDashBoard'; // Importing Stock Dashboard Page component
import PackageDashBoardPage from './pages/package/PackageDashBoardPage'; // Importing Package Dashboard Page component
import PaymentDashBoardPage from './pages/payment/PaymentDashBoardPage'; // Importing Payment Dashboard Page component
import EmployeeDashBoardPage from './pages/employee/EmployeeDashBoardPage'; // Importing Employee Dashboard Page component
import CustomerDashBoardPage from './pages/customer/CustomerDashBoardPage'; // Importing Customer Dashboard Page component
import MachineDashBoardPage from './pages/machine/MachineDashBoardPage'; // Importing Machine Dashboard Page component
import DeliveryDashBoardPage from './pages/delivery/DeliveryDashBoardPage'; // Importing Delivery Dashboard Page component
//order mee tika nm atha thiynna epa kanawa thowa
import Or_add from './compoments/Order/AddForm'; // Importing Order Add Form component
import Or_Confirm from './compoments/Order/Or_confirm'; // Importing Order Confirm component
import Or_track from './pages/order/OrderTracking';
import Or_update from './compoments/Order/Or_Updateform';
import OrderDashBoardPage from './pages/order/Or_Dashboard'; // Importing Order Dashboard Page component
import Cus_Order from './pages/order/Customer_orders.js';
import Find_order from './pages/order/FindOrder.js';


// Package Section Imports
import CreatePackage from './compoments/Package/CreatePackage'; // Import Create Package component
import PackageList from './compoments/Package/PackageList'; // Import Package List component
import ReportGen from './pages/package/ReportGen'; // Import Package Report Generation component

// Stock Section Imports

import StockAddForm from './pages/stock/AddItems';
import ContactSupplier from './pages/stock/contactSupplier'
import AssignItems from './pages/stock/pendingOrders';
import StockDetails from './pages/stock/stockDetails';
//payment section
import Handlepayment from './pages/payment/Handlepayment';
import Profile from './pages/payment/PMprofile';
import PaymentForm from './pages/payment/Addpaymentform';
import CusDashboard from './pages/payment/CusDashboard';
import SeePaymentnotification from './pages/payment/SeePaymentnotification';

//Order Section
import OrderTracking from './pages/order/OrderTracking'
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
//Employee Section
import EditEmployee from './compoments/Employee/EditEmployee';
import AddEmployee from './compoments/Employee/AddEmployee';
import EditAttendance from './compoments/Employee/EditAttendance';
import EmployeeProfile from './compoments/Employee/EmployeeDashBoardOne.js';

// Machine Section Imports
import MachineAdd from './compoments/Machine/machineadd';
import MachineManager from './compoments/Machine/MachineManager';
import UpdateMachine from './compoments/Machine/UpdateMachine';
import MachineStatus from './compoments/Machine/MachineStatus';
import AssignMachine from './compoments/Machine/AssignMachine';



function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* Define application routes */}
          <Route path="/" element={<Intro/>} /> {/* Home page */}
          <Route path="/*" element={<Outlet/>}/> {/* Outlet for nested routes */}
          <Route path="/CustomerLogin" element={<CustomerLogin/>}/> {/* Customer Login */}
          <Route path="/CustomerProfilePage" element={<CustomerProfilePage/>}/> {/* Customer Profile Page */}
          <Route path="/AdminLogin" element={<AdminLogin/>}/> {/* Admin Login */}
          <Route path="/EmpLogin" element={<EmpLogin/>}/> {/* Employee Login */}
          <Route path="/GMChoose" element={<GMChoose/>}/> {/* GM Choose */}
          <Route path="/DMChoose" element={<DMChoose/>}/> {/* DM Choose */}
          <Route path="/PMChoose" element={<PMChoose/>}/> {/* PM Choose */}
          <Route path="/CustomerDashBoardPage" element={<CustomerDashBoardPage/>}/> {/* Customer Dashboard */}
          <Route path="/StockDashBoardPage" element={<StockDashBoardPage/>}/> {/* Stock Dashboard */}
          <Route path="/MachineDashBoardPage" element={<MachineDashBoardPage />} /> {/* Machine Dashboard */}
          <Route path="/PackageDashBoardPage" element={<PackageDashBoardPage/>}/> {/* Package Dashboard */}
       
          <Route path="/Or_add" element={<Or_add/>}/>     {/*ee tika nm allanna epa kanawa thowa*/}
          <Route path="/Or_Add/order-details" element={<Or_Confirm/>}/> {/* Order Confirmation */}
          <Route path="/OrderDashBoardPage/updateOrder/:id" element={<Or_update/>}/>
          <Route path="/OrderDashBoardPage/orderTrack/:id" element={<Or_track />} />
          <Route path="/OrderDashBoardPage" element={<OrderDashBoardPage/>}/>
          <Route path="/OrderDashBoardPage/orderTracks/:id" element={<Cus_Order/>} /> 
          <Route path="/My/FindOrder" element={<Find_order/>} /> 

        {/* <Route path="/" element={<Intro/>} />
        <Route path="/*" element={<Outlet/>}/>
        <Route path="/CustomerLogin" element={<CustomerLogin/>}/> 
        <Route path="/CustomerProfilePage" element={<CustomerProfilePage/>}/>
        <Route path="/AdminLogin" element={<AdminLogin/>}/> 
        <Route path="/EmpLogin" element={<EmpLogin/>}/> 
        <Route path="/GMChoose" element={<GMChoose/>}/>
        <Route path="/DMChoose" element={<DMChoose/>}/>  
        <Route path="/PMChoose" element={<PMChoose/>}/>  
        <Route path="/PackageDashBoardPage" element={<PackageDashBoardPage/>}/>
        <Route path="/CustomerDashBoardPage" element={<CustomerDashBoardPage/>}/> 
        <Route path="/StockDashBoardPage" element={<StockDashBoardPage/>}/> */}


        
        <Route path="/StockAddForm" element={<StockAddForm/>}/> 
        <Route path="/ContactSupplier" element={<ContactSupplier/>}/>
        <Route path="/AssignItems" element={<AssignItems/>}/>
        <Route path="/StockDetails" element={<StockDetails/>}/>

        <Route path="/Or_add" element={<Or_add/>}/>
        <Route path="/OrderDashBoardPage/updateOrder/:id" element={<Or_update/>}/>
        <Route path="/OrderDashBoardPage/orderTrack/:id" element={<Or_track />} />
        <Route path="/Or_Add/order-details" element={<Or_Confirm/>}/>
        <Route path="/OrderDashBoardPage" element={<OrderDashBoardPage/>}/> 
        <Route path="/PaymentDashBoardPage" element={<PaymentDashBoardPage/>}/> 
        <Route path="/EmployeeDashBoardPage" element={<EmployeeDashBoardPage/>}/>   
        <Route path="/OrderTracking" element={<OrderTracking/>}/>  
        <Route path="/EmployeeDashBoardPage" element={<EmployeeDashBoardPage/>}/> 

          {/* Package Section Routes */}
          <Route path="/create" element={<CreatePackage />} /> {/* Create Package */}
          <Route path="/packages" element={<PackageList />} /> {/* Display All Packages */}
          <Route path="/package-dashboard" element={<PackageDashBoardPage />} />
          <Route path="/reportGen" element={<ReportGen/>} />


          {/* Stock Section Routes */}
          <Route path="/StockAddForm" element={<StockAddForm/>}/> 
          <Route path="/ContactSupplier" element={<ContactSupplier/>}/>
          <Route path="/AssignItems" element={<AssignItems/>}/>
          <Route path="/StockDetails" element={<StockDetails/>}/>
          
          

         {/* Machine Section Routes */}
         <Route path="/MachineDashBoardPage/add-machine" element={<MachineAdd />} />
          <Route path="/add-machine//MachineDashBoardPage" element={<MachineAdd />} />
          <Route path="/machine-manager" element={<MachineManager />} />
          <Route path="/update-machine/:id" element={<UpdateMachine />} />
          <Route path="/MachineDashBoardPage/UpdateMachine" element={<UpdateMachine />} />
          <Route path="/MachineDashBoardPage/Machine-Status" element={<MachineStatus />} />
          <Route path="/MachineStatus/Assign-machine" element={<AssignMachine />} />









        <Route path="/EmployeeProfile" element={<EmployeeProfile/>}/>   
        <Route path="/MachineDashBoardPage" element={<MachineDashBoardPage/>}/> 
        <Route path="/DeliveryDashBoardPage" element={<DeliveryDashBoardPage/>}/>  
        
        /*EmployeeSection*/
        <Route path="/EditEmployee/:empId" element={<EditEmployee />} />
        <Route path="AddEmployee" element={<AddEmployee />} />
        <Route path="/EditAttendance" element={<EditAttendance />} />

             {/* payment route section */}
             <Route path="/CusDashboard" element={<CusDashboard />} />
          <Route path="/Addpaymentform" element={<PaymentForm />} />
        <Route path="/PMprofile" element={<Profile />} />
        <Route path="/Handlepayment" element={<Handlepayment />} />
        <Route path="/SeePaymentnotification" element={<SeePaymentnotification />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
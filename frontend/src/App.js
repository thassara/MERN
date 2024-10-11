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
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"; // Importing React Router components

// Employee Section Imports
import EditEmployee from './compoments/Employee/EditEmployee'; // Importing Edit Employee component
import AddEmployee from './compoments/Employee/AddEmployee'; // Importing Add Employee component

// Package Section Imports
import CreatePackage from './compoments/Package/CreatePackage'; // Import Create Package component
import PackageList from './compoments/Package/PackageList'; // Import Package List component
import ReportGen from './pages/package/ReportGen'; // Import Package Report Generation component

// Stock Section Imports
import Header from './compoments/Header';
import Footer from './compoments/Footer';
import Intro from './compoments/Intro';
import CustomerLogin from './compoments/Login/CustomerLogin';
import CustomerProfilePage from './pages/customer/CustomerProfilePage';
import AdminLogin from './compoments/AdminLogin';
import EmpLogin from './compoments/EmpLogin';
import GMChoose from './compoments/GMChoose';
import DMChoose from './compoments/DMChoose';
import PMChoose from './compoments/PMChoose';
import StockDashBoardPage from './pages/stock/StockDashBoard';
import StockAddForm from './pages/stock/AddItems';
import ContactSupplier from './pages/stock/contactSupplier'
import AssignItems from './pages/stock/pendingOrders';
import StockDetails from './pages/stock/stockDetails';
import PackageDashBoardPage from './pages/package/PackageDashBoardPage';
import OrderDashBoardPage from './pages/order/Or_Dashboard';
import PaymentDashBoardPage from './pages/payment/PaymentDashBoardPage';
import EmployeeDashBoardPage from './pages/employee/EmployeeDashBoardPage';
import EmployeeProfile from './pages/employee/EmployeeProfile';
import CustomerDashBoardPage from './pages/customer/CustomerDashBoardPage';
import MachineDashBoardPage from './pages/machine/MachineDashBoardPage';
import DeliveryDashBoardPage from './pages/delivery/DeliveryDashBoardPage';
import VehicleManagement from './compoments/Delivery/VehicleManagement';
import VehicleAdd from './compoments/Delivery/VehicleAdd';
import VehicleStatus from './compoments/Delivery/VehicleStatus';
import UpdateVehicle from './compoments/Delivery/UpdateVehicle';
import IssueDeliveryForm from './compoments/Delivery/IssueDeliveryForm';
import ViewAllDeliveries from './compoments/Delivery/ViewAllDeliveries';
import EditOrder from './compoments/Delivery/EditOrder';
import EditDelivery from './compoments/Delivery/EditDelivery';

import Or_add from './compoments/Order/AddForm';
import Or_Confirm from './compoments/Order/Or_confirm';
import { BrowserRouter as Router, Route, Routes, Outlet} from "react-router-dom";
import Handlepayment from './pages/payment/Handlepayment';
import Profile from './pages/payment/PMprofile';
import PaymentForm from './pages/payment/Addpaymentform';
import CusDashboard from './pages/payment/CusDashboard';

import PaymentAdd from './pages/payment/Addpaymentform'
import OrderTracking from './pages/order/OrderTracking'
import Or_track from './pages/order/OrderTracking';
import Or_update from './compoments/Order/Or_Updateform';
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
//Employee Section
import EditEmployee from './compoments/Employee/EditEmployee';
import AddEmployee from './compoments/Employee/AddEmployee';
import EditAttendance from './compoments/Employee/EditAttendance';




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
          <Route path="/PackageDashBoardPage" element={<PackageDashBoardPage/>}/> {/* Package Dashboard */}
       
          <Route path="/Or_add" element={<Or_add/>}/>     {/*ee tika nm allanna epa kanawa thowa*/}
          <Route path="/Or_Add/order-details" element={<Or_Confirm/>}/> {/* Order Confirmation */}
          <Route path="/OrderDashBoardPage/updateOrder/:id" element={<Or_update/>}/>
          <Route path="/OrderDashBoardPage/orderTrack/:id" element={<Or_track />} />
          <Route path="/OrderDashBoardPage" element={<OrderDashBoardPage/>}/>
          <Route path="/OrderDashBoardPage/orderTracks/:id" element={<Cus_Order/>} /> 
          <Route path="/My/FindOrder" element={<Find_order/>} /> 

        <Route path="/CusDashboard" element={<CusDashboard />} />
          <Route path="/Addpaymentform" element={<PaymentForm />} />
        <Route path="/PMprofile" element={<Profile />} />
        <Route path="/Handlepayment" element={<Handlepayment />} />
        <Route path="/" element={<Intro/>} />
        <Route path="/*" element={<Outlet/>}/>
        <Route path="/CustomerLogin" element={<CustomerLogin/>}/> 
        <Route path="/CustomerProfilePage" element={<CustomerProfilePage/>}/>
        <Route path="/AdminLogin" element={<AdminLogin/>}/> 
        <Route path="/EmpLogin" element={<EmpLogin/>}/> 
        <Route path="/GMChoose" element={<GMChoose/>}/>
        <Route path="/DMChoose" element={<DMChoose/>}/>  
        <Route path="/PMChoose" element={<PMChoose/>}/> 
        <Route path="/CustomerDashBoardPage" element={<CustomerDashBoardPage/>}/> 
        <Route path="/StockDashBoardPage" element={<StockDashBoardPage/>}/> 
        <Route path="/StockAddForm" element={<StockAddForm/>}/> 
        <Route path="/ContactSupplier" element={<ContactSupplier/>}/>
        <Route path="/AssignItems" element={<AssignItems/>}/>
        <Route path="/StockDetails" element={<StockDetails/>}/>
        <Route path="/PackageDashBoardPage" element={<PackageDashBoardPage/>}/>
        <Route path="/Or_add" element={<Or_add/>}/>
        <Route path="/OrderDashBoardPage/updateOrder/:id" element={<Or_update/>}/>
        <Route path="/OrderDashBoardPage/orderTrack/:id" element={<Or_track />} />
        <Route path="/Or_Add/order-details" element={<Or_Confirm/>}/>
        <Route path="/OrderDashBoardPage" element={<OrderDashBoardPage/>}/> 
        <Route path="/PaymentDashBoardPage" element={<PaymentDashBoardPage/>}/> 
        <Route path="/EmployeeDashBoardPage" element={<EmployeeDashBoardPage/>}/>   
        <Route path="/OrderTracking" element={<OrderTracking/>}/>  
        <Route path="/EmployeeDashBoardPage" element={<EmployeeDashBoardPage/>}/> 

        <Route path="/EmployeeProfile" element={<EmployeeProfile/>}/>   
        <Route path="/MachineDashBoardPage" element={<MachineDashBoardPage/>}/> 
        <Route path="/DeliveryDashBoardPage" element={<DeliveryDashBoardPage/>}/>
        <Route path="/vehicle-management" element={<VehicleManagement />} />
        <Route path="/DeliveryDashBoardPage/add-vehicle" element={<VehicleAdd />} />
        <Route path="/DeliveryDashBoardPage/Vehicle-Status" element={<VehicleStatus />} />
        <Route path="/update-vehicle/:id" element={<UpdateVehicle />} />
        <Route path="/IssueDeliveryForm" element={<IssueDeliveryForm />} />
        <Route path="/ViewAllDeliveries" element={<ViewAllDeliveries />} />

        <Route path="/edit-order/:id" element={<EditOrder />} />
        <Route path="/edit-delivery/:id" element={<EditDelivery />} />
        
        /*EmployeeSection*/
        <Route path="/EditEmployee/:empId" element={<EditEmployee />} />
        <Route path="AddEmployee" element={<AddEmployee />} />
        <Route path="/EditAttendance" element={<EditAttendance />} />
   
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
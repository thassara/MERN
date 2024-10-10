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
import OrderDashBoardPage from './pages/order/Or_Dashboard'; // Importing Order Dashboard Page component
import PaymentDashBoardPage from './pages/payment/PaymentDashBoardPage'; // Importing Payment Dashboard Page component
import EmployeeDashBoardPage from './pages/employee/EmployeeDashBoardPage'; // Importing Employee Dashboard Page component
import CustomerDashBoardPage from './pages/customer/CustomerDashBoardPage'; // Importing Customer Dashboard Page component
import MachineDashBoardPage from './pages/machine/MachineDashBoardPage'; // Importing Machine Dashboard Page component
import DeliveryDashBoardPage from './pages/delivery/DeliveryDashBoardPage'; // Importing Delivery Dashboard Page component
import Or_add from './compoments/Order/AddForm'; // Importing Order Add Form component
import Or_Confirm from './compoments/Order/Or_confirm'; // Importing Order Confirm component
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"; // Importing React Router components

// Employee Section Imports
import EditEmployee from './compoments/Employee/EditEmployee'; // Importing Edit Employee component
import AddEmployee from './compoments/Employee/AddEmployee'; // Importing Add Employee component

// Package Section Imports
import CreatePackage from './compoments/Package/CreatePackage'; // Import Create Package component
import PackageList from './compoments/Package/PackageList'; // Import Package List component
import ReportGen from './pages/package/ReportGen'; // Import Package Report Generation component

// Stock Section Imports
import StockAddForm from './pages/stock/AddItems';
import ContactSupplier from './pages/stock/contactSupplier'
import AssignItems from './pages/stock/pendingOrders';
import StockDetails from './pages/stock/stockDetails';

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
        <Header /> {/* Render Header component */}
        
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
          <Route path="/Or_add" element={<Or_add/>}/> {/* Order Add Form */}
          <Route path="/Or_Add/order-details" element={<Or_Confirm/>}/> {/* Order Confirmation */}

          {/* Employee Section Routes */}
          <Route path="/EditEmployee/:empId" element={<EditEmployee />} /> {/* Edit Employee */}
          <Route path="/AddEmployee" element={<AddEmployee />} /> {/* Add Employee */}

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









        </Routes>

        <Footer /> {/* Render Footer component */}
      </div>
    </Router>
  );
}

export default App;


import React from 'react';
import './App.css';
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
import StockDashBoardPage from './pages/stock/StockDashBoardPage';
import PackageDashBoardPage from './pages/package/PackageDashBoardPage';
import OrderDashBoardPage from './pages/order/Or_Dashboard';
import PaymentDashBoardPage from './pages/payment/PaymentDashBoardPage';
import EmployeeDashBoardPage from './pages/employee/EmployeeDashBoardPage';
import CustomerDashBoardPage from './pages/customer/CustomerDashBoardPage';
import MachineDashBoardPage from './pages/machine/MachineDashBoardPage';
import DeliveryDashBoardPage from './pages/delivery/DeliveryDashBoardPage';
import Or_add from './compoments/Order/AddForm';
import Or_Confirm from './compoments/Order/Or_confirm';
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
//Employee Section
import EditEmployee from './compoments/Employee/EditEmployee';
import AddEmployee from './compoments/Employee/AddEmployee';
//package
import CreatePackage from './compoments/Package/CreatePackage';
import AllPackages from './compoments/Package/AllPackages';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      <div>
        <Header />
        
        <Routes>
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
        <Route path="/PackageDashBoardPage" element={<PackageDashBoardPage/>}/>
        <Route path="/Or_add" element={<Or_add/>}/>
        <Route path="/Or_Add/order-details" element={<Or_Confirm/>}/>
        <Route path="/OrderDashBoardPage" element={<OrderDashBoardPage/>}/> 
        <Route path="/PaymentDashBoardPage" element={<PaymentDashBoardPage/>}/> 
        <Route path="/EmployeeDashBoardPage" element={<EmployeeDashBoardPage/>}/>   
        <Route path="/MachineDashBoardPage" element={<MachineDashBoardPage/>}/> 
        <Route path="/DeliveryDashBoardPage" element={<DeliveryDashBoardPage/>}/>  
        
        /*EmployeeSection*/
        <Route path="/EditEmployee/:empId" element={<EditEmployee />} />
        <Route path="AddEmployee" element={<AddEmployee />} />

        /*Package*/
        <Route path="/create" exact Component={CreatePackage} />
        <Route path="/" exact Component={AllPackages} />
        

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
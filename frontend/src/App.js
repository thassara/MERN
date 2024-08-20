import React from 'react';
import './App.css';
import Header from './compoments/Header';
import Footer from './compoments/Footer';
import Intro from './compoments/Intro';
import CustomerLogin from './compoments/Login/CustomerLogin';
import CustomerProfile from './compoments/Customer/CustomerProfileOne';
import AdminChoose from './compoments/AdminChoose';
import GMLogin from './compoments/Login/GMLogin';
import DMLogin from './compoments/Login/DMLogin';
import PMLogin from './compoments/Login/PMLogin';
import SMLogin from './compoments/Login/SMLogin';
import GMChoose from './compoments/GMChoose';
import DMChoose from './compoments/DMChoose';
import PMChoose from './compoments/PMChoose';
import StockDashBoard from './compoments/Stock/StockDashBoardOne';
import PackageDashBoard from './compoments/Package/PackageDashBoardOne';
import OrderDashBoard from './compoments/Order/OrderDashBoardOne';
import PaymentDashBoard from './compoments/Payment/PaymentDashBoardOne';
import EmployeeDashBoard from './compoments/Employee/EmployeeDashBoardOne';
import CustomerDashBoard from './compoments/Customer/CustomerDashBoardOne';
import MachineDashBoard from './compoments/Machine/MachineDashBoardOne';
import DeliveryDashBoard from './compoments/Delivery/DeliveryDashBoardOne';
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/*" element={<Outlet />}/>
        <Route path="/CustomerLogin" element={<CustomerLogin/>}/> 
        <Route path="/CustomerProfile" element={<CustomerProfile/>}/>
        <Route path="/AdminChoose" element={<AdminChoose/>}/> 
        <Route path="/AdminChoose/GMLogin" element={<GMLogin/>}/> 
        <Route path="/AdminChoose/DMLogin" element={<DMLogin/>}/> 
        <Route path="/AdminChoose/PMLogin" element={<PMLogin/>}/> 
        <Route path="/AdminChoose/SMLogin" element={<SMLogin/>}/> 
        <Route path="/AdminChoose/GMChoose" element={<GMChoose/>}/>
        <Route path="/AdminChoose/DMChoose" element={<DMChoose/>}/>  
        <Route path="/AdminChoose/PMChoose" element={<PMChoose/>}/> 
        <Route path="/AdminChoose/StockDashBoard" element={<StockDashBoard/>}/> 
        <Route path="/AdminChoose/GMChoose/PackageDashBoard" element={<PackageDashBoard/>}/>
        <Route path="/AdminChoose/GMChoose/OrderDashBoard" element={<OrderDashBoard/>}/> 
        <Route path="/AdminChoose/GMChoose/PaymentDashBoard" element={<PaymentDashBoard/>}/> 
        <Route path="/AdminChoose/DMChoose/EmployeeDashBoard" element={<EmployeeDashBoard/>}/> 
        <Route path="/AdminChoose/DMChoose/CustomerDashBoard" element={<CustomerDashBoard/>}/>   
        <Route path="/AdminChoose/PMChoose/MachineDashBoard" element={<MachineDashBoard/>}/> 
        <Route path="/AdminChoose/PMChoose/DeliveryDashBoard" element={<DeliveryDashBoard/>}/>  
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
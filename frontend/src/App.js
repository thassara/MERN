import React from 'react';
import './App.css';
import Header from './compoments/Header';
import Footer from './compoments/Footer';
import Intro from './compoments/Intro';
import CustomerLogin from './compoments/Login/CustomerLogin';
import CustomerProfilePage from './pages/customer/CustomerProfilePage';
import AdminLogin from './compoments/AdminLogin';
import GMChoose from './compoments/GMChoose';
import DMChoose from './compoments/DMChoose';
import PMChoose from './compoments/PMChoose';
import StockDashBoard from './compoments/Stock/StockDashBoardOne';
import PackageDashBoard from './compoments/Package/PackageDashBoardOne';
import OrderDashBoard from './compoments/Order/OrderDashBoardOne';
import PaymentDashBoard from './pages/payment/PaymentDashBoardOne';
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
        <Route path="/" element={<Intro/>} />
        <Route path="/*" element={<Outlet/>}/>
        <Route path="/CustomerLogin" element={<CustomerLogin/>}/> 
        <Route path="/CustomerProfilePage" element={<CustomerProfilePage/>}/>
        <Route path="/AdminLogin" element={<AdminLogin/>}/> 
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
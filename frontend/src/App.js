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
<<<<<<< Updated upstream
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
=======
import StockDashBoard from './pages/stock/StockDashBoardOne';
import PackageDashBoard from './compoments/Package/PackageDashBoardOne';
import OrderDashBoard from './compoments/Order/OrderDashBoardOne';
import PaymentDashBoard from './compoments/Payment/PaymentDashBoardOne';
import EmployeeDashBoard from './compoments/Employee/EmployeeDashBoardOne';
import CustomerDashBoard from './compoments/Customer/CustomerDashBoardOne';
import MachineDashBoard from './compoments/Machine/MachineDashBoardOne';
import DeliveryDashBoard from './compoments/Delivery/DeliveryDashBoardOne';
import StockAddForm from './compoments/Stock/addItemsFormV1';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
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
        <Route path="/AdminChoose/StockAddForm" element={<StockAddForm/>}/> 
        <Route path="/AdminChoose/GMChoose/PackageDashBoard" element={<PackageDashBoard/>}/>
        <Route path="/AdminChoose/GMChoose/OrderDashBoard" element={<OrderDashBoard/>}/> 
        <Route path="/AdminChoose/GMChoose/PaymentDashBoard" element={<PaymentDashBoard/>}/> 
        <Route path="/AdminChoose/DMChoose/EmployeeDashBoard" element={<EmployeeDashBoard/>}/> 
        <Route path="/AdminChoose/DMChoose/CustomerDashBoard" element={<CustomerDashBoard/>}/>   
        <Route path="/AdminChoose/PMChoose/MachineDashBoard" element={<MachineDashBoard/>}/> 
        <Route path="/AdminChoose/PMChoose/DeliveryDashBoard" element={<DeliveryDashBoard/>}/>  
>>>>>>> Stashed changes
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
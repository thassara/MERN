import React from 'react';
import Header from '../../compoments/Header'; // Adjusted path for Header
import Footer from '../../compoments/Footer'; // Adjusted path for Footer
import Add from '../../compoments/Order/AddForm';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function Order(){

    return (
        <Router>
        <div>
           
        <Routes>
            <Route  path="/add" element={<Add/>}/>   
        </Routes>
        
        </div>
        </Router>
    )
}
export default Order;
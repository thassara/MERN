import React from 'react';
import Header from 'C:/Users/HP/Documents/GitHub/MERN/frontend/src/compoments/Header';
import Footer from 'C:/Users/HP/Documents/GitHub/MERN/frontend/src/compoments/Footer';
import Add from 'C:/Users/HP/Documents/GitHub/MERN/frontend/src/compoments/Order/AddForm'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function Order(){

    return (
        <Router>
        <div>
           
        <Routes>
            <Route path="/add" element={<Add/>}/>   
        </Routes>
        
        </div>
        </Router>
    )
}
export default Order;
import React from 'react';
import './App.css';
import Header from './compoments/Header';
import Footer from './compoments/Footer';
import Regi from './compoments/Regi';
import Update from './compoments/Update';
import Read from './compoments/Read';
import AdminChoose from './compoments/AdminChoose';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
        <Route path="/Regi" element={<Regi />} />
        <Route path="/update" element={<Update />} />
        <Route path="/read" element={<Read />} />
        <Route path="/AdminChoose" element={<AdminChoose/>}/> 
        </Routes>

        <h1>This is  App.js which is your home page</h1>


        <Footer />
      </div>
    </Router>
  );
}
// hello vhhh
export default App;
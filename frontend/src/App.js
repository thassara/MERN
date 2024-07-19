import React from 'react';
import './App.css';
import Header from './compoments/Header';
import Footer from './compoments/Footer';
import Regi from './compoments/Regi';
import Update from './compoments/Update';
import Read from './compoments/Read';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
        <Route path="/add" element={<Regi />} />
        <Route path="/update" element={<Update />} />
        <Route path="/read" element={<Read />} />
        </Routes>
       
        <Footer />
      </div>
    </Router>
  );
}
// hello 
export default App;
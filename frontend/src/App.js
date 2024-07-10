import React from 'react';
import './App.css';
import Header from './compoments/Header';
import Footer from './compoments/Footer';
import Regi from './compoments/Regi';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
        <Route path="/add" element={<Regi />} />
        </Routes>
       
        <Footer />
      </div>
    </Router>
  );
}

export default App;

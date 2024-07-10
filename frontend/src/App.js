import React from 'react';
import './App.css';
import Header from './compoments/Header';
import Footer from './compoments/Footer';
import Regi from './compoments/Regi';
import Read from './compoments/Read';
import Update from './compoments/Update';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/add" element={<Regi />} />s
          <Route path="/read" element={<Read />} />
          <Route path="/update" element={<Update />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

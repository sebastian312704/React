import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PurchaseRequirements from './components/PurchaseRequirements';
import TallerDeAutos from './components/TallerDeAutos';
import Carrito from './components/Carrito';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <Routes>
          <Route path="/" element={<PurchaseRequirements />} />
          <Route path="/taller" element={<TallerDeAutos />} />
          <Route path="/carrito" element={<Carrito />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;

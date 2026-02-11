import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Payment from './pages/Payment';
import Success from './pages/Success';
import Guidelines from './pages/Guidelines';
import RuleBook from './pages/RuleBook';
import SupportButton from './components/SupportButton';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <SupportButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Success />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/rulebook" element={<RuleBook />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

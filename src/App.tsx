import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import React from 'react';
import { Header } from './components/3-organisms/Header';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

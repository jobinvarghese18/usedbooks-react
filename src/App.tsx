import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import React from 'react';
import { Header } from './components/3-organisms/Header';
import SignUp from './pages/sign-up';

import './App.css';
import 'antd/dist/antd.min.css';
import SingInPage from './pages/sing-in';
import { AppValueProvider } from './context/appContext';
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppValueProvider>
        <Header />
        <Routes>
          <Route path="/" element={<SingInPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SingInPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AppValueProvider>
    </BrowserRouter>
  );
};

export default App;

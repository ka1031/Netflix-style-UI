import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './Navbar'
import Home from './Home'
import TitleCards from './TitleCards'
import Header from './header';
import Form from './form';
import Signup from './signup';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path='/signup' element={
          <div className='sign_up_page'>
            <Header />
            <Signup />
          </div>
        } />

        <Route path="/login" element={
          <div className='login_page'>
            <Header />
            <Form />
          </div>
        } />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <div className='home_page'>
                <Navbar />
                <Home />
                <TitleCards />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar'
import Home from './Home'
import TitleCards from './TitleCards'
import Header from './header';
import Form from './form';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<div className='login_page'>
          <Header></Header>
          <Form></Form>
        </div>} />
        <Route path="/Home" element={<div className='home_page'>
          <Navbar></Navbar>
          <Home></Home>
          <TitleCards></TitleCards>
        </div>} />

      </Routes>
    </BrowserRouter>
  );
}
export default App

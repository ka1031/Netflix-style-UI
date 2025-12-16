import React from 'react'
import netflixLogo from './assets/netflix_logo.svg';
import "./styles/header.css";

const Header = () => {
  return (
    <div>
      <div className='header'>
        <img src={netflixLogo} alt='logo' style={{ width: '200px', height: 'auto' }}></img>
      </div>
    </div>
  )
}

export default Header

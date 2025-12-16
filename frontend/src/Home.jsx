import React from 'react'

import banner from './assets/peaky_blinders.webp'
import banner_logo from './assets/banner_logo.jpeg'
import play from './assets/play-button-svgrepo-com.svg'
import './styles/Home.css'

const Home = () => {
  return (
    <div className='home'>
      <div className='banner'>
        <div><img src={banner} className='banner_img'></img></div>
        <div className='banner_logo'>
          <img src={banner_logo}></img>
          <div className='info'>A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.</div>
          <div className='play'>
            <button>
              <img src={play}></img>
              Play
              </button>
            <button className='more_btn'>More Info</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

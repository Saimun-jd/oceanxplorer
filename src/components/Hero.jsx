import React from 'react'
import HeroContent from './HeroContent'
import Navbar from './Navbar'

const Hero = () => {
  return (
    <div className='relative flex flex-col w-full min-h-screen'>
      <div 
        className='absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out' 
        id="hero-background"
      ></div>
      <Navbar />
      <HeroContent />
    </div>
  )
}

export default Hero;

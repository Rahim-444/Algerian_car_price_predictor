import React from 'react'
import Cards from './Utils/Cards.jsx'
import dots from '../assets/dots.svg'
const InfoSection = () => {
  return (
    <div className='Info-section relative'>
       <div className='bg-ternary blur-[300px] w-96 h-96 absolute right-0 top-48'></div>
        <img src={dots} className='absolute w-16 right-0 top-48'/>
        <Cards/>
    </div>
  )
}

export default InfoSection;
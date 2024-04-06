import React from 'react'
import Cards from './Utils/Cards.jsx'
import dots from '../assets/dots.svg'
import ThreedModel from './ThreedModel.jsx'
import Slider from './Utils/Slider.jsx'
const InfoSection = () => {

   const canvasRef = React.useRef(null);

  return (
    <div className='Info-section h-screen  relative '>
       <div className='bg-Purple blur-[110px] w-40 h-48 absolute left-40'></div>
       <div className='card-container '>
        <Slider />
       </div>
        {/* <ThreedModel canvasRef={canvasRef} /> */}
    </div>
  )
}

export default InfoSection;
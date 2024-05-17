import React from 'react'
import ThreedModel from "../Components/Utils/ThreedModel.jsx";
import { useRef } from 'react';
import SeeMagic from "./../assets/seemagic.svg";

const InfoSection2 = () => {
    const canvasRef = useRef(null);
  return (
    <div className=' flex justify-center items-center flex-col relative overflow-x-hidden'>
          <div className="bg-ternary blur-[200px] w-80 h-72 absolute top-96 right-[-10rem] z-1"></div>
          <div className="bg-Purple blur-[200px] w-80 h-72 absolute top-96 left-[-10rem] z-1"></div>

          <ThreedModel canvasRef={canvasRef} />

          <h1 className="text-white font-semibold text-4xl ">Predict everywhere</h1>
          <p className="text-gray-500 font-light text-center text-2xl mt-4">Our AI tools are available on all devices and platforms</p>
          <button className='flex items-center mt-4'>
            <img src={SeeMagic} alt="see magic" />
            <div className='font-semibold text-xl text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FC72FF] via-[#8F68FF]  via-[#487BFF] via-[#2CD9FF] to-[#2CFFCC]'>
              Click to see magic
            </div>
          
          </button>
    </div>
  )
}

export default InfoSection2
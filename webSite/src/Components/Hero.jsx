
 import React from 'react';
 import RightBackground from "../assets/rightImage.svg";
 import dots from '../assets/dots.svg'

    const Hero = () => {
        return (
            <div className="hero overflow-x-hidden relative">
                   <img src={dots} className='dots absolute top-14 left-7'/>

                <div className="hero-content w-screen h-screen  flex justify-between items-center">
                    <div className="left-side lg:ml-44  ">
                        <div className='text '>

                        <h1 className='font-black text-5xl text-white  '>start your<br/> <span className='text-[#6FB1FC]'>estimation</span><br/> journey using AI</h1>
                        <h2 className='text-2xl text-white mt-5'>click the button and get updated about the<br/>
                           market prices in seconds by using our AI model  </h2>
                        
                        </div>
                        <button className='font-bold text-xl px-12 py-5 mt-9 text-white rounded-2xl bg-gradient-to-r from-Purple to-Blue'>Get Started</button>
                    </div>
                    <div className='left-side '>
                      <img src={RightBackground} className='right-side absolute left-[500px]  top-0 h-[110%]'/>
                    </div>
                    
                </div>
            </div>
        );
    };

export default Hero
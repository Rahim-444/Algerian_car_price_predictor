
 import React from 'react';
 import RightBackground from "../assets/rightImage.svg";
 import dots from '../assets/dots.svg'
 import { gsap } from 'gsap';
 import { useEffect , useRef } from 'react';
 import Model from '../Components/ThreedModel.jsx'


    const Hero = () => {
        //         useEffect(() => {
//     let split = new SplitText(textRef.current, { type: 'chars' });
//     gsap.from(split.chars, { opacity: 0, x: -20, stagger: 0.1 });
//   }, []);

        const textRef  = useRef();
        const canvasRef = useRef(null);

        return (
            <div className="hero relative ">
                   <img src={dots} className='dots absolute top-14 left-7'/>

                <div className="hero-content w-screen h-screen  flex justify-center lg:justify-between  items-center">
                    <div className="left-side ml-7 lg:ml-44  ">
                        <div className='text '>

                        <h1 ref={textRef} className='font-black text-5xl text-white  '  >start your<br/> <span className='text-[#6FB1FC]'>estimation</span><br/> journey using AI</h1>
                        <h2 className=' text-xl md:text-2xl text-white mt-5'>click the button and get updated about the<br/>
                           market prices in seconds by using our AI model  </h2>
                        
                        </div>
                        <button className='font-bold text-xl px-12  py-4 md:py-5 mt-9 text-white rounded-2xl bg-gradient-to-r from-Purple to-Blue hover:shadow-custom-light'>Get Started</button>
                    </div>
                    <div className='right-side '>
                      <img src={RightBackground} className='absolute  left-[500px]  top-0 h-[110%]'/>
                      <Model canvasRef={canvasRef} />
                    </div>
                    
                </div>
            </div>
        );
    };

export default Hero
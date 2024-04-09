import React  , {useRef, useEffect} from 'react'
import botIcon from '../../assets/chat-bot.svg'
import '../../index.css';
import ThreedModel from '../ThreedModel';
import CrosedLines from "../../assets/ttten1.svg"

const Cards = () => {
     const canvasRef = React.useRef(null);
  return (
    <div className='flex justify-center items-center m-0'>
        <div  className='gradiantBackground w-2/3 h-96  p-1 bg-gradient-to-r from-Purple to-Blue rounded-3xl relative overflow-hidden'>
            <div className='innerBackground bg-background w-[100%] h-[100%] rounded-3xl flex justify-center items-center flex-col'>
                 <div className='content  '>
                         {/* <img src={botIcon} className='mb-12' /> */}
                         {/* <div className='leftSide'>
                         <ThreedModel canvasRef={canvasRef} /> */}
                         <div className='rightSide relative'>
                         <h2 className='text-center text-white font-bold text-xl md:text-4xl mb-9 md:mb-10 mt-4 md:mt-0'>Our use of AI </h2>
                         <h3 className='text-center text-white font-light text-sm md:text-xl  px-8'>Lorem ipsum dolor sit amet consectetur. Euismod eu phasellus viverra nec lectus nisl libero. nec lecnec lectus nec lectus nisl libero.nec lectus nisl libero.nec lectus nisl nec lectus nisl libero.tus nisl libero. nec lectus nisl libero.</h3>
                         </div>

                         <img src={CrosedLines} className='absolute bottom-0 top-0 right-0 '/>

                 </div> 
             
            </div>
        </div>

 
    
     


    </div>
  )
}

export default Cards;

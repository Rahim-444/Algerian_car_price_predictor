import React  , {useRef, useEffect} from 'react'
import botIcon from '../../assets/chat-bot.svg'
import '../../index.css';

const Cards = () => {

  


  return (
    <div className='flex justify-center items-center'>
  

     
         {/* <!-- middle card --> */}
        <div  className='gradiantBackground w-[50rem] h-96  max-h-96 p-[1px] bg-gradient-to-r from-Purple to-Blue rounded-3xl '>
            <div className='innerBackground bg-background w-[100%] h-[100%] rounded-3xl flex justify-center items-center'>
                 <div className='content flex justify-center items-center flex-col '>
                         {/* <img src={botIcon} className='mb-12' /> */}
                         <h2 className='text-center text-white font-bold text-5xl mb-14'>Our use of AI </h2>
                         <h3 className='text-center text-white font-light text-2xl  px-16 '>Lorem ipsum dolor sit amet consectetur. Euismod eu phasellus viverra nec lectus nisl libero. nec lecnec lectus nec lectus nisl libero.nec lectus nisl libero.nec lectus nisl nec lectus nisl libero.tus nisl libero. nec lectus nisl libero.</h3>
                 </div> 
            </div>
        </div>
 
    
     


    </div>
  )
}

export default Cards;

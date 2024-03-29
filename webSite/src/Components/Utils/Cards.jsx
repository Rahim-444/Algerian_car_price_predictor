import React  , {useRef, useEffect} from 'react'
import botIcon from '../../assets/chat-bot.svg'
import '../../index.css';

const Cards = () => {

  


  return (
    <div className='flex justify-center items-center h-screen w-screen'>


       
        

      
     <div className='cards flex flex-row'>

      {/* <!-- left card --> */}
         <div  className='gradiantBackground w-60 h-72 mt-5 p-1 bg-gradient-to-l from-Purple to-Blue rounded-md '>
            <div className='innerBackground bg-CardBlue w-[100%] h-[100%] rounded-md flex justify-center items-center'>
                 <div className='content flex justify-center items-center flex-col '>
                         <img src={botIcon} className='mb-12' />
                         <h2 className='text-center text-white font-bold text-lg'>Our use of AI </h2>
                         <h3 className='text-center text-white font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis est</h3>
                 </div>
            </div>
        </div>
         {/* <!-- middle card --> */}
        <div  className='gradiantBackground w-64 h-80 max-w-72 max-h-96 p-1 bg-gradient-to-r from-Purple to-Blue rounded-md '>
            <div className='innerBackground bg-CardBlue w-[100%] h-[100%] rounded-md flex justify-center items-center'>
                 <div className='content flex justify-center items-center flex-col '>
                         <img src={botIcon} className='mb-12' />
                         <h2 className='text-center text-white font-bold text-lg'>Our use of AI </h2>
                         <h3 className='text-center text-white font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis est</h3>
                 </div>
            </div>
        </div>

           {/* <!-- right card --> */}
        
        <div  className='gradiantBackground w-60 h-72 mt-5  p-1 bg-gradient-to-l from-Purple to-Blue rounded-md '>
            <div className='innerBackground bg-CardBlue w-[100%] h-[100%] rounded-md flex justify-center items-center'>
                 <div className='content flex justify-center items-center flex-col '>
                         <img src={botIcon} className='mb-12' />
                         <h2 className='text-center text-white font-bold text-lg'>Our use of AI </h2>
                         <h3 className='text-center text-white font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis est</h3>
                 </div>
            </div>
        </div>

     </div>


    </div>
  )
}

export default Cards;

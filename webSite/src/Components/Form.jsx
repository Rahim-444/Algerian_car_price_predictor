import Button from "../Components/Utils/Button.jsx";
import React , {useEffect, useState} from "react";
import axios from 'axios';
import Progress from "./Utils/progress.jsx";
// hna we export the object from chatData file
//we map over the object and return a div with the text and the type of the message , and render with the condition (ternary operators)

const Form = () => {

 

   //const [currentStep , setCurrentStep] = useState(1);
   const [step, setStep] = useState(0);
   const [submited, setSubmited] = useState(false);
   
   const [Data , setData ] = useState([
  
  { 
    id: 0,
    type: 'choice',
     title:"pices",
    question: 'type de pieces?', 
    options: ['amortiseur ', 'pneaus ', 'rotroviseur'],
    answer: ""
   
  },
  { 
    id: 1,
    type: 'text',
    title:"model",
    question: 'What is your favorite model (text)?', 
    answer: ""
    
  },
   { 
    id: 2,
    type: 'choice',
    title:"name",
    question: 'what is the name of the car?', 
    options: ['clio3', 'porshe', 'tiguan'],
    answer: ""
   
  },
   { 
    id: 3,
    type: 'choice',
    title:"color",
    question: 'What is your favorite color?', 
    options: ['Red', 'Blue', 'Green'],
    answer: ""
   
  },
   { 
    id: 4,
    type: 'choice',
    title:"color2",
    question: 'What is your favorite color?', 
    options: ['Red', 'Blue', 'Green'],
    answer: ""
   
  },
    { 
    id: 5,
    type: 'choice',
    title:"color3",
    question: 'What is your favorite color?', 
    options: ['Red', 'Blue', 'Green'],
    answer: ""
   
  },  { 
    id: 6,
    type: 'choice',
    title:"color4",
    question: 'What is your favorite color?', 
    options: ['Red', 'Blue', 'Green'],
    answer: ""
   
  },
  { 
    id: 7,
    type: 'text',
    text: 'thanks for participating!',
   
  },
  ]);




  

//   const handleAnswerChange = (answer) => {
//   setData(prevData => prevData.map((item, index) => {
    
//     if (index   === step) {
//       return { ...item, answer: answer };
//     } else {
//       return item;
//     }
//   }));
//  } 

const handleAnswerChange = (value, stepIndex , event) => {
  

  const newData = Data.map((item) => {
    if (item.id === stepIndex) {
      return { ...item, answer: value };
    } else {
     
      return item;
    }
  });
  
  
  setData(newData);
  
 
};


const handleOptionClick = (option , e) => {
 
  const newData = Data.map((item) => {
    if (item.id === step) {
      return { ...item, answer: option };
    } else {
      return item;
    }
  });

  setData(newData);
  
}

  const  handleSubmit = (e) => {
   e.preventDefault();
    if (Data[step].answer != null && Data[step].answer != "") {
      setStep(prevStep => prevStep + 1);
    }
   
  }

  const handleNext = (e) => {
    e.preventDefault();
    if (step != Data.length-1 && Data[step].answer != null && Data[step].answer != "") {
     setStep(prevStep => prevStep + 1);
    }
  }
  const handleDecrement = (e) =>{
    e.preventDefault();
    if (step != 0) {
      setStep(prevStep => prevStep - 1);
    }
  }
  


  const handlePredict = (e) => {
    try {
     
         const result = Data.reduce((acc, item , index) => {
          
            
           item.title &&(acc[item.title] = item.answer);
            return acc;
          
        }, {});
        console.log(result);
         
         const response = axios.post('http://localhost:5000/predict', result);

    } catch (error) {
      console.error(error);
    }

  }

 

  return (
  
    <>
    <div>    
      <div className="chat flex justify-center items-center h-screen w-screen flex-col  ">
       <div className="answer-question ">
         {Data.slice(0, step+1).map((step, index) => (
       <div key={index}>
         <div>{step.question ? step.question : step.text }</div>
          <div>{step.answer}</div>  
       </div>
       ))}
       {console.log(step)}
       {/* //panel ogin and register , guesst */}
        </div>
      
      <div className="input stroke-fuchsia-500 ">
       
        <form onSubmit={handleSubmit}>
          {
            Data[step] && Data[step].type === "choice" ? (
              Data[step].options.map((option, index) => (
                
                <Button
                  key={index}
                  text={option}
                  onClick={(event) => {
                    handleOptionClick(option);
                  }}
                />
              ))
            ) : Data.length-1 === step ? (
              // Render PREDICT  button
              <Button text={"Predict"} onClick={handlePredict} />
            ) : Data[step].type === "text" ? (
              //option case
              <div>
                <input
                  type="text"
                  value={Data[step].answer || ""}
                  onChange={(e) => handleAnswerChange(e.target.value , step)}
                />
                <Button text={"Submit"} onClick={handleSubmit} />
              </div>
          ) : (
            <>returned null lol </>
          ) }
          
      </form>

          <div className="navigation-bar">
          <Button text={"+"} onClick={handleNext}  /> 
          <Button text={"-"} onClick={handleDecrement} /> 
          <Progress  step={step} dataLength={Data.length}/> 
          </div>
          
      </div>

     
     
      </div>
      
      
    </div>
    
    </>
  );
};

export default Form;

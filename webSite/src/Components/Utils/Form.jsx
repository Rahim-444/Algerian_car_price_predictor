import Button from "./Button.jsx";
import React , {useEffect, useState} from "react";
import axios from 'axios';
import Progress from "./progress.jsx";

// hna we export the object from chatData file
//we map over the object and return a div with the text and the type of the message , and render with the condition (ternary operators)

const Form = ({formId ,form , setForms , step}) => {


   //const [currentStep , setCurrentStep] = useState(1);
  //  const [step, setStep] = useState(0);
  //  const [submited, setSubmited] = useState(false);
    console.log(step);
  //  const [form, setFormData] = useState(form);  
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
  const newData = form.map((item) => {
    if (item.id === stepIndex) {
      return { ...item, answer: value };
    } else {
     
      return item;
    }
  });
  
  setForms(prevForms => prevForms.map(form => form.id === formId ? { ...form, data: newData } : form));
  
};

const handleOptionClick = (option , e) => {
 //handle the choice and the multi choice questions
  const newData = form.map((item) => {
    if (item.id === step) {
      if (item.type === "choice") {
        return { ...item, answer: option };
      } else if (item.type === "multi") {
        if (item.answer.includes(option)) {
          return {
            ...item,
            answer: item.answer.filter((ans) => ans !== option),
          };
        } else {
          return { ...item, answer: [...item.answer, option] };
        }
      }
    } else {
      return item;
    }
  });
    
    setForms(prevForms => prevForms.map(form => form.id === formId ? { ...form, data: newData } : form));

}
/*remove it if it exists and add it to the array if not  */



  const  handleSubmit = (e) => {
    const newStep = step + 1;
   e.preventDefault();
    if (form[step].answer != null && form[step].answer != "") {
        setForms(prevForms => prevForms.map(form => form.id === formId ? { ...form, step: newStep } : form));
    }
   
  }

  const handleNext = (e) => {
    const newStep = step + 1;
    e.preventDefault();
    if (step != form.length-1 && form[step].answer != null && form[step].answer != "") {
      setForms(prevForms => prevForms.map(form => form.id === formId ? { ...form, step: newStep } : form));
  }
}
  const handleDecrement = (e) =>{
    const newStep = step - 1;
    e.preventDefault();
    if (step != 0) {
            setForms(prevForms => prevForms.map(form => form.id === formId ? { ...form, step: newStep } : form));

    }
  }
  console.log(form);

  const handlePredict = (e) => {
    try {
     
         const result = form.reduce((acc, item , index) => {
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
    <div className=" w-[25%] ">  
        <h1 className="text-white py-3 px-7 mt-1 bg-primary rounded-tl-full rounded-br-full rounded-tr-full justify-self-start">hiiii</h1>
      <div className="chat flex flex-col ">
       <div className="answer-question ">

         {form.slice(0, step+1).map((step, index) => (
       <div key={index} className="">
        {/* //question */}
         <div className="text-white py-3 px-10 mt-1 bg-primary rounded-tl-full rounded-br-full rounded-tr-full ">{step.question ? step.question : step.text }</div>
          {/* //answer */}
        {step.answer != "" && <div className="max-w-xs text-white mt-1 rounded-bl-full rounded-tl-full rounded-tr-full  break-words border-1  px-7 ">{step.answer}</div>  }
       </div>
       ))}
        </div>
      
      <div className="input stroke-fuchsia-500 ">
       
       <form onSubmit={handleSubmit}>
  {form[step] && form[step].type === "choice" ? (
    form[step].options.map((option, index) => (
      <Button
        key={index}
        text={option}
        onClick={() => handleOptionClick(option)}
      />
    ))
  ) : form[step] && form[step].type === "multi" ? (
    form[step].options.map((option, index) => (
      <div key={index}>
        <input
          type="checkbox"
          checked={form[step].answer.includes(option)}
          onChange={() => handleOptionClick(option)}
          className="appearance-none bg-white border border-gray-300 checked:bg-blue-600 checked:border-transparent focus:outline-none h-6 w-6 rounded"
        />
        <label className="text-white ml-4">{option}</label>
      </div>
    ))
  ) : form.length - 1 === step ? (
    <Button text={"Predict"} onClick={handlePredict} />
  ) : form[step].type === "text" ? (
    <div>
      <input
        type="text"
        value={form[step].answer || ""}
        onChange={(e) => handleAnswerChange(e.target.value, step)}
      />
      <Button text={"Submit"} onClick={handleSubmit} />
    </div>
  ) : (
    <>returned null lol </>
  )}
</form>
          </div>
     
      </div>
      <div className="navigation-bar flex gap-5 ">
          <Progress  step={step} dataLength={form.length} className  /> 
          <button onClick={handleNext} className="px-5 py-3 rounded-lg bg-gradient-to-r from-Purple to-Blue text-white"> + </button> 
          <button  onClick={handleDecrement} className="px-5 py-3 rounded-lg bg-gradient-to-r from-Purple to-Blue text-white" > -  </button>
      </div>
      
      
    </div>
    
    </>
  );
};

export default Form;

import Button from "./Button.jsx";
import React , {useEffect, useState , useRef} from "react";
import axios from 'axios';
import Progress from "./progress.jsx";

// hna we export the object from chatData file
//we map over the object and return a div with the text and the type of the message , and render with the condition (ternary operators)

const Form = ({formId ,form , setForms , step}) => {

    const lastMessageRef = useRef(null);


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



  const handleSubmit = (e) => {
    e.preventDefault();
   
      const newStep = step + 1;
      if (form[step].answer != null && form[step].answer != "") {
        setForms((prevForms) =>
          prevForms.map((form) =>
            form.id === formId ? { ...form, step: newStep } : form
          )
        );
      }
   
  };


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
  //this on is for the last message to scroll to it
  useEffect(() => {
  if (lastMessageRef.current) {
    lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  }, [form]);
// assign in to th last message and it will scroll to it 
  

  return (
  
    <>
    <div className="">  
        {/* <h1 className="text-white py-3 px-7 mt-1 bg-primary rounded-tl-full rounded-br-full rounded-tr-full justify-self-start">hiiii</h1> */}
      <div className="chat flex flex-col h-[36rem] flex-grow-0 overflow-y-auto scrollbar-hide p-14">

        <div className="answer-question  ">
         {form.slice(0, step+1).map((step, index) => (
       <div key={index} className=" w-full">
        {/* //question */}
         <div className="min-w-[20%] max-w-[60%] w-fit text-white py-3 px-5 mt-6 ml-2 bg-primary rounded-br-3xl rounded-tl-3xl rounded-tr-3xl  break-words ">{step.question ? step.question : step.text }</div>
          {/* //answer */}
        {step.answer != "" && <div className=" min-w-[20%] max-w-[60%] text-white w-fit py-3 px-5 mt-2 ml-2 rounded-br-3xl rounded-tl-3xl rounded-tr-3xl  break-words border-1 ">{step.answer}</div>  }
       </div>
       ))}
        </div>
      
      <div className="input stroke-fuchsia-500 ">
       
       <form onSubmit={handleSubmit}>
   {form[step] && form[step].type === "choice" ? (
     form[step].options.map((option, index) => (
      <button ref={lastMessageRef}  key={index} onClick={() => handleOptionClick(option)} type="submit" className="bg-Purple text-white py-3 px-6  rounded-lg m-2" >
        {option}
      </button>
    ))
  ) : form[step] && form[step].type === "multi" ? (
    form[step].options.map((option, index) => (
      <div key={index}>
        <input
          ref={lastMessageRef}
          type="checkbox"
          checked={form[step].answer.includes(option)}
          onChange={() => handleOptionClick(option)}
          className="appearance-none bg-white border border-gray-300 checked:bg-blue-600 checked:border-transparent focus:outline-none h-6 w-6 rounded ml-4 mt-3"
        />
        <label className="text-white ml-4">{option}</label>
      </div>
    ))
    
  ) : form.length - 1 === step ? (
    <Button text={"Predict"} onClick={handlePredict} ref={lastMessageRef} />
  ) : form[step].type === "text" ? (
    <div>
      <input
      className="bg-white border-2 border-Blue rounded-full px-5 py-4 mt-2 w-[34rem]"
      placeholder="enter your answer here"
        type="text"
        value={form[step].answer || ""}
        onChange={(e) => handleAnswerChange(e.target.value, step)}
      />
      <br/>
      <Button text={"Submit"} onClick={handleSubmit} ref={lastMessageRef} />
    </div>
  ) : (
    <>returned null lol </>
  )}
 </form>
          </div>
     
      </div>

      <div className="navigation-bar flex gap-5 border-t border-white p-2 ">
          <div className="flex justify-center items-center w-full">
          <Progress  step={step} dataLength={form.length}  /> 
          </div>
          <button onClick={handleNext} className="px-5 py-3 rounded-lg bg-gradient-to-tr from-Purple to-Blue text-white"> + </button> 
          <button  onClick={handleDecrement} className="px-5 py-3 rounded-lg bg-gradient-to-tr from-Purple to-Blue text-white" > -  </button>
      </div>
      
      
    </div>
    
    </>
  );
};

export default Form;

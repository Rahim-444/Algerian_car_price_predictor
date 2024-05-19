import Button from "./Button.jsx";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Progress from "./progress.jsx";
import ProtoTypes from "prop-types";

// hna we export the object from chatData file
//we map over the object and return a div with the text and the type of the message , and render with the condition (ternary operators)

const Form = ({ formId, form, setForms, step }) => {
  const lastMessageRef = useRef(null);
  const [value, setValue] = useState("");
  const focusRef = useRef(null);

  const handleAnswerChange = (value) => {
    setValue(value);
  };

  const textAreaHanler = (stepIndex) => {
    const newData = form.map((item) => {
      if (item.id === stepIndex) {
        return { ...item, answer: value };
      } else {
        return item;
      }
    });

    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId ? { ...form, data: newData } : form,
      ),
    );
    handleSubmit();
    handleSubmit();
  };

  const handleOptionClick = (option) => {
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

    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId ? { ...form, data: newData } : form,
      ),
    );
  };

  const handleSubmit = (e) => {
    e && e.type === "submit" ? e.preventDefault() : null;
    const newStep = step + 1;
    if (form[step].answer != null && form[step].answer != "") {
      setForms((prevForms) =>
        prevForms.map((form) =>
          form.id === formId ? { ...form, step: newStep } : form,
        ),
      );
    }
  };

  const handleNext = () => {
    const newStep = step + 1;
    if (
      step != form.length - 1 &&
      form[step].answer != null &&
      form[step].answer != ""
    ) {
      setForms((prevForms) =>
        prevForms.map((form) =>
          form.id === formId ? { ...form, step: newStep } : form,
        ),
      );
    }
  };
  const handleDecrement = (e) => {
    const newStep = step - 1;
    e.preventDefault();
    if (step != 0) {
      setForms((prevForms) =>
        prevForms.map((form) =>
          form.id === formId ? { ...form, step: newStep } : form,
        ),
      );
    }
  };

  const handlePredict = () => {
    try {
      const result = form.reduce((acc, item) => {
        item.title && (acc[item.title] = item.answer);
        return acc;
      }, {});
      console.log(result);

      const response = axios.post("http://localhost:5000/predict", result);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (lastMessageRef.current)
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "nearest",
      });
    //FIX: this might break the whole thing so if something goes wrong check
    //this or remove it all together
    if (form.type === "text") {
      focusRef.current.focus();
      console.log("hello");
    } else if (form.type === "multi") {
      lastMessageRef.current.focus();
    }
  }, [form]);

  return (
    <>
      <div className="">
        <div
          className="chat flex flex-col h-[36rem] flex-grow-0
          overflow-y-auto scrollbar-hide p-14"
        >
          <div className="answer-question ">
            {form.slice(0, step + 1).map((step, index) => (
              <div key={index} className=" w-full">
                {/* //question */}
                <div
                  className="min-w-[20%] max-w-[60%] w-fit text-white py-3
                  animate-appearance-in px-5 mt-6 ml-2 bg-primary font-semibold rounded-br-3xl
                  rounded-tl-3xl rounded-tr-3xl  break-words "
                >
                  {step.question ? step.question : step.text}
                </div>
                {/* //answer */}
                {step.answer != "" && (
                  <div
                    className=" min-w-[20%] animateChat max-w-[60%] text-white w-fit py-3 
                    px-5 mt-2 ml-2 rounded-br-3xl rounded-tr-3xl rounded-bl-3xl 
                    animate-appearance-in break-words border-1 "
                  >
                    {step.type === "multi" ? step.answer + " " : step.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="input stroke-fuchsia-500">
            <form onSubmit={handleSubmit}>
              {form[step] && form[step].type === "choice" ? (
                form[step].options.map((option, index) => (
                  <button
                    ref={lastMessageRef}
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    type="submit"
                    className=" font-medium text-white py-3 px-6  rounded-lg m-2 mb-28 bg-[#902BAD] "
                  // style={
                  //   index % 2 === 0
                  //     ? { borderColor: "#902BAD" }
                  //     : { borderColor: "#fff" }
                  // }
                  >
                    {option}
                  </button>
                ))
              ) : form[step] && form[step].type === "multi" ? (
                form[step].options.map((option, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center text-center mt-2"
                    >
                      <input
                        ref={lastMessageRef}
                        type="checkbox"
                        checked={form[step].answer.includes(option)}
                        //NOTE: i have the do the checked thingy because
                        //tailwind doesn't load classes until you call them
                        //for some reason
                        className={`appearance-none bg-white border border-gray-300  checked:border-transparent
                            focus:outline-none h-6 w-6 rounded ml-4`}
                        onChange={() => handleOptionClick(option)}
                        style={{
                          backgroundColor: form[step].answer.includes(option)
                            ? index % 2 === 0
                              ? "#902BAD"
                              : "#3F78E1"
                            : "#fff",
                          marginBottom:
                            index === form[step].options.length ? "7rem" : "",
                        }}
                        onKeyDown={(e) => {
                          if (
                            e.key === "Enter" &&
                            form[step].answer != null &&
                            form[step].answer != ""
                          ) {
                            handleSubmit(e);
                          }
                        }}
                      />
                      <label className="text-white ml-4 h-full font-medium">
                        {option}
                      </label>
                    </div>
                  );
                })
              ) : form.length - 1 === step ? (
                <button
                  onClick={handlePredict}
                  ref={lastMessageRef}
                  className="shine w-44 py-3 px-6 mt-4 ml-3 rounded-lg bg-gradient-to-r
                      from-[#902BAD] to-[#3F78E1] text-white font-semibold"
                >
                  Predict
                </button>
              ) : form[step].type === "text" ? (
                <div className="animate-appearance-in mb-28">
                  <input
                    className="bg-white border-3 border-Blue rounded-full px-5 py-2 mt-2 w-[25rem] "
                    placeholder="enter your answer here"
                    type="text"
                    value={value || ""}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    ref={focusRef}
                  />
                  <br />
                  <Button
                    text={"Submit"}
                    onClick={() => textAreaHanler(step)}
                  />
                </div>
              ) : (
                <>returned null lol </>
              )}
            </form>
          </div>
        </div>

        <div className="navigation-bar flex gap-5 border-t border-white p-2 ">
          <div className="flex justify-center items-center w-full">
            <Progress step={step} dataLength={form.length} />
          </div>
          <button
            onClick={handleNext}
            className="px-7 py-3 rounded-lg bg-gradient-to-tr from-Purple to-Blue text-white font-medium text-[1rem]"
          >
            next
          </button>
          <button
            onClick={handleDecrement}
            className="px-7 py-3 rounded-lg bg-gradient-to-tr from-Purple to-Blue text-white font-medium text-[1rem]"
          >
            back
          </button>
        </div>
      </div>
    </>
  );
};

Form.propTypes = {
  formId: ProtoTypes.number,
  form: ProtoTypes.array,
  setForms: ProtoTypes.func,
  step: ProtoTypes.number,
};

export default Form;

import { useState } from "react";
import Form from "./Utils/Form.jsx";
import { inputs } from "../Components/Utils/ChatData.js";
import { FaTrash } from "react-icons/fa";

const FormSection = () => {
  const [forms, setForms] = useState([
    { id: Date.now(), step: 0, data: inputs },
  ]);

  const [activeFormId, setActiveFormId] = useState(null);

  const addForm = () => {
    const newFormId = Date.now();
    setForms([...forms, { id: newFormId, step: 0, data: inputs }]);
    setActiveFormId(newFormId);
  };

  const deleteForm = (id) => {
    setForms(forms.filter((form) => form.id !== id));
    if (activeFormId === id) {
      setActiveFormId(null);
    }
  };

  return (
    //FIX: remove the margin bottom after making the fotter
    <div className="forms-buttons flex flex-wrap md:flex-nowrap mb-10">
      {/* sidebar */}
      <div className="sideBar flex  flex-rows md:flex-col h-20 md:h-[40rem] w-full md:w-80 items-center overflow-y-auto scrollbar-hide md:scrollbar md:scrollbar-thumb-purple-700 scrollbar-track-gray-200 mt-9 ">
        <button
          className="text-white px-6 py-4 md:px-24 md:py-4 flex-shrink-0 rounded-lg border-none  mb-3  bg-gradient-to-r from-Purple to-Blue  hover:border-none"
          onClick={addForm}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 46 50"
            fill="none"
          >
            <path
              d="M20.1762 41.6667C20.1762 42.4955 20.4737 43.2903 21.0033 43.8764C21.5328 44.4624 22.2511 44.7917 23 44.7917C23.7489 44.7917 24.4672 44.4624 24.9967 43.8764C25.5263 43.2903 25.8238 42.4955 25.8238 41.6667V28.125H38.0602C38.8092 28.125 39.5274 27.7958 40.057 27.2097C40.5865 26.6237 40.884 25.8288 40.884 25C40.884 24.1712 40.5865 23.3764 40.057 22.7903C39.5274 22.2042 38.8092 21.875 38.0602 21.875H25.8238V8.33334C25.8238 7.50454 25.5263 6.70969 24.9967 6.12363C24.4672 5.53758 23.7489 5.20834 23 5.20834C22.2511 5.20834 21.5328 5.53758 21.0033 6.12363C20.4737 6.70969 20.1762 7.50454 20.1762 8.33334V21.875H7.93976C7.19084 21.875 6.4726 22.2042 5.94304 22.7903C5.41347 23.3764 5.11597 24.1712 5.11597 25C5.11597 25.8288 5.41347 26.6237 5.94304 27.2097C6.4726 27.7958 7.19084 28.125 7.93976 28.125H20.1762V41.6667Z"
              fill="white"
            />
          </svg>
        </button>

        <div className="separation-line h-[2px] w-48 bg-white"></div>
        {forms.map((form) => (
          <div key={form.id}>
            {form.id === activeFormId ? (
              <div
                key={form.id}
                onClick={() => setActiveFormId(form.id)}
                className="flex cursor-pointer  justify-between items-center px-10 py-2 mt-3 bg-CardBlue focus:bg-Purple rounded-lg"
              >
                <div className="text-white text-center">Form</div>
                <button
                  onClick={() => deleteForm(form.id)}
                  className="flex cursor-pointer  py-3 px-3 ml-14 mr-0 hover:bg-Purple rounded-lg trash"
                >
                  <FaTrash className="" />
                </button>
              </div>
            ) : (
              <div
                key={form.id}
                onClick={() => setActiveFormId(form.id)}
                className="flex justify-between cursor-pointer shine items-center px-10 py-2 mt-3 focus:bg-Purple rounded-lg"
              >
                <div className="text-white text-center">Form</div>
                {/* delete button */}
                <button
                  onClick={() => deleteForm(form.id)}
                  className="flex py-3 px-3 ml-14 mr-0 hover:bg-Purple rounded-lg trash"
                >
                  <FaTrash className="" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="Forms  w-screen h-[40rem]  border-white  border-2 rounded-lg mt-9 mr-5">
        {forms.map((form) => (
          <div key={form.id} className=" ">
            {activeFormId === form.id && (
              <Form
                formId={form.id}
                form={form.data}
                setForms={setForms}
                step={form.step}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormSection;

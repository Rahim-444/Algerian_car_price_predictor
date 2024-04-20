import React, { useState } from 'react';
import Form from './Utils/Form.jsx';
import { inputs } from "../Components/Utils/ChatData.js";

const FormSection= () => {

  const [forms, setForms] = useState([]);

  const [activeFormId, setActiveFormId] = useState(null);

  const addForm = () => {
    const newFormId = Date.now();
    setForms([...forms, { id: newFormId,step : 0 , data: inputs }]);
    setActiveFormId(newFormId);
  };
  console.log(forms);

  const deleteForm = (id) => {
    setForms(forms.filter(form => form.id !== id));
    if (activeFormId === id) {
      setActiveFormId(null);
    }
  };

  return (
    <div>
      <button className='text-white' onClick={addForm}>Add Form</button>
      <div className="forms">
        {forms.map(form => (
          <div key={form.id}>
           
            <button className='bg-white' onClick={() => setActiveFormId(form.id)}> Form {form.id}</button>
            <button className='bg-white' onClick={() => deleteForm(form.id)}>Delete Form</button>
          
          </div>
        ))}
        {forms.map(form => (
          <div key={form.id}>
           

                      
            {activeFormId === form.id && <Form  formId={form.id} form={form.data} setForms={setForms} step={form.step } />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormSection;
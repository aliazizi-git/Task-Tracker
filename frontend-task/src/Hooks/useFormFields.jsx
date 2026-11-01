import { useDebugValue, useState } from "react";

const useFormFields = (initialState = {}) => {
  const [fields, setFields] = useState(initialState);
  const handleChange = (e) => {
    if (e.target.type === "number") {
      setFields({ ...fields, [e.target.name]: e.target.value });
    } else if (e.target.type === "select") {
      setFields({ ...fields, [e.target.name]: e.target.value });
    } else if (e.target.type === "checkbox") {
      setFields({ ...fields, [e.target.name]: e.target.checked });
    } else {
      setFields({ ...fields, [e.target.name]: e.target.value });
    }
  };
  useDebugValue("Hook for handle Input value");
  return [fields, handleChange, setFields];
};
export default useFormFields;

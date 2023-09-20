import { useState } from "react";
const useCustomForm = ({ initialValues, onSubmit }) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  // const [onSubmitting, setOnSubmitting] = useState(false);
  // const [onBlur, setOnBlur] = useState(false);
  // const formRendered = useRef(true);
  // useEffect(() => {
  //   if (formRendered.current) {
  //     setValues(initialValues);
  //     setErrors({});
  //     setTouched({});
  //     setOnSubmitting(false);
  //     setOnBlur(false);
  //   }
  //   formRendered.current = false;
  // }, [initialValues]);
  const handleDateChange = (event, name) => {
    if (event._isValid) {
      setValues({ ...values, [name]: event });
    } else if (!event) {
      setValues({ ...values, [name]: null });
    } else {
      setValues({ ...values, [name]: null });
    }
  };
  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    event.persist();
    setValues({ ...values, [name]: value });
  };
  const handleChangeNumber = (event) => {
    const re = /^[0-9\b]+$/;
    const { target } = event;
    console.log(target,event);
    const { name, value } = target;
    event.persist();
    if (value === "" || re.test(value)) {
      setValues({ ...values, [name]: String(value) });
    }
  };
  const handleCheckedChange = (event) => {
    const { target } = event;
    const { name, checked } = target;
    event.persist();
    setValues({ ...values, [name]: checked });
  };
  const handleObjectChange = (event, stateValue) => {
    const { target } = event;
    const { name, value } = target;
    stateValue[name] = value;
    setValues({ ...values, stateValue });
  };
  const handleSelectChange = (event, state) => {
    if (event) {
      const { value } = event;
      const array = Array.of(event);
      setValues({ ...values, [state]: value, [state + "Value"]: array });
    } else {
      setValues({ ...values, [state]: "", [state + "Value"]: "" });
    }
  };
  const handleBlur = (event) => {
    const { target } = event;
    const { name } = target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors });
  };
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors({ ...errors });
    onSubmit({ event, values, errors });
  };
  const handleMultiSelectChange = (value = [], state) => {
    setValues({ ...values, [state]: value });
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  };
  return {
    values,
    setValues,
    errors,
    touched,
    validateEmail,
    handleDateChange,
    handleChange,
    handleChangeNumber,
    handleCheckedChange,
    handleObjectChange,
    handleSelectChange,
    handleBlur,
    handleSubmit,
    handleMultiSelectChange,
  };
};
export default useCustomForm;
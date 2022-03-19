import {ChangeEvent, useCallback, useState} from 'react';

export function useForm<T>(initialState: T = {} as T) {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value, validationMessage} = event.target;
    //const form = closest("form") as HTMLFormElement;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: validationMessage });
   // setIsValid(form?.checkValidity());
  };

  const resetForm = useCallback(
    (newValues: T = {} as T, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}

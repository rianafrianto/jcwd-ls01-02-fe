import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "../TextError";

function Input(props) {
  const { label, name, className, ...rest } = props;
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        className={`field-input pl-14 ${className}`}
        {...rest}
      />
      <ErrorMessage name={name} component={TextError} />
    </>
  );
}

export default Input;

import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "../TextError";

function Input(props) {
  const { label, name, placeholder, onChange, onBlur, type, className } = props;
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        className={`field-input pl-14 ${className}`}
      />
      <ErrorMessage name={name} component={TextError} />
    </>
  );
}

export default Input;

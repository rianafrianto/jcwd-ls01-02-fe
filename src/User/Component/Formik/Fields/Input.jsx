import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "../TextError";

function Input(props) {
  const { label, name, className, ...rest } = props;
  return (
    <>
      <label htmlFor={name} className="text-sm sm:text-base">
        {label}
      </label>
      <input name={name} className={`field-input ${className}`} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </>
  );
}

export default Input;

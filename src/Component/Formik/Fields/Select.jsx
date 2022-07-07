import React from "react";
import { ErrorMessage, Field } from "formik";
import TextError from "../TextError";

function Select(props) {
  const { label, name, className, options, onChange, ...rest } = props;

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select
        as="select"
        id={name}
        name={name}
        onChange={onChange}
        className={`field-input ${className}`}
        {...rest}
      >
        {options.map((val, i) => {
          return (
            <option key={i} value={val.value}>
              {val?.content}
            </option>
          );
        })}
      </select>
      <ErrorMessage name={name} component={TextError} />
    </>
  );
}

export default Select;

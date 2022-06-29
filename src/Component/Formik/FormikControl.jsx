import React from "react";
import Input from "./Fields/Input";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "INPUT":
      return <Input {...rest} />;
    case "RADIO":
    case "TEXTAREA":
    case "OPTIONS":
    case "SEARCH":
    case "DATE":
    case "CHECKBOX":

    default:
      return null;
  }
}

export default FormikControl;

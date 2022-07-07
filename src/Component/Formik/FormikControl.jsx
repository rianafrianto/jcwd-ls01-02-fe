import React from "react";
import Input from "./Fields/Input";
import Select from "./Fields/Select";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "INPUT":
      return <Input {...rest} />;
    case "RADIO":
    case "TEXTAREA":
    case "SELECT":
      return <Select {...rest} />;
    case "SEARCH":
    case "DATE":
    case "CHECKBOX":

    default:
      return null;
  }
}

export default FormikControl;

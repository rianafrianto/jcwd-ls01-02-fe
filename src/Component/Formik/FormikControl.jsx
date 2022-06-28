import React from "react";
import Input from "./Fields/Input";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "INPUT":
      return <Input {...rest} />;
    case "INPUT":
    case "INPUT":
    case "INPUT":
    case "INPUT":
    case "INPUT":
    case "INPUT":

    default:
      return null;
  }
}

export default FormikControl;

import React from "react";

function TextError(props) {
  return (
    <div className="absolute text-red-600 -bottom-5 right-0 text-sm">
      {props.children}
    </div>
  );
}

export default TextError;

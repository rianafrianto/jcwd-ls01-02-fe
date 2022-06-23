import React from "react";

function Button({ className, onClick, type, disabled, buttonText }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full h-11 outline text-xs rounded-lg outline-1 flex justify-center items-center ${className}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}

export default Button;

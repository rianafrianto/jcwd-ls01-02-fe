import React from "react";

function Button({ className, onClick, type, disabled, buttonText }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`button-general ${className}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}

export default Button;

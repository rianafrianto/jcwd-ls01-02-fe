import React from "react";

function Button({ className, onClick, type, disabled, buttonContent }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className}`}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
}

export default Button;

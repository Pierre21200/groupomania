import React from "react";

const Button = ({ type, className, value, disabled, onClick }) => {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  className: "btn btn-outline-primary",
  value: "Envoyer"
};

export default Button;

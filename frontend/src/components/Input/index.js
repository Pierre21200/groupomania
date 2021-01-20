import React from "react";

const Input = ({ name, className, id, type, onChange }) => {
  return (
    <div className="input">
      <label htmlFor={name}></label>
      <input
        className={className}
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        placeholder={name}
        required
      />
    </div>
  );
};

Input.defaultProps = {
  className: "form-control",
  type: "text"
};

export default Input;

// problème de couleur dans mon code
// faire des faux data au format json, copier la réponse de postman

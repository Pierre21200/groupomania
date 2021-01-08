import React from "react";

const Input = ({ type, value, name, onChange, placeholder, autoComplete }) => {
  return (
    <div>
      <label htmlFor={name}></label>
      <input
        className="form-control"
        id={name}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
      />
    </div>
  );
};

export default Input;

// problème de couleur dans mon code
// faire des faux data au format json, copier la réponse de postman

import React from "react";

const Input = ({ name, className, id, type, onChange, value }) => {
  return (
    <div className="input">
      <label htmlFor={name}></label>
      <input
        value={value}
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

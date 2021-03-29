import React from "react";

const Textarea = ({ name, className, id, type, onChange, value }) => {
  return (
    <div className="textarea">
      <label htmlFor={name}></label>
      <textarea
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

Textarea.defaultProps = {
  className: "form-control"
};

export default Textarea;

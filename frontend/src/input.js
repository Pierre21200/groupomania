const INPUT = ({
  type,
  value,
  name,
  onChange,
  placeholder,
  autoComplete = ""
}) => {
  return (
    <div className="input">
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
      ></input>
    </div>
  );
};

export default INPUT;

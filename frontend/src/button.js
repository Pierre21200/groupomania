const BUTTON = ({
  type = "button",
  className = "btn btn-outline-primary",
  value = "Envoyer",
  disabled = "disabled"
}) => {
  return (
    <button type={type} className={className} disabled={disabled}>
      {value}
    </button>
  );
};

export default BUTTON;

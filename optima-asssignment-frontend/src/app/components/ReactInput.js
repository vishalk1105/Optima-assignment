const ReactInput = ({
  type,
  name,
  label,
  error,
  placeholder,
  inputClassName,
  reactInputClassName,
  onChange,
  onClick,
  value,
}) => {
  return (
    <div className={`react-input ${reactInputClassName}`}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}

      <div className="innerInput">
        <input
          className={`form-control ${inputClassName}`}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onClick={onClick}
          value={value}
        />
      </div>

      {error && <p className="text-danger errorMsg mb-0">{error}</p>}
    </div>
  );
};

export default ReactInput;

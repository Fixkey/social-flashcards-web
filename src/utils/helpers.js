export function MyInput({
  name,
  label,
  register,
  error,
  validation = {},
  placeholder,
}) {
  return (
    <div className={`field ${error ? "error" : ""}`}>
      <label htmlFor={name}>{label}</label>
      {error ? (
        <div
          className="ui pointing below prompt label"
          id={`form-input-${name}-error-message`}
          role="alert"
          aria-atomic="true"
        >
          {error}
        </div>
      ) : null}
      <input
        placeholder={placeholder}
        name={name}
        id={name}
        ref={register(validation)}
      />
    </div>
  );
}

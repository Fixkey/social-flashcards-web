export function MyInput({
  name,
  label,
  register,
  error,
  validation = {},
  placeholder,
  type,
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
        placeholder={placeholder ? placeholder : label}
        name={name}
        id={name}
        ref={register(validation)}
        type={type}
      />
    </div>
  );
}

export function MyCheckbox({ name, label, register }) {
  return (
    <div className="field">
      <div className="ui checkbox">
        <input type="checkbox" ref={register} name={name} id={name} />
        <label htmlFor={name}>{label}</label>
      </div>
    </div>
  );
}

export function isOwner(user, deck) {
  const { username } = user;

  if (deck?.owners) {
    return deck.owners.some((deckOwner) => username === deckOwner);
  }
  return false;
}

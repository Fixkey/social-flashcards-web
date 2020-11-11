import assert from "assert";
import is from "is_js";

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

export function createProgressFromDeck(deck) {
  assert(is.object(deck));
  assert(is.array(deck.cards));
  const obj = {};
  deck.cards.forEach((card) => {
    obj[card.id] = {
      level: 1,
      lastAnswered: null,
    };
  });
  return obj;
}

export function mapProgressToQueue(progress, deck) {
  const arr = [];
  Object.keys(progress).forEach((key) => {
    if (!progress[key].completed) {
      const deckCard = deck.cards.find((card) => card.id === +key);
      const card = {
        ...progress[key],
        // id: +key,
        ...deckCard,
        deck: deck.permaLink,
        answeredThisSession: false,
        completedThisSession: false,
      };
      arr.push(card);
    }
  });
  return arr;
}

export function updateProgressFromQueue(progress, queue) {
  queue.forEach((card) => {
    const userCard = progress[card.deck][card.id];
    assert(is.object(userCard), "Progress must contain card from queue");
    if (userCard.lastAnswered < card.lastAnswered) {
      userCard.lastAnswered = card.lastAnswered;
      userCard.level = card.level;
    }
  });
  return progress;
}

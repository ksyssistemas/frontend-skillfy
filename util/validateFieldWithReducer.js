export function validateFieldWithReducer({
  dispatch,
  typePrefix = 'SET_',
  name,
  value,
  validate = (v) => v !== "",
  allowNull = false,
}) {
  let state;

  if (allowNull && value === "") {
    state = null;
  } else {
    state = validate(value) ? "valid" : "invalid";
  }

  dispatch({ type: `${typePrefix}${name}_STATE`, payload: state });

  return state === "valid";
};

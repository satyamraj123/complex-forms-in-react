import react, { useState, useEffect } from "react";
import useInput from "../hooks/use-input";
const SimpleInput = (props) => {
  const {
    enteredValue: enteredName,
    valueIsValid: enteredNameIsValid,
    hasError: nameInputIsInvalid,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");
  const {
    enteredValue: enteredEmail,
    valueIsValid: enteredEmailIsValid,
    hasError: emailInputIsInvalid,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput(
    (value) => value.trim().includes("@") && value.trim().includes(".")
  );
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (enteredNameIsValid && enteredEmailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredNameIsValid, enteredEmailIsValid]);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!enteredNameIsValid && !enteredEmailIsValid) {
      return;
    }
    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = !nameInputIsInvalid
    ? "form-control"
    : "form-control invalid";
  const emailInputClasses = !emailInputIsInvalid
    ? "form-control"
    : "form-control invalid";
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputIsInvalid && (
          <p className="error-text">Email is not valid</p>
        )}
      </div>
      <div className="form-actions">
        <button type="submit" disabled={!formIsValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;

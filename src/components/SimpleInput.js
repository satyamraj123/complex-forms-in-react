import react, { useRef, useState } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched,setEnteredNameTouched]=useState(false);
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const nameInputBlurHandler=(event)=>{
    setEnteredNameTouched(true); 
    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }
  }
  const formSubmitHandler = (event) => {
    event.preventDefault();
    enteredNameTouched(true);
    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }
    console.log(enteredName);
    console.log(nameInputRef.current.value);
  };
  const nameInputIsInvalid=!enteredNameIsValid&&enteredNameTouched;
  const nameInputClasses=!nameInputIsInvalid?'form-control':'form-control invalid';
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          ref={nameInputRef}
        />
        {nameInputIsInvalid&&<p className="error-text">Name must not be empty</p>}
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

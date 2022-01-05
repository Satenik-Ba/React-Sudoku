import React, {useState} from 'react';

function Input(props) {
    const [input, setInput] = useState()

  const handleChange = (e) => {
    let userInput = parseInt(e.target.value.trim());
    if (
      userInput.toString().length > 1 ||
      isNaN(userInput) ||
      userInput < 1 ||
      userInput > 9
    ) {
      setInput(null)
    } else {
      setInput(userInput)
    }
  };
  return (
    <input
      type="text"
      onChange={handleChange}
      value={props.cell}
      disabled={Boolean(props.cell)}
      minLength="1"
      maxLength="1"
    ></input>
  );
}

export default Input;

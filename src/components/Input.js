import React, { useEffect, useState } from 'react';
import { checkInput } from './utils';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  invalidInput: {
    color: 'red',
  },
  validInput: {
    color: 'black',
  },
});

function Input(props) {
  const classes = useStyles();
  const [input, setInput] = useState();
  const [isInvalid, setIsInvalid] = useState(classes.validInput);

  const handleChange = (e) => {
    let userInput = parseInt(e.target.value.trim());
    if (isNaN(userInput)) {
      e.target.value = '';
      return null;
    }
    if (userInput === 0) {
      e.target.value = '';
      return null;
    }
    setInput(userInput);
  };
console.log(input)
  useEffect(() => {
    let result = checkInput(
      input,
      props.completedBoard,
      props.rowIndex,
      props.cellIndex
    );
    if (!result) {
      setIsInvalid(classes.invalidInput);
    } else {
      setIsInvalid(classes.validInput);
    }
  }, [input, props.completedBoard]);

  return (
    <input
      className={isInvalid}
      type="text"
      onChange={handleChange}
      value={props.cell}
      disabled={Boolean(props.cell)}
      minLength="1"
      maxLength="1"
    />
  );
}

export default Input;

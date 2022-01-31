import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  invalidInput: {
    '&:focus': {
      color: 'red',
    },
  },
  validInput: {
    color: 'black',
  },
});

function CellComponent({
  cell,
  rowIndex,
  cellIndex,
  wrongInput,
  checkUserInput,
}) {
  const classes = useStyles();
  const [input, setInput] = useState();
  const [displayValue, setDisplayValue] = useState();

  const handleChange = (e) => {
    setInput('');
    let userInput = parseInt(e.target.value.trim());
    if (isNaN(userInput) || userInput === 0) {
      e.target.value = '';
      setDisplayValue('');
      return null;
    }
    setInput(userInput);
  };

  useEffect(() => {
    if (cell.value === null) {
      setDisplayValue(input);
    } else {
      setDisplayValue(cell.value);
    }
  }, [cell.value, input]);

  useEffect(() => {
    checkUserInput(input, rowIndex, cellIndex);
  }, [input, rowIndex, cellIndex]);

  return (
    <input
      className={classes[wrongInput]}
      type="text"
      onChange={handleChange}
      value={cell.value}
      disabled={!cell.isEditable}
      minLength="1"
      maxLength="1"
    />
  );
}

export default CellComponent;

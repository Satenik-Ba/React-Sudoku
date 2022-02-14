import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  invalidInput: {
    color: '#d00000',
  },
  validInput: {
    color: '#1c1515',
  },
});

function CellComponent({ cell, rowIndex, cellIndex, checkUserInput }) {
  const classes = useStyles();
  const [input, setInput] = useState();
  const [inputDisplay, setInputDisplay] = useState('validInput');

  const calculateDisplayValue = (cell) => {
    if (!cell.isEditable) {
      return cell.value;
    }
    if (input) {
      return input;
    }
    return '';
  };

  const handleChange = (e) => {
    setInput('');
    let userInput = parseInt(e.target.value);
    if (isNaN(userInput) || userInput === 0) {
      e.target.value = '';
      return null;
    }
    setInput(userInput);
  };

  useEffect(() => {
    checkUserInput(input, rowIndex, cellIndex);
    if (cell.isValidInput === false) {
      setInputDisplay('invalidInput');
    } else {
      setInputDisplay('validInput');
    }
  }, [input, rowIndex, cellIndex, checkUserInput, cell.isValidInput]);

  return (
    <input
      className={classes[inputDisplay]}
      type="text"
      onChange={handleChange}
      value={calculateDisplayValue(cell)}
      disabled={!cell.isEditable}
      minLength="1"
      maxLength="1"
    />
  );
}

export default CellComponent;

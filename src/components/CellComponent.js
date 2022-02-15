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

function CellComponent({ cell, rowIndex, cellIndex, checkUserInput, solved }) {
  const classes = useStyles();
  const [input, setInput] = useState('');
  const [inputDisplay, setInputDisplay] = useState('validInput');

  const handleChange = (e) => {
    setInput('');
    let userInput = parseInt(e.target.value);
    if (isNaN(userInput) || userInput === 0) {
      e.target.value = '';
      return null;
    }
    setInput(userInput);
    checkUserInput(userInput, rowIndex, cellIndex);
  };

  const calculateDisplayValue = () => {
    if (solved || !cell.isEditable) {
      return cell.value;
    }
    if (input === '') {
      return '';
    }
    if (cell.userSelection) {
      return cell.userSelection;
    }
    return '';
  };

  useEffect(() => {
    if (cell.isValidInput === false) {
      setInputDisplay('invalidInput');
    } else {
      setInputDisplay('validInput');
    }
  }, [cell.isValidInput]);

  return (
    <input
      className={classes[inputDisplay]}
      type="text"
      onChange={handleChange}
      value={calculateDisplayValue()}
      disabled={!cell.isEditable}
      minLength="1"
      maxLength="1"
    />
  );
}

export default CellComponent;

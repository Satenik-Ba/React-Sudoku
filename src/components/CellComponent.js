import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { calculateDisplayValue, checkDisplayValue } from '../logic/Sudoku';

const useStyles = makeStyles({
  invalid: {
    color: '#d00000',
  },
  valid: {
    color: '#1c1515',
  },
});

function CellComponent({
  cell,
  rowIndex,
  cellIndex,
  checkUserInput,
  solved,
  newGame,
}) {
  const classes = useStyles();
  // const [input, setInput] = useState('');

  const handleChange = (e) => {
    // setInput('');
    if (e.target.value === '') {
      // setInput('');
      checkUserInput(e.target.value, rowIndex, cellIndex);
    }
    let userInput = parseInt(e.target.value);
    if (isNaN(userInput) || userInput === 0) {
      e.target.value = '';
      return null;
    }
    // setInput(userInput);
    checkUserInput(userInput, rowIndex, cellIndex);
  };

  // useEffect(() => {
  //   if (newGame) {
  //     setInput('');
  //   }
  // }, [newGame]);

  return (
    <input
      className={classes[checkDisplayValue(cell, solved)]}
      type="text"
      onChange={handleChange}
      value={calculateDisplayValue(cell, solved)}
      disabled={!cell.isEditable}
      minLength="1"
      maxLength="1"
    />
  );
}

export default CellComponent;

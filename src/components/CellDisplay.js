import React from 'react';
import { calculateDisplayValue, checkDisplayValue } from '../logic/Sudoku';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  invalid: {
    color: '#d00000',
  },
  valid: {
    color: '#1c1515',
  },
});

function CellDisplay({ cell, rowIndex, cellIndex, checkUserInput, solved }) {
  const classes = useStyles();

  const handleChange = (e) => {
    if (e.target.value === '') {
      checkUserInput(e.target.value, rowIndex, cellIndex);
    }
    let userInput = parseInt(e.target.value);
    if (isNaN(userInput) || userInput === 0) {
      e.target.value = '';
      return null;
    }
    checkUserInput(userInput, rowIndex, cellIndex);
  };

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

export default CellDisplay;

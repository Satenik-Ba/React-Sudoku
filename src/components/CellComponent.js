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

function CellComponent({
  cell,
  rowIndex,
  cellIndex,
  checkUserInput,
}) {
  const classes = useStyles();
  const [input, setInput] = useState();
  const [displayValue, setDisplayValue] = useState();
  const [inputDisplay, setInputDisplay] = useState('validInput')

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
    setInputDisplay('validInput')
    if (cell.value === null) {
      setDisplayValue(input);
    } else {
      setDisplayValue(cell.value);
    }
    if(cell.isValidInput === false){
      setInputDisplay('invalidInput')
    }
  }, [cell.value, cell.isValidInput, input]);

  useEffect(() => {
    checkUserInput(input, rowIndex, cellIndex);
  }, [input, rowIndex, cellIndex]);

  return (
    <input
      className={classes[inputDisplay]}
      type="text"
      onChange={handleChange}
      value={displayValue}
      disabled={!cell.isEditable}
      minLength="1"
      maxLength="1"
    />
  );
}

export default CellComponent;

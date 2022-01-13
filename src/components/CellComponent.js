import React, { useEffect, useState } from 'react';
import { checkInput, completedBoard } from './utils';
import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles({
//   invalidInput: {
//     color: 'red',
//   },
//   validInput: {
//     color: 'black',
//   },
// });

function CellComponent(props) {
  // const classes = useStyles();
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
    if (props.cell.value === '') {
      setDisplayValue(input);
    } else {
      setDisplayValue(props.cell.value);
    }
  }, [props.cell.value, input]);

  useEffect(() => {
    props.checkUserInput(input, props.rowIndex, props.cellIndex);
  }, [input, props]);

  return (
    <input
      type="text"
      onChange={handleChange}
      value={displayValue}
      disabled={!props.cell.isEditable}
      minLength="1"
      maxLength="1"
    />
  );
}

export default CellComponent;
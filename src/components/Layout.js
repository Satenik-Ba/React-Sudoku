import React, { useEffect, useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import {
  puzzleBoard,
  completedBoard,
  checkInput,
  isBoardComplete,
} from './utils';
import CellComponent from './CellComponent';

const useStyles = makeStyles({
  tableContainer: {
    marginBottom: '3rem',
    marginTop: '3rem',
    width: 'auto',
    height: 'auto',
  },
  winOverlay: {
    marginBottom: '1rem',
    marginTop: '1rem',
    width: '10rem',
    height: '10rem',
    backgroundColor: 'red',
  },
  tableRow: {
    height: '3rem',
    '&:nth-of-type(3n):not(:last-child)': {
      borderBottom: '3px solid black',
    },
  },

  tableCell: {
    width: '3rem',
    height: '3rem',
    padding: 0,
    border: '1px solid black',
    textAlign: 'center',
    '&:nth-of-type(3n):not(:last-child)': {
      borderRight: '3px solid black ',
    },
    '& input': {
      border: 'none',
      width: 'inherit',
      height: 'inherit',
      fontSize: '200%',
      textAlign: 'center',
      color: '#1c1515',
      'caret-color': 'rgba(0,0,0,0)',
      '&:focus': {
        outline: 'none',
        backgroundColor: '#ffb4a2',
      },
    },
    '& td': {
      color: 'blue',
    },
  },
});

const Layout = () => {
  const classes = useStyles();
  const [board, setBoard] = useState([]);
  const [winOverlay, setWinOverlay] = useState(classes.tableContainer);
const [completeGame, setCompleteGame] = useState(false)
  const handleNewGame = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    setBoard(puzzleBoard(completedBoard));
  }, []);

  const checkUserInput = (input, rowIndex, cellIndex) => {
    if (input !== undefined) {
      if (!checkInput(input, board, rowIndex, cellIndex)) {
        console.log('INVALID');
      } else {
        console.log('VALID');
        isBoardComplete(board);
      }
      board[rowIndex][cellIndex].value = input;
    }
    if (isBoardComplete(board)) {
      setWinOverlay(classes.winOverlay);
      console.log('you wone and will change the appearance');
    }
  };

  const handleSolve = () => {
    setCompleteGame(true)
    console.log('clicked');
  };
 
  return (
    <div className={winOverlay}>
      <button onClick={handleNewGame}>New Game</button>
      <button onClick={handleSolve}>Solve</button>
      <Table>
        <TableBody>
          {board.map((row, rowIndex) => {
            return (
              <TableRow key={rowIndex} className={classes.tableRow}>
                {row.map((cell, cellIndex) => (
                  <TableCell className={classes.tableCell} key={cellIndex}>
                    <CellComponent
                      cell={cell}
                      completedBoard={completedBoard}
                      rowIndex={rowIndex}
                      cellIndex={cellIndex}
                      checkUserInput={checkUserInput}
                    />
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Layout;

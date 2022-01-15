import React, { useEffect, useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import {
  completedBoard,
  puzzleBoard,
  checkInput,
  isBoardComplete,
} from './utils';
import CellComponent from './CellComponent';
import Difficulty from './UI/DifficultyLevel';

const useStyles = makeStyles({
  tableContainer: {
    marginBottom: '3rem',
    marginTop: '3rem',
    width: 'auto',
    height: 'auto',
  },
  winOverlay: {
    marginBottom: '3rem',
    marginTop: '3rem',
    width: 'auto',
    height: 'auto',
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
  },
});

const Layout = () => {
  const classes = useStyles();
  const [winOverlay, setWinOverlay] = useState(classes.tableContainer);
  const [completeGame, setCompleteGame] = useState(false);
  const [wrongInput, setWrongInput] = useState('validInput');

  const [gameBoard, setGameBoard] = useState();

  const handleNewGame = () => {
    window.location.reload(false);
  };

  const checkUserInput = (input, rowIndex, cellIndex) => {
    if (input !== undefined) {
      if (!checkInput(input, gameBoard, rowIndex, cellIndex)) {
        setWrongInput('invalidInput');
        console.log('INVALID');
      } else {
        console.log('VALID');
        setWrongInput('validInput');
        isBoardComplete(gameBoard);
      }
      gameBoard[rowIndex][cellIndex].value = input;
    }
    if (isBoardComplete(gameBoard)) {
      setWinOverlay(classes.winOverlay);
    }
  };

  const handleSolve = () => {
    setGameBoard(completedBoard);
  };

  useEffect(() => {
    setGameBoard(puzzleBoard());
  }, []);

  return (
    <div className={winOverlay}>
      <Difficulty />
      <button onClick={handleNewGame}>New Game</button>
      <button onClick={handleSolve}>Solve</button>
      <Table>
        <TableBody>
          {gameBoard &&
            gameBoard.map((row, rowIndex) => {
              return (
                <TableRow key={rowIndex} className={classes.tableRow}>
                  {row.map((cell, cellIndex) => (
                    <TableCell className={classes.tableCell} key={cellIndex}>
                      <CellComponent
                        cell={cell}
                        rowIndex={rowIndex}
                        cellIndex={cellIndex}
                        checkUserInput={checkUserInput}
                        wrongInput={wrongInput}
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

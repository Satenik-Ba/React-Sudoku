import React, { useEffect, useState, useMemo } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import { checkInput, isBoardComplete, createFunctionalBoard } from './utils';
import CellComponent from './CellComponent';
import Difficulty from './UI/DifficultyLevel';
import TimeCounter from './UI/TimeCounter';
import { Board } from '../logic/Sudoku';

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
    height: '30.125rem',
    width: '29rem',
    'border-collapse': 'collapse',
    'border-spacing': 0,
    color: 'white',
    textAlign: 'center',
    background: '#91670c',
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
  const [wrongInput, setWrongInput] = useState('validInput');
  const [gameDifficulty, setGameDifficulty] = useState(40);

  const [gameBoardData, setGameBoardData] = useState(new Board(40));
  const [board, setBoard] = useState();
  const [wonGame, setWonGame] = useState(false);
  console.log(gameBoardData, 'GameBoardData');

  // const gameDifficultyLevel = (difficulty) => {
  //   setGameDifficulty(difficulty);
  //   setGameBoard();
  //   setSolve(1);
  //   setWonGame(false);
  // };
  useEffect(() => {
    setBoard(gameBoardData.gameBoard);
  }, [gameBoardData.gameBoard]);

  const handleSolve = () => {
    setBoard(gameBoardData.solvedGame);
  };

  const handleNewGame = () => {
    setGameBoardData(new Board(30))
    setBoard()
    // window.location.reload(false);
  };

  const checkUserInput = (input, rowIndex, cellIndex) => {
    if (input) {
      if (!checkInput(input, gameBoardData.gameBoard, rowIndex, cellIndex)) {
        setWrongInput('invalidInput');
        console.log('INVALID');
      } else {
        console.log('VALID');
        setWrongInput('validInput');
        gameBoardData.gameBoard[rowIndex][cellIndex].value = input;
      }
      if (isBoardComplete(gameBoardData.gameBoard)) {
        setWonGame(true);
        console.log('YOU WIN THE GAME');
      }
    }
    if (input === '') {
      gameBoardData[rowIndex][cellIndex].value = null;
    }
  };

  return (
    <>
      {/* <Difficulty gameDifficultyLevel={gameDifficultyLevel} /> */}
      <button onClick={handleNewGame}>New Game</button>
      <button onClick={handleSolve}>Solve</button>
      {/* <TimeCounter /> */}
      {wonGame && (
        <div className={classes.winOverlay}>
          <h1>Excellent!</h1>
          <div>Difficulty: </div>
          <div>Time: </div>
        </div>
      )}
      {!wonGame && (
        <div className={classes.tableContainer}>
          <Table>
            <TableBody>
              {board &&
                board.map((row, rowIndex) => {
                  return (
                    <TableRow key={rowIndex} className={classes.tableRow}>
                      {row.map((cell, cellIndex) => (
                        <TableCell
                          className={classes.tableCell}
                          key={cellIndex}
                        >
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
      )}
    </>
  );
};

export default Layout;

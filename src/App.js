import React, { useEffect, useState } from 'react';
import { Board } from './logic/Sudoku';
import { makeStyles } from '@mui/styles';
import { checkInput, isBoardComplete } from './logic/Sudoku';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import CellComponent from './components/CellComponent';
import Difficulty from './components/DifficultyLevel';
import TimeCounter from './components/TimeCounter';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    backgroundColor: 'rgba(39, 74, 119, 0.058)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    color: '#354f52',
    fontWeight: 600,
    '& h1': {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    '& select': {
      marginRight: 'auto',
    },
    '& button': {
      backgroundColor: '#354f52',
      color: 'white',
      fontSize: '1rem',
      padding: '0.3rem 1.5rem',
      fontWeight: '500',
      borderRadius: '5px',
      border: 'none',
      marginLeft: '0.5rem',
    },
  },

  tableContainer: {
    marginBottom: '3rem',
    marginTop: '1.5rem',
    width: 'auto',
    height: 'auto',
  },
  winOverlay: {
    marginBottom: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1.5rem',
    height: '31rem',
    width: '30rem',
    'border-collapse': 'collapse',
    'border-spacing': 0,
    color: 'white',
    background: '#354f52',
    '& h1': {
      margin: 'auto !important',
      padding: '1rem',
    },
    '& div': {
      margin: 'auto',
      padding: '1rem',
    },
  },
  tableRow: {
    height: '3rem',
    '&:nth-of-type(3n):not(:last-child)': {
      borderBottom: '3px solid #354f52',
    },
  },
  tableCell: {
    width: '3.2rem',
    height: '3.2rem',
    padding: '0 !important',
    border: '1px solid #354f52 !important',
    textAlign: 'center',
    '&:nth-of-type(3n):not(:last-child)': {
      borderRight: '3px solid #354f52 !important',
    },
    '& input': {
      border: 'none',
      width: 'inherit',
      height: 'inherit',
      fontSize: '230%',
      textAlign: 'center',
      'caret-color': 'rgba(0,0,0,0)',
      '&:focus': {
        outline: 'none',
        backgroundColor: '#ffb4a2',
      },
    },
  },
});

function App() {
  const classes = useStyles();
  const [gameDifficulty, setGameDifficulty] = useState();
  const [board, setBoard] = useState(() => new Board(50).gameBoard);
  const [wonGame, setWonGame] = useState(false);
  const [timeComp, setTimeComp] = useState(null);
  const [solved, setSolved] = useState(false);
  const [newGame, setNewGame] = useState(false);

  console.log(board);

  const gameDifficultyLevel = (difficulty) => {
    setNewGame(true);
    setBoard(() => new Board(difficulty[0]).gameBoard);
    setGameDifficulty(difficulty);
    setSolved(false);
  };

  const handleSolve = () => {
    setSolved(true);
    setNewGame(false);
  };

  const handleNewGame = () => {
    setNewGame(true);
    setBoard(() => {
      if (gameDifficulty) {
        return new Board(gameDifficulty[0]).gameBoard;
      }
      return new Board(50).gameBoard;
    });
    setWonGame(false);
    setSolved(false);
  };
  const timeCompleted = (time) => {
    setTimeComp(time);
  };

  const checkUserInput = (input, rowIndex, cellIndex) => {
    setNewGame(false);
    const selectedCell = board[rowIndex][cellIndex];
    if (input === '') {
      selectedCell.userSelection = null;
      selectedCell.isValidInput = null;
    }
    selectedCell.userSelection = input;
    if (checkInput(selectedCell)) {
      selectedCell.isValidInput = true;
    } else {
      selectedCell.isValidInput = false;
    }
    if (isBoardComplete(board)) {
      setWonGame(true);
    }
  };

  return (
    <div className={classes.root}>
      <h1>Sudoku</h1>
      <Box>
        <TimeCounter
          wonGame={wonGame}
          solved={solved}
          timeCompleted={timeCompleted}
        />
        <div className={classes.header}>
          <Difficulty
            gameDifficultyLevel={gameDifficultyLevel}
            wonGame={wonGame}
          />
          <div>
            <button onClick={handleSolve} disabled={wonGame}>
              Solve
            </button>
            <button onClick={handleNewGame}>New Game</button>
          </div>
        </div>
        {wonGame && (
          <div className={classes.winOverlay}>
            <div>
              <h1>Excellent!</h1>
              <div>
                Difficulty: {gameDifficulty ? gameDifficulty[1] : 'Easy'}
              </div>
              <div>
                Time:
                <span>
                  {' '}
                  {('0' + Math.floor((timeComp / 60000) % 60)).slice(-2)}:
                </span>
                <span>
                  {('0' + Math.floor((timeComp / 1000) % 60)).slice(-2)}
                </span>
              </div>
            </div>
          </div>
        )}
        {!wonGame && (
          <div className={classes.tableContainer}>
            <Table>
              <TableBody>
                {board.map((row, rowIndex) => {
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
                            solved={solved}
                            newGame={newGame}
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
      </Box>
    </div>
  );
}

export default App;

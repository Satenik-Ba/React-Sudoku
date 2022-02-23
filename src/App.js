import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  isUserSelectionCorrect,
  isBoardComplete,
  createBoard,
} from './logic/Sudoku';
import CellComponent from './components/CellDisplay';
import Difficulty from './components/DifficultyLevel';
import TimeCounter from './components/TimeCounter';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    backgroundColor: 'rgba(39, 74, 119, 0.058)',
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
      '@media (max-width: 926px)': {
        fontSize: '1.2rem',
        marginTop: '1rem',
      },
    },
    '@media (max-width: 926px)': {
      backgroundColor: 'rgba(1, 12, 28, 0.2)',
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
      '@media (max-width: 926px)': {
        fontSize: '0.75rem',
        padding: '0.2rem 1.1rem',
      },
    },
  },
  tableContainer: {
    marginBottom: '3rem',
    marginTop: '1.5rem',
    width: 'auto',
    height: 'auto',
    '@media (max-width: 926px)': {
      width: '20rem',
      height: '20rem',
      marginBottom: '2rem',
      marginTop: '0.75rem',
    },
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
    '@media (max-width: 926px)': {
      marginBottom: '3rem',
      marginTop: '1.5rem',
      height: '23rem',
      width: '24rem',
      fontSize: '1rem !important',
    },
    '& h1': {
      margin: 'auto !important',
      padding: '1rem',
      '@media (max-width: 926px)': {
        fontSize: '1rem',
        margin: '0rem ',
        padding: '0rem',
      },
    },
    '& div': {
      margin: '2rem',
      padding: '1rem',
      '@media (max-width: 926px)': {
        margin: '30vh',
        padding: '0.5rem',
        marginTop: '1rem',
        marginBottom: '1rem',
        fontSize: '1rem !important',
      },
    },
  },

  tableRow: {
    height: '3rem',
    '&:nth-of-type(3n):not(:last-child)': {
      borderBottom: '3px solid #354f52',
    },
    '@media (max-width: 926px)': {
      height: '1.5rem',
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
      '@media (max-width: 926px)': {
        fontSize: '130%',
        fontWeight: 500,
      },
      '&:focus': {
        outline: 'none',
        backgroundColor: '#ffb4a2',
      },
    },
    '@media (max-width: 926px)': {
      width: '2rem',
      height: '2rem',
    },
  },
});

function App() {
  const classes = useStyles();
  const [gameDifficulty, setGameDifficulty] = useState();
  const [board, setBoard] = useState(() => createBoard(50));
  const [gameWon, setGameWon] = useState(false);
  const [timeComp, setTimeComp] = useState(null);
  const [solved, setSolved] = useState(false);
  const [newGame, setNewGame] = useState(false);

  const gameDifficultyLevel = (difficulty) => {
    setBoard(() => createBoard(difficulty[0]));
    setNewGame(true);
    setGameDifficulty(difficulty);
    setSolved(false);
  };

  const handleSolve = () => {
    setSolved(true);
    setNewGame(false);
  };

  const handleNewGame = () => {
    setBoard(() => {
      if (gameDifficulty) {
        return createBoard(gameDifficulty[0]);
      }
      return createBoard(50);
    });
    setNewGame(true);
    setGameWon(false);
    setSolved(false);
  };

  const timeCompleted = (time) => {
    setTimeComp(time);
    setNewGame(false);
  };

  const checkUserInput = (input, rowIndex, cellIndex) => {
    setNewGame(false);
    const selectedCell = board[rowIndex][cellIndex];
    if (input === '') {
      selectedCell.userSelection = null;
      selectedCell.isValidInput = null;
    }
    selectedCell.userSelection = input;
    selectedCell.isValidInput = isUserSelectionCorrect(selectedCell);
    setBoard([...board]);
    if (isBoardComplete(board)) {
      setGameWon(true);
    }
  };

  return (
    <div className={classes.root}>
      <h1>Sudoku</h1>
      <Box>
        <TimeCounter
          gameWon={gameWon}
          solved={solved}
          timeCompleted={timeCompleted}
          newGame={newGame}
        />
        <div className={classes.header}>
          <Difficulty
            gameDifficultyLevel={gameDifficultyLevel}
            gameWon={gameWon}
          />
          <div>
            <button onClick={handleSolve} disabled={gameWon}>
              Solve
            </button>
            <button onClick={handleNewGame}>New Game</button>
          </div>
        </div>
        {gameWon && (
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
        {!gameWon && (
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

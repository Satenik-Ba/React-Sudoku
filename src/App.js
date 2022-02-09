import React, { useEffect, useState, useMemo } from 'react';
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
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between', 

    '& select': {
      marginRight: 'auto'
    },
    '& button': {
      backgroundColor: '#354f52', 
      color: 'white',
      fontSize: '1rem',
      padding: '0.3rem 1.5rem',
      fontWeight: '500',
      borderRadius: '5px', 
      border: 'none', 
      marginLeft: '0.5rem'
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
      color: '#1c1515',
      'caret-color': 'rgba(0,0,0,0)',
      '&:focus': {
        outline: 'none',
        backgroundColor: '#ffb4a2',
      },
    },
  },
});

function App() {
  console.log('APP JS');
  const classes = useStyles();
  const [gameDifficulty, setGameDifficulty] = useState();
  const [gameBoardData, setGameBoardData] = useState(new Board(50));
  const [board, setBoard] = useState(gameBoardData.gameBoard);
  const [wrongInput, setWrongInput] = useState('validInput');
  const [wonGame, setWonGame] = useState(false);
  console.log(gameBoardData);

  const gameDifficultyLevel = (difficulty) => {
    setGameDifficulty(difficulty);
    setBoard();
    setGameBoardData(new Board(difficulty[0]));
  };

  useEffect(() => {
    setBoard(gameBoardData.gameBoard);
  }, [gameBoardData.gameBoard]);

  const handleSolve = () => {
    setBoard(gameBoardData.completedBoard);
  };

  const handleNewGame = () => {
    setBoard(null);
    setGameBoardData(() => {
      if (gameDifficulty) {
        return new Board(gameDifficulty[0]);
      } else {
        return new Board(50);
      }
    });
    setWonGame(false)
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
      gameBoardData.gameBoard[rowIndex][cellIndex].value = null;
    }
  };
  return (
    <div className={classes.root}>
      <Box>
        {/* <TimeCounter /> */}
        <div className ={classes.header}>
          <Difficulty gameDifficultyLevel={gameDifficultyLevel} />
          <div>
          <button onClick={handleSolve}>Solve</button>
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
              <div>Time: </div>
            </div>
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
      </Box>
    </div>
  );
}

export default App;

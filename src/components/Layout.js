import React, { useEffect, useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import { puzzleBoard, completedBoard } from './utils';
import Input from './CellComponent';

const useStyles = makeStyles({
  tableContainer: {
    marginBottom: '3rem',
    marginTop: '3rem',
    width: 'auto',
    height: 'auto',
    borderCollapse: 'collapse',
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
  const [board, setBoard] = useState([]);

  useEffect(() => {
    setBoard(puzzleBoard(completedBoard));
  }, []);

  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <div className={classes.container}>
      <button onClick={handleClick}>New Game</button>
      <Table className={classes.tableContainer}>
        <TableBody>
          {board.map((row, rowIndex) => {
            return (
              <TableRow key={rowIndex} className={classes.tableRow}>
                {row.map((cell, cellIndex) => (
                  <TableCell className={classes.tableCell} key={cellIndex}>
                    <Input
                      cell={cell}
                      completedBoard={completedBoard}
                      rowIndex={rowIndex}
                      cellIndex={cellIndex}
                      setBoard={setBoard}
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

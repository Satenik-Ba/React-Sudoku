import React, { useEffect, useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import { puzzleBoard, completedBoard } from '../utils';

const useStyles = makeStyles({
  tableContainer: {
    marginBottom: '3rem',
    marginTop: '3rem',
    width: 'auto',
    height: 'auto',
    borderCollapse: 'collapse',
  },
  tableRow: {
    '&:nth-of-type(3n):not(:last-child)': {
      borderBottom: '3px solid black',
    },
  },

  tableCell: {
    width: '1rem',
    height: '1rem',
    border: '1px solid black',
    textAlign: 'center',
    '&:nth-of-type(3n):not(:last-child)': {
      borderRight: '3px solid black ',
    },
  },
});

const Layout = () => {
  const classes = useStyles();
  const [board, setBoard] = useState([]);

  useEffect(() => {
    setBoard(puzzleBoard(completedBoard));
  }, []);

  return (
    <div className={classes.container}>
      <TableContainer className={classes.tableContainer}>
        <TableBody>
          {board.map((row, rowIndex) => {
            return (
              <TableRow key={rowIndex} className={classes.tableRow}>
                {row.map((col, colIndex) => (
                  <TableCell className={classes.tableCell} key={colIndex}>
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </TableContainer>
    </div>
  );
};

export default Layout;

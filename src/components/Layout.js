import React, { useEffect, useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  tableContainer: {
    marginBottom: '7rem',
    marginTop: '7rem',
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

  const generateRow = () => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let row = [];
    let j = 0;
    let i = nums.length;
    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      row.push(nums[j]);
      nums.splice(j, 1);
    }
    return row;
  };

  useEffect(() => {
    let game = [];
    let row1 = generateRow();
    let row2 = generateRow();
    let row3 = generateRow();
    let row4 = generateRow();
    let row5 = generateRow();
    let row6 = generateRow();
    let row7 = generateRow();
    let row8 = generateRow();
    let row9 = generateRow();
    game.push(row1, row2, row3, row4, row5, row6, row7, row8, row9);
    setBoard(game);
  }, []);

  return (
    <div className={classes.container}>
      {/* <Button>New Game</Button> */}
      <TableContainer className={classes.tableContainer}>
        <TableBody>
          {board.map((row, rowIndex) => {
            return (
              <TableRow key={rowIndex} className={classes.tableRow}>
                {row.map((col) => (
                  <TableCell className={classes.tableCell}>{col}</TableCell>
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



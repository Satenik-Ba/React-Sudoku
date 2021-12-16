import * as React from 'react';
import Table from '@mui/material/Table';
import Card from '@mui/material/Card';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { tableCellClasses } from '@mui/material/TableCell';
const useStyles = makeStyles({
  tableContainer: {
    borderWidth: 5,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  tableCell: {
    borderRightStyle: 'solid',
    borderRightColor: 'black',
    display: 'tableRowGroup',
  },
  horizontalLine: {
    borderBottomStyle: 'solid',
    borderBottomColor: 'black ',
    display: 'tableRowGroup',
  },
});

const Layout = () => {
  const classes = useStyles();
  return (
    <div>
      {/* <Button>New Game</Button> */}
      <TableContainer >
        {[...Array(9)].map((elem, rowIndex) => {
          return <TableBody key={rowIndex}>
            {[...Array(9)].map((elem, colIndex) => {
              return <TableCell key={colIndex}>Cell</TableCell>;
            })}
          </TableBody>;
        })}
      </TableContainer>
    </div>
  );
};

export default Layout;



/* 
[
  [1, 2, 3,     4, 5, 6,     7, 8, 9]
  [4, 5, 6,     4, 5, 6,     7, 8, 9]
  [7, 8, 9,     4, 5, 6,     7, 8, 9]

  [1, 2, 3,     4, 5, 6,     7, 8, 9]
  [1, 2, 3,     4, 5, 6,     7, 8, 9]
  [1, 2, 3,     4, 5, 6,     7, 8, 9]

  [1, 2, 3,     4, 5, 6,     7, 8, 9]
  [1, 2, 3,     4, 5, 6,     7, 8, 9]
  [1, 2, 3,     4, 5, 6,     7, 8, 9]

]
*/
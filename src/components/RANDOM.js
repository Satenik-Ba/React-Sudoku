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


export const createBoard = () => {
  let arr = []
  for ( let i = 0; i < 9; i++){
      let row = []
      arr.push(row)
      for (let j = 0; j < 9; j++) {
          row.push(createRandomNum(9))
      }
  }
  return arr; 
}



// const createRandomNum =(max = 9) => {
//     return Math.floor(Math.random() * max +1)
// }

const generateRandomArray = () => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let arr = [];
  let j = 0;
  let i = nums.length;
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    arr.push(nums[j]);
    nums.splice(j, 1);
  }
  return arr;
};

const row = new Set (generateRandomArray())
const colm = new Set(generateRandomArray())
const square = new Set(generateRandomArray())
console.log(row, colm, square)




// GENERATES A BOARD WITH NUMBERS THAT ARE NOT REPEATING 


const createRandomNum = (max = 9) => {
  return Math.floor(Math.random() * max + 1);
};

const generateRandomArray = () => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let arr = [];
  let j = 0;
  let i = nums.length;
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    arr.push(nums[j]);
    nums.splice(j, 1);
  }
  console.log(arr, 'ARR, in GENERATE ARRAY');
  return arr;
};

// const row = new Set(generateRandomArray());
// const colm = new Set(generateRandomArray());
// const square = new Set(generateRandomArray());
// const intersection = new Set([...row].filter(x => colm.has(x)))

export const createBoard = () => {
  let board = [];
  for (let j = 0; j < 9; j++) {
    board.push(generateRandomArray());
  }
  return board;
};

console.log(puzzleBoard[rowIndex][cellIndex], rowIndex, cellIndex, 'PUZZLE[rowIndex][cellIndex]')
console.log(puzzleBoard[cellIndex][rowIndex], cellIndex, rowIndex, 'PUZZLE[cellIndex][rowIndex]')

// BASIC SET UP starting from here 7pm 12/18

const createRandomNum = (max = 9) => {
  return Math.floor(Math.random() * max + 1);
};

const rows = new Set(); 
const columns = new Set()
const squres = new Set(); 

 export const createBoard = () => {
  let board = [];
  for (let i = 0; i < 9; i++) {
    let row = new Set()
    for (let j = 0; j < 9; j++) {
      row.add(createRandomNum());
    }
    board.push(Array.from(row));
    row = null; 
  }
  return board;
};

// const getBoard = () => {
//     let puzzleBoard = createBoard(); 
//     puzzleBoard.map((row, rowIndex) => {
//        rows.add(row)
//        console.log(rows, 'ROWS')
//         row.map((cell, cellIndex) => {
//             columns.add(puzzleBoard[cellIndex][rowIndex])
//             rows.add(cell)
//             console.log(columns, rows, 'COlumns  ROWS')
//         })
//     })
// }
// getBoard()



//// ???? CHANGING to make it with generating a array with random numbers



const createRandomNum = (max = 9) => {
  return Math.floor(Math.random() * max + 1);
};

const rows = new Set();
const columns = new Set();
const squres = new Set();

export const createBoard = () => {
  let board = [];
  for (let i = 0; i < 9; i++) {
    let row = new Set();
    for (let j = 0; j < row.size + 1; j++) {
      row.add(createRandomNum());
    }
    board.push(Array.from(row));
    row = null;
  }
  return board;
};

// const getBoard = () => {
//     let puzzleBoard = createBoard();
//     puzzleBoard.map((row, rowIndex) => {
//        rows.add(row)
//        console.log(rows, 'ROWS')
//         row.map((cell, cellIndex) => {
//             columns.add(puzzleBoard[cellIndex][rowIndex])
//             rows.add(cell)
//             console.log(columns, rows, 'COlumns  ROWS')
//         })
//     })
// }
// getBoard()



// Create a 9 by 9 with every row being a unique array


const createRandomNum = (max = 9) => {
  return Math.floor(Math.random() * max + 1);
};

const generateRandomArray = () => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let arr = new Set();
    let j = 0;
    let i = nums.length;
    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      arr.add(nums[j]);
      nums.splice(j, 1);
    }
    return arr;
  };


export const createBoard = () => {
  let board = [];
  for (let i = 0; i < 9; i++) {
    board.push(Array.from(generateRandomArray()))
  }
  return board;
};



function isSafe(board, row, col, num)
{
     
    // Row has the unique (row-clash)
    for(let d = 0; d < board.length; d++)
    {
         
        // Check if the number we are trying to
        // place is already present in
        // that row, return false;
        if (board[row][d] == num)
        {
            return false;
        }
    }
 
    // Column has the unique numbers (column-clash)
    for(let r = 0; r < board.length; r++)
    {
          
        // Check if the number
        // we are trying to
        // place is already present in
        // that column, return false;
        if (board[r][col] == num)
        {
            return false;
        }
    }
 
    // Corresponding square has
    // unique number (box-clash)
    let sqrt = Math.floor(Math.sqrt(board.length));
    let boxRowStart = row - row % sqrt;
    let boxColStart = col - col % sqrt;
 
    for(let r = boxRowStart;
            r < boxRowStart + sqrt; r++)
    {
        for(let d = boxColStart;
                d < boxColStart + sqrt; d++)
        {
            if (board[r][d] == num)
            {
                return false;
            }
        }
    }
 
    // If there is no clash, it's safe
    return true;
}
 
function solveSudoku(board, n){
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for(let i = 0; i < n; i++){
        for(let j = 0; j < n; j++){
            if (board[i][j] == 0){
                row = i;
                col = j;
                // We still have some remaining
                // missing values in Sudoku
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty){
            break;
        }
    }
 
    // No empty space left
    if (isEmpty)
    {
        return true;
    }
    // Else for each-row backtrack
    for(let num = 1; num <= n; num++)
    {
        if (isSafe(board, row, col, num))
        {
            board[row][col] = num;
            if (solveSudoku(board, n))
            {
                // print(board, n);
                return true;
            }
            else
            {
                // Replace it
                board[row][col] = 0;
            }
        }
    }
    return false;
}
 
function print(board, N)
{
     
    // We got the answer, just print it
    for(let r = 0; r < N; r++)
    {
        for(let d = 0; d < N; d++)
        {
            document.write(board[r][d]);
            document.write(" ");
        }
        document.write("<br>");
 
        if ((r + 1) % Math.floor(Math.sqrt(N)) == 0)
        {
            document.write("");
        }
    }
}











//Generate Random Number

const createRandomNum = (max = 9) => {
  return Math.floor(Math.random() * max + 1);
};

// Create a board with all zeros
 const createBoard = () => {
  let board = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      row.push(0);
    }
    board.push(row);
  }
  return board;
};

const puzzle = createBoard()

const isValid = (board, row, col, cell) => {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (
      board[row][col] === cell ||
      board[i][col] === cell ||
      board[m][n] === cell
    ) {
      return false;
    }
  }
  return true;
};


 const generateBoard = (board) => {
  for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (board[i][j] === 0) {
            for (let k = 1; k <= 9; k++) {
              if (isValid(board, i, j, createRandomNum())) {
                board[i][j] = createRandomNum();
                if (generateBoard(board)) {
                  return true;
                } else {
                  board[i][j] = 0;
                }
              }
            }
            return false;
          }
        }
      }
      console.log(board, 'BOARD')
      return board;
};

generateBoard(puzzle)

// function sodokoSolver(data) {
//   for (let i = 0; i < 9; i++) {
//     for (let j = 0; j < 9; j++) {
//       if (data[i][j] == '.') {
//         for (let k = 1; k <= 9; k++) {
//           if (isValid(data, i, j, k)) {
//             data[i][j] = `${k}`;
//             if (sodokoSolver(data)) {
//               return true;
//             } else {
//               data[i][j] = '.';
//             }
//           }
//         }
//         return false;
//       }
//     }
//   }
//   return true;
// }

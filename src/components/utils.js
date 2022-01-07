
 const puzzle = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const createRandomNum = (max = 9) => {
  return Math.floor(Math.random() * max + 1);
};

const isValid = (board, row, col, cell) => {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (
      board[row][i] === cell ||
      board[i][col] === cell ||
      board[m][n] === cell
    ) {
      return false;
    }
  }
  return true;
};

export const generateBoard = (puzzle) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (puzzle[i][j] === 0) {
        for (let k = 0; k < 9; k++) {
          let cell = createRandomNum();
          if (isValid(puzzle, i, j, cell)) {
            puzzle[i][j] = cell;
            if (generateBoard(puzzle)) {
              return puzzle;
            } else {
              puzzle[i][j] = 0;
            }
          }
        }
        return false;
      }
    }
  }
  return puzzle;
};
export const completedBoard = generateBoard(puzzle);

const easy = Math.floor(Math.random() * 21 + 14);
const medium = Math.floor(Math.random() * 28 + 20);
const hard = Math.floor(Math.random() * 35 + 28);

// Remove numbers from the board based on difficulty
export const puzzleBoard = (board) => {
  for (let i = 0; i < hard; i++) {
    let x = Math.floor(Math.random() * 9);
    let y = Math.floor(Math.random() * 9);
    board[x][y] = null;
  }
  return board;
};

export const checkInput = (input, completedBoard, rowIndex, cellIndex) => {
  for (let i = 0; i < 9; i++) {
    const k = 3 * Math.floor(rowIndex / 3) + Math.floor(i / 3);
    const l = 3 * Math.floor(cellIndex / 3) + (i % 3);
    if (
      completedBoard[rowIndex][i] === input ||
      completedBoard[i][cellIndex] === input ||
      completedBoard[k][l] === input
    ) {
      return false;
    } 
  }
  return true; 
};

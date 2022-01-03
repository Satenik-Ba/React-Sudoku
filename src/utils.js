export const puzzle = [
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

export const generateBoard = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        for (let k = 0; k < 9; k++) {
          let cell = createRandomNum();
          if (isValid(board, i, j, cell)) {
            board[i][j] = cell;
            if (generateBoard(board)) {
              return board;
            } else {
              board[i][j] = 0;
            }
          }
        }
        return false;
      }
    }
  }
  return board;
};

export const completedBoard = generateBoard(puzzle);

const easy = Math.floor(Math.random() * 21 + 14)
const medium = Math.floor(Math.random() * 28 + 20)
const hard = Math.floor(Math.random() * 35 + 28 )

export const puzzleBoard = (board) => {
 
  for (let i = 0; i < hard; i++) {
    let x = Math.floor(Math.random() * 9);
    let y = Math.floor(Math.random() * 9);
    if(board[x][y] !== ''){
      board[x][y] = ''
    }
  }
  return board;
};

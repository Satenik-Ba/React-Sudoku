class Cell {
    constructor(value, isEditable) {
      this.value = value;
      this.isEditable = isEditable;
    }
  }
  
  export class Board {
    constructor() {
    
    }
  
    createRandomNum(max) {
      return Math.floor(Math.random() * max);
    }
  
    createEmptyBoard() {
      let board = [];
      for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
          row.push(new Cell(null, false));
        }
        board.push(row);
      }
      console.log(board)
      return board;
    }
}
let board = new Board()




///utils board
const createRandomNum = (max = 9) => {
  return Math.floor(Math.random() * max + 1);
};

const createEmptyBoard = () => {
  let board = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      row.push({ value: 0, isEditable: false });
    }
    board.push(row);
  }
  return board;
};

const isValid = (board, row, col, cell) => {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (
      board[row][i].value === cell ||
      board[i][col].value === cell ||
      board[m][n].value === cell
    ) {
      return false;
    }
  }
  return true;
};

const generateBoard = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j].value === 0) {
        for (let k = 0; k < 9; k++) {
          let cell = createRandomNum();
          if (isValid(board, i, j, cell)) {
            board[i][j].value = cell;
            if (generateBoard(board)) {
              return board;
            } else {
              board[i][j].value = 0;
            }
          }
        }
        return false;
      }
    }
  }
  return true;
};

export const createFunctionalBoard = (difficulty) => {
  const createNewEmptyBoard = createEmptyBoard();
  const puzzleBoardLayout = [generateBoard(createNewEmptyBoard)];
  const boardClone = JSON.parse(JSON.stringify(puzzleBoardLayout[0]));
  for (let i = 0; i < difficulty; i++) {
    let x = Math.floor(Math.random() * 9);
    let y = Math.floor(Math.random() * 9);
    boardClone[x][y].value = null;
    boardClone[x][y].isEditable = true;
  }
  puzzleBoardLayout.push(boardClone);
  return puzzleBoardLayout;
};

export const checkInput = (input, gameBoard, rowIndex, cellIndex) => {
  for (let i = 0; i < 9; i++) {
    const k = 3 * Math.floor(rowIndex / 3) + Math.floor(i / 3);
    const l = 3 * Math.floor(cellIndex / 3) + (i % 3);
    if (
      gameBoard[rowIndex][i].value === input ||
      gameBoard[i][cellIndex].value === input ||
      gameBoard[k][l].value === input
    ) {
      return false;
    }
  }
  return true;
};

export const isBoardComplete = (board) => {
  let counter = 81;
  board.map((row) => {
    row.map((cell) => {
      if (cell.value !== null) {
        counter--;
      }
    });
  });
  if (counter >= 1) {
    return false;
  }
  console.log(counter);
  console.log('YOU WON THE GAME');
  return true;
};

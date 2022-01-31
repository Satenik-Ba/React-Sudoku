class Cell {
  constructor(value, isEditable) {
    this.value = value;
    this.isEditable = isEditable;
  }
}

export class Board {
  constructor(difficulty) {
    this.difficulty = difficulty; 
    this.cells = this.generateBoard2();
    this.gameBoard = this.removeCells(this.cells, this.difficulty);
    this.gameBoardCopy = JSON.parse(JSON.stringify(this.gameBoard))
    this.solvedGame = this.solverFunction(this.gameBoardCopy);
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
    return board;
  }

  generateSet() {
    return new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }

  generateArrOfSets() {
    let a = [];
    for (let i = 0; i < 9; i++) {
      a.push(this.generateSet());
    }
    return a;
  }

  generateBoard2() {
    let board = this.createEmptyBoard();
    let rowsConstraints = this.generateArrOfSets();
    let colsConstraints = this.generateArrOfSets();
    let squaresConstraints = this.generateArrOfSets();
    this.generateBoardHelper(
      board,
      rowsConstraints,
      colsConstraints,
      squaresConstraints,
      0,
      0
    );
    return board;
  }

  calculateSquareIndex(i, j) {
    return 3 * Math.floor(j / 3) + Math.floor(i / 3);
  }
  generateBoardHelper(
    board,
    rowsConstraints,
    colsConstraints,
    squaresConstraints,
    i,
    j
  ) {
    const squareIndex = this.calculateSquareIndex(i, j);

    const set = this.intersection(
      rowsConstraints[i],
      colsConstraints[j],
      squaresConstraints[squareIndex]
    );

    while (set.size !== 0) {
      const value = this.randomNumberFromSet(set);
      set.delete(value);
      rowsConstraints[i].delete(value);
      colsConstraints[j].delete(value);
      squaresConstraints[squareIndex].delete(value);

      board[i][j].value = value;

      if (i === 8 && j === 8) {
        return true;
      }
      let nextI, nextJ;
      if (j === 8) {
        nextI = i + 1;
        nextJ = 0;
      } else {
        nextI = i;
        nextJ = j + 1;
      }
      const success = this.generateBoardHelper(
        board,
        rowsConstraints,
        colsConstraints,
        squaresConstraints,
        nextI,
        nextJ
      );
      if (success) {
        return true;
      }
      rowsConstraints[i].add(value);
      colsConstraints[j].add(value);
      squaresConstraints[squareIndex].add(value);
    }
    return false;
  }
  intersection(a, b, c) {
    const intersect1 = new Set([...a].filter((x) => b.has(x)));
    return new Set([...intersect1].filter((x) => c.has(x)));
  }

  randomNumberFromSet(set) {
    let arr = [...set];
    let index = this.createRandomNum(arr.length);
    return arr[index];
  }

  isValid(board, row, col, cell) {
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
  }

  solveSudoku(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j].value === null) {
          for (let k = 1; k <= 9; k++) {
            if (this.isValid(board, i, j, k)) {
              return true;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  solverFunction(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j].value === null) {
          for (let k = 1; k <= 9; k++) {
            if (this.isValid(board, i, j, k)) {
              board[i][j].value = k;
              if (this.solverFunction(board)) {
                return board;
              }
              board[i][j].value = null;
            }
          }
          return false;
        }
      }
    }
   
    return true;
  }

  removeCells(board, difficulty) {
    const boardClone = JSON.parse(JSON.stringify(board));
    let x = Math.floor(Math.random() * 9);
    let y = Math.floor(Math.random() * 9);
    boardClone[x][y].value = null;
    boardClone[x][y].isEditable = true;
    for (let i = 0; i < difficulty; i++) {
      if (this.solveSudoku(boardClone)) {
        let x = Math.floor(Math.random() * 9);
        let y = Math.floor(Math.random() * 9);
        boardClone[x][y].value = null;
        boardClone[x][y].isEditable = true;
      }
    }
    return boardClone;
  }
}

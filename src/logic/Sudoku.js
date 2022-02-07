class Cell {
  constructor(value, isEditable) {
    this.value = value;
    this.isEditable = isEditable;
    this.userValue = null;
  }
}

export class Board {
  constructor() {
    this.cells = this.generateBoard2();
    const boardCopy = JSON.parse(JSON.stringify(this.cells));
    this.gameBoard = this.solve(boardCopy);
    this.result = this.solveHelper(this.gameBoard);

    this.checkSolution = this.hasSolution(this.result);

    // this.gameBoardCopy = JSON.parse(JSON.stringify(this.gameBoard));
    // this.solvedGame = this.solverFunction(this.gameBoardCopy);
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

  solveHelper(board) {
    let boardCopy = [];
    for (let i = 0; i < 9; i++) {
      let row = [];
      for (let j = 0; j < 9; j++) {
        let colSet = this.generateSet();
        let square = this.generateSet();
        let rowSet = this.generateSet();
        if (board[i][j].value !== null) {
          row.push({ isValidated: true, set: new Set([board[i][j].value]) });
        } else {
          for (let k = 0; k < 9; k++) {
            const m = 3 * Math.floor(i / 3) + Math.floor(k / 3);
            const n = 3 * Math.floor(j / 3) + (k % 3);
            rowSet.delete(board[i][k].value);
            colSet.delete(board[k][j].value);
            square.delete(board[m][n].value);
          }
          const set = this.intersection(rowSet, colSet, square);
          row.push({ isValidated: false, set });
        }
      }
      boardCopy.push(row);
    }

    console.log(boardCopy);
    return boardCopy;
  }

  hasSolution(boardCopy) {
    let hasChanged = true;
    while (hasChanged) {
      hasChanged = false;
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (!boardCopy[i][j].isValidated && boardCopy[i][j].set.size === 1) {
            boardCopy[i][j].isValidated = true;
            hasChanged = true;
            const item = [...boardCopy[i][j].set][0];
            for (let k = 0; k < 9; k++) {
              const m = 3 * Math.floor(i / 3) + Math.floor(k / 3);
              const n = 3 * Math.floor(j / 3) + (k % 3);
              if(boardCopy[i][k].set.size > 1){
                boardCopy[i][k].set.delete(item);
              }
              if(boardCopy[k][j].set.size > 1){
                boardCopy[k][j].set.delete(item);
              }
              if(boardCopy[m][n].set.size > 1){
                boardCopy[m][n].set.delete(item);
              }
            }
          }
        }
      }
    }
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!boardCopy[i][j].isValidated) {
          return false;
        }
      }
    }
    return true;
  }

  solve(boardCopy) {
    for (let i = 0; i < 50; i++) {
      let x = Math.floor(Math.random() * 9);
      let y = Math.floor(Math.random() * 9);
      boardCopy[x][y].value = null;
      boardCopy[x][y].isEditable = true;
    }
    return boardCopy;
  }

  isValid(board, row, col, cell) {
    this.solve();
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

  // solveSudoku(board) {
  //   for (let i = 0; i < 9; i++) {
  //     for (let j = 0; j < 9; j++) {
  //       if (board[i][j].value === null) {
  //         for (let k = 1; k <= 9; k++) {
  //           if (this.isValid(board, i, j, k)) {
  //             return true;
  //           }
  //         }
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // }

  // solverFunction(board) {
  //   for (let i = 0; i < 9; i++) {
  //     for (let j = 0; j < 9; j++) {
  //       if (board[i][j].value === null) {
  //         for (let k = 1; k <= 9; k++) {
  //           if (this.isValid(board, i, j, k)) {
  //             board[i][j].value = k;
  //             if (this.solverFunction(board)) {
  //               return board;
  //             }
  //             board[i][j].value = null;
  //           }
  //         }
  //         return false;
  //       }
  //     }
  //   }

  //   return true;
  // }

  // removeCells(board, difficulty) {
  //   const boardClone = JSON.parse(JSON.stringify(board));
  //   let x = Math.floor(Math.random() * 9);
  //   let y = Math.floor(Math.random() * 9);
  //   boardClone[x][y].value = null;
  //   boardClone[x][y].isEditable = true;
  //   for (let i = 0; i < 2; i++) {
  //     if (this.solveSudoku(boardClone)) {
  //       let x = Math.floor(Math.random() * 9);
  //       let y = Math.floor(Math.random() * 9);
  //       boardClone[x][y].value = null;
  //       boardClone[x][y].isEditable = true;
  //     }
  //   }
  //   return boardClone;
  // }
}

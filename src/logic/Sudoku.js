class Cell {
  constructor(value, isEditable) {
    this.value = value;
    this.isEditable = isEditable;
    this.userValue = null;
  }
}

export class Board {
  constructor() {
    this.board = this.generateBoard2();
    const boardCopy = JSON.parse(JSON.stringify(this.board));
    this.gameBoard = this.createPuzzleBoard(boardCopy);

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
              if (boardCopy[i][k].set.size > 1) {
                boardCopy[i][k].set.delete(item);
              }
              if (boardCopy[k][j].set.size > 1) {
                boardCopy[k][j].set.delete(item);
              }
              if (boardCopy[m][n].set.size > 1) {
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
    console.log(boardCopy, 'BOARD COPY')
    return true;
  }

  createPuzzleBoard(boardCopy) {
    for (let i = 0; i < 60; i++) {
      let x = this.createRandomNum(9);
      let y = this.createRandomNum(9);
      boardCopy[x][y].value = null;
      boardCopy[x][y].isEditable = true;
      console.log('HAS A SOLUTION');
      // if (this.solveHelper(boardCopy)) {

      // } else {
      //   console.log('DOESNT HAVE A SOLUTION')
      //   continue;
      // }
    }
    return boardCopy;
  }
}

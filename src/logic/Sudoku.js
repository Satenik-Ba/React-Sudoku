class Cell {
  constructor(value, isEditable, isValidInput) {
    this.value = value;
    this.isEditable = isEditable;
    this.isValidInput = isValidInput;
    this.userSelection = null;
  }
}

// change the Board Class into a function

export function createBoard (difficulty) {
  return createPuzzleBoard(difficulty)
}

// export class Board {
//   constructor(difficulty) {
//     this.gameBoard = this.createPuzzleBoard(difficulty);
//   }

  function createRandomNum(max) {
    return Math.floor(Math.random() * max);
  }

  function createEmptyBoard() {
    let board = [];
    for (let i = 0; i < 9; i++) {
      let row = [];
      for (let j = 0; j < 9; j++) {
        row.push(new Cell(null, false, true));
      }
      board.push(row);
    }
    return board;
  }

  function generateSet() {
    return new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }

 function generateArrOfSets() {
    let a = [];
    for (let i = 0; i < 9; i++) {
      a.push(generateSet());
    }
    return a;
  }

  function generateBoard() {
    let board = createEmptyBoard();
    let rowsConstraints = generateArrOfSets();
    let colsConstraints = generateArrOfSets();
    let squaresConstraints = generateArrOfSets();
    generateBoardHelper(
      board,
      rowsConstraints,
      colsConstraints,
      squaresConstraints,
      0,
      0
    );
    return board;
  }

  function calculateSquareIndex(i, j) {
    return 3 * Math.floor(j / 3) + Math.floor(i / 3);
  }
  function generateBoardHelper(
    board,
    rowsConstraints,
    colsConstraints,
    squaresConstraints,
    i,
    j
  ) {
    const squareIndex = calculateSquareIndex(i, j);

    const set = intersection(
      rowsConstraints[i],
      colsConstraints[j],
      squaresConstraints[squareIndex]
    );

    while (set.size !== 0) {
      const value = randomNumberFromSet(set);
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
      const success = generateBoardHelper(
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
  function intersection(a, b, c) {
    const intersect1 = new Set([...a].filter((x) => b.has(x)));
    return new Set([...intersect1].filter((x) => c.has(x)));
  }

  function randomNumberFromSet(set) {
    let arr = [...set];
    let index = createRandomNum(arr.length);
    return arr[index];
  }
  function returnCoordinates(i, j, k) {
    const m = 3 * Math.floor(i / 3) + Math.floor(k / 3);
    const n = 3 * Math.floor(j / 3) + (k % 3);
    return [m, n];
  }
  function solveHelper(board) {
    let boardCopy = [];
    for (let i = 0; i < 9; i++) {
      let row = [];
      for (let j = 0; j < 9; j++) {
        let colSet = generateSet();
        let square = generateSet();
        let rowSet = generateSet();
        if (board[i][j].value !== null) {
          row.push({ isValidated: true, set: new Set([board[i][j].value]) });
        } else {
          for (let k = 0; k < 9; k++) {
            const [m, n] = returnCoordinates(i, j, k);
            rowSet.delete(board[i][k].value);
            colSet.delete(board[k][j].value);
            square.delete(board[m][n].value);
          }
          const set = intersection(rowSet, colSet, square);
          row.push({ isValidated: false, set });
        }
      }
      boardCopy.push(row);
    }
    return boardCopy;
  }

  function hasSolution(boardCopy) {
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
              const [m, n] = returnCoordinates(i, j, k);
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
    return true;
  }

  function createPuzzleBoard(difficulty) {
    const completedBoard = generateBoard();
    const boardCopy = JSON.parse(JSON.stringify(completedBoard));
    const result = solveHelper(boardCopy);
    for (let i = 0; i < difficulty; i++) {
      let x = createRandomNum(9);
      let y = createRandomNum(9);
      let item = boardCopy[x][y].value;
      if (hasSolution(result)) {
        boardCopy[x][y].userSelection = null;
        boardCopy[x][y].isEditable = true;
        boardCopy[x][y].isValidInput = null;
      } else {
        boardCopy[x][y].value = item;
        continue;
      }
    }
    return boardCopy;
  }


export const isUserSelectionCorrect = (selectedCell) => {
  return selectedCell.value === selectedCell.userSelection
};

export const isBoardComplete = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!board[i][j].isValidInput) {
        return false;
      }
    }
  }
  return true;
};

export const checkDisplayValue = (cell, solved) => {
  if (solved) {
    return 'valid';
  }
  if (cell.isValidInput === false) {
    return 'invalid';
  }
  return 'valid';
};

export const calculateDisplayValue = ( cell, solved) => {
  if (solved || !cell.isEditable) {
    return cell.value;
  }
  if (cell.userSelection === null) {
    return '';
  }
  // if (input === '') {
  //   return '';
  // }

    return cell.userSelection;

  // return '';
};

// one line function discription
// small and consice function

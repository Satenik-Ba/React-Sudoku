class Cell {
  constructor(value, isEditable) {
    this.value = value;
    this.isEditable = isEditable;
  }
}

export class Board {
  constructor() {
    this.cells = this.generateBoard2();
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
    return Math.floor(i / 3) + 3 * (j % 3);
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
  
      console.log(i, j, squareIndex)
    while (set.size !== 0) {
      const value = this.randomNumberFromSet(set);
      set.delete(value);

      console.log(i, j, squareIndex)

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
}


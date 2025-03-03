class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return {result: false, error: 'Expected puzzle to be 81 characters long'};
    }

    const testRegex = /^[1-9.]+$/;

    if (!testRegex.test(puzzleString)) {
      return {result: false, error: 'Invalid characters in puzzle'};
    }

    return {result: true};
  }

  checkCoordinate(puzzleString, coordinate, value) {
    let [row, column] = coordinate.split('');
    column = parseInt(column);
    const conflict = [];

    if (!this.checkRowPlacement(puzzleString, row, column, value)) {
      conflict.push('row');
    }
    
    if (!this.checkColPlacement(puzzleString, row, column, value)) {
      conflict.push('column');
    }
    
    if (!this.checkRegionPlacement(puzzleString, row, column, value)) {
      conflict.push('region');
    }

    if (conflict.length > 0) {
      return {valid: false, conflict};
    }

    return {valid: true};
  }
  
  checkRowPlacement(puzzleString, row, column, value) {
    const rows = ['A','B','C','D','E','F','G','H','I'];
    const startingIndex = rows.indexOf(row.toUpperCase()) * 9;

    for (let index = startingIndex; index < startingIndex + 9; ++index) {
      if (puzzleString[index] == value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    const startingIndex = column - 1;
    for (let index = startingIndex; index < puzzleString.length; index += 9) {
      if (puzzleString[index] == value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // hard-coded regions by index - ughhhhh, let's see if this is fast enough
    const regions = [
      [0, 1, 2, 9, 10, 11, 18, 19, 20],
      [3, 4, 5, 12, 13, 14, 21, 22, 23],
      [6, 7, 8, 15, 16, 17, 24, 25, 26],
      [27, 28, 29, 36, 37, 38, 45, 46, 47],
      [30, 31, 32, 39, 40, 41, 48, 49, 50],
      [33, 34, 35, 42, 43, 44, 51, 52, 53],
      [54, 55, 56, 63, 64, 65, 72, 73, 74],
      [57, 58, 59, 66, 67, 68, 75, 76, 77],
      [60, 61, 62, 69, 70, 71, 78, 79, 80],
    ];

    const rows = ['A','B','C','D','E','F','G','H','I'];
    const startingIndex = rows.indexOf(row.toUpperCase()) * 9;
    const indexOfCoord = startingIndex + column - 1;

    for (const region of regions) {
      if (region.includes(indexOfCoord)) {
        for (const index of region) {
          if (puzzleString[index] == value) {
            return false;
          }
        }
        return true;
      }
    }
  }

  checkPlacementByIndex(puzzleString, index, value) {
    const rows = ['A','B','C','D','E','F','G','H','I'];
    let row = rows[Math.floor(index/9)];
    let column = parseInt(column);
    column = (index % 9) + 1;

    return this.checkRowPlacement(puzzleString, row, column, value) &&
           this.checkColPlacement(puzzleString, row, column, value) &&
           this.checkRegionPlacement(puzzleString, row, column, value);
  }

  solve(puzzleString) {
    let solution = puzzleString.split('');
    let indexArray = [];
    let currentIndex = 0;

    while (currentIndex < solution.length) {
      if (solution[currentIndex] === '.') {
        indexArray.push(currentIndex);

        let value;
        for (value = 1; value <= 9; ++value) {
          if (this.checkPlacementByIndex(solution, currentIndex, value)) {
            solution[currentIndex] = value;
            break;
          }
          
          if (value === 9) {
            do {
              solution[currentIndex] = '.';
              indexArray.pop();
              currentIndex = indexArray[indexArray.length - 1];
              value = parseInt(solution[currentIndex]);
            }
            while (solution[currentIndex] == 9);
            solution[currentIndex] = '.';
          }
        }

        if (value > 9) {
          break;
        }
      }
      else {
        ++currentIndex;
      }
    }

    for (let index = 0; index < solution.length; ++index) {
      let tempSolution = [...solution];
      tempSolution[index] = '.';
      if (!this.checkPlacementByIndex(tempSolution, index, solution[index])) {
        return {error: 'Puzzle cannot be solved'};
      }
    }
    
    return {solution: solution.join('')};
  }
}

module.exports = SudokuSolver;
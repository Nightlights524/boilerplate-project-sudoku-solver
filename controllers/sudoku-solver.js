class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return false;
    }

    const testRegex = /^[1-9.]+$/;

    return testRegex.test(puzzleString);
  }
  
  // ROWS ARE A-I, COLUMNS are 1-9
  checkRowPlacement(puzzleString, row, column, value) {
    const rows = ['A','B','C','D','E','F','G','H','I'];
    const startingIndex = rows.indexOf(row.toUpperCase()) * 9;

    for (let index = startingIndex; index < startingIndex + 9; ++index) {
      if (puzzleString[index] === value) {
        return false;
      }
    }
    return true;
  }

  // checkRowPlacement2(puzzleString, row, column, value) {
  //   for (let i = 0; i < 9; i++) {
  //     if (puzzleString[column*9+i] == value) {
  //         return false;
  //     }
  //   }
  //   return true;
  // }

  checkColPlacement(puzzleString, row, column, value) {
    const startingIndex = column - 1;
    for (let index = startingIndex; index < puzzleString.length; index += 9) {
      if (puzzleString[index] === value) {
        return false;
      }
    }
    return true;
  }

  // checkColPlacement2(puzzleString, row, column, value) {
  //   for (let i = 0; i < 9; i++) {
  //     if (puzzleString[i*9+row] == value) {
  //         return false;
  //     }
  //   }
  //   return true;
  // }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;


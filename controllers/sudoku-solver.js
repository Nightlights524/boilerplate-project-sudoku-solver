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
    for (const char of puzzleString) {

    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    for (let index = 0; index < puzzleString.length; ++index) {
      if ( (puzzleString[index] % 9) + 1 === column ) {
        if (puzzleString[index] === value) {
          return false;
        }
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;


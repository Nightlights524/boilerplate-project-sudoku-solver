const chai = require('chai');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver();

suite('UnitTests', () => {

  test('Logic handles a valid puzzle string of 81 characters', done => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const {result} = solver.validate(puzzleString);
    assert.isTrue(result);
    done();
  });
  
  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', done => {
    const puzzleString = '..9..5.1.85.4....2432..-...1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const {result, error} = solver.validate(puzzleString);
    assert.isFalse(result);
    assert.equal(error, 'Invalid characters in puzzle');
    done();
  });
  
  test('Logic handles a puzzle string that is not 81 characters in length', done => {
    const puzzleString = '1234';
    const {result, error} = solver.validate(puzzleString);
    assert.isFalse(result);
    assert.equal(error, 'Expected puzzle to be 81 characters long');
    done();
  });
  
  test('Logic handles a valid row placement', done => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isTrue(solver.checkRowPlacement(puzzleString, 'A', 1, 7));
    done();
  });

  test('Logic handles an invalid row placement', done => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isFalse(solver.checkRowPlacement(puzzleString, 'A', 1, 5));
    done();
  });

  test('Logic handles a valid column placement', done => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isTrue(solver.checkColPlacement(puzzleString, 'A', 1, 7));
    done();
  });

  test('Logic handles an invalid column placement', done => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isFalse(solver.checkColPlacement(puzzleString, 'A', 1, 5));
    done();
  });

  test('Logic handles a valid region (3x3 grid) placement', done => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isTrue(solver.checkRegionPlacement(puzzleString, 'C', 7, 5));
    // assert.isTrue(solver.checkRegionPlacement(puzzleString, 'A', 1, 7));
    done();
  });

  test('Logic handles an invalid region (3x3 grid) placement', done => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.isFalse(solver.checkRegionPlacement(puzzleString, 'A', 1, 5));
    done();
  });
  
  // test('Valid puzzle strings pass the solver', done => {
  //   // done();
  // });
    
  // test('Invalid puzzle strings fail the solver', done => {
  //   assert.deepEqual(solver.solve(puzzleString), {error: 'Puzzle cannot be solved'});
  //   done();
  // });
      
  test('Solver returns the expected solution for an incomplete puzzle', done => {
    const puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const solution = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
    assert.deepEqual(solver.solve(puzzleString), {solution});
    done();
  });

});
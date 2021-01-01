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
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    let solution = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
    assert.deepEqual(solver.solve(puzzleString), {solution});
    
    puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    solution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
    assert.deepEqual(solver.solve(puzzleString), {solution});
    
    puzzleString = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
    solution = '568913724342687519197254386685479231219538467734162895926345178473891652851726943';
    assert.deepEqual(solver.solve(puzzleString), {solution});
    
    puzzleString = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';
    solution = '218396745753284196496157832531672984649831257827549613962415378185763429374928561';
    assert.deepEqual(solver.solve(puzzleString), {solution});
    
    puzzleString = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
    solution = '473891265851726394926345817568913472342687951197254638734162589685479123219538746';
    assert.deepEqual(solver.solve(puzzleString), {solution});
    
    puzzleString = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
    solution = '827549163531672894649831527496157382218396475753284916962415738185763249374928651';
    assert.deepEqual(solver.solve(puzzleString), {solution});
    done();
  });

});
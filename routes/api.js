'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const {puzzle, coordinate, value} = req.body;

      console.log(solver.checkCoordinate(puzzle, coordinate, value));

      return res.json(solver.checkCoordinate(puzzle, coordinate, value));
    });
    
  app.route('/api/solve')
    .post((req, res) => {

    });
};

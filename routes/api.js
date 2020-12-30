'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      console.log('CHECK endpoint hit');

      const {puzzle, coordinate, value} = req.body;

      if (puzzle === undefined || 
          puzzle === '' ||
          coordinate === undefined ||
          coordinate === '' ||
          value === undefined ||
          value === '') {
        return res.json({error: 'Required field(s) missing'});
      }

      const {result, error} = solver.validate(puzzle);

      if (error === 'Expected puzzle to be 81 characters long') {
        return res.json({error});
      }

      if (error === 'Invalid characters in puzzle') {
        return res.json({error});
      }

      return res.json(solver.checkCoordinate(puzzle, coordinate, value));
    });
    
  app.route('/api/solve')
    .post((req, res) => {

    });
};

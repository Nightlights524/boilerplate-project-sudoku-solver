'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const {puzzle, coordinate, value} = req.body;
      const {error} = solver.validate(puzzle);

      if (puzzle === undefined || 
          puzzle === '' ||
          coordinate === undefined ||
          coordinate === '' ||
          value === undefined ||
          value === '') {
        return res.json({error: 'Required field(s) missing'});
      }

      if (!/^[1-9]$/.test(value)) { 
        return res.json({error: 'Invalid value'});
      }

      if (!/^[a-hA-H][1-9]$/.test(coordinate)) { 
        return res.json({error: 'Invalid coordinate'});
      }

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
      const {puzzle} = req.body;
      const {error} = solver.validate(puzzle);

      if (!Object.prototype.hasOwnProperty.call(req.body, 'puzzle')) {
        return res.json({error: 'Required field missing'});
      }

      // if (puzzle === undefined || 
      //     puzzle === '') {
      //   return res.json({error: 'Required field missing'});
      // }

      if (error != null) {
        return res.json({error});
      }

      // if (!Object.prototype.hasOwnProperty.call(puzzleValidator, 'error')) {
      //   return res.json({error: puzzleValidator.error});
      // }

      // if (error === 'Expected puzzle to be 81 characters long' ||
      //     error === 'Invalid characters in puzzle) {
      //   return res.json({error});
      // }
    });
};

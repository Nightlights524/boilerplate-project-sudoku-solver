'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      console.log('CHECK endpoint hit');

      const {puzzle, coordinate, value} = req.body;
      const {result, error} = solver.validate(puzzle);

      if (puzzle === undefined || 
          puzzle === '' ||
          coordinate === undefined ||
          coordinate === '' ||
          value === undefined ||
          value === '') {
        return res.json({error: 'Required field(s) missing'});
      }

      if (value < 1 || value > 9) {
        return res.json({error: 'Invalid value'});
      }

      console.log(coordinate[0]);
      console.log(coordinate[1]);
      console.log(parseInt(coordinate[1]));

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

    });
};

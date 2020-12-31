'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if (!Object.prototype.hasOwnProperty.call(req.body, 'puzzle') ||
          !Object.prototype.hasOwnProperty.call(req.body, 'coordinate') ||
          !Object.prototype.hasOwnProperty.call(req.body, 'value')) {
          return res.json({error: 'Required field(s) missing'});
      }

      const {puzzle, coordinate, value} = req.body;
      const {error} = solver.validate(puzzle);

      if (!/^[1-9]$/.test(value)) { 
        return res.json({error: 'Invalid value'});
      }

      if (!/^[a-hA-H][1-9]$/.test(coordinate)) { 
        return res.json({error: 'Invalid coordinate'});
      }

      if (error != null) {
        return res.json({error});
      }

      return res.json(solver.checkCoordinate(puzzle, coordinate, value));
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if (!Object.prototype.hasOwnProperty.call(req.body, 'puzzle')) {
        return res.json({error: 'Required field missing'});
      }

      const {puzzle} = req.body;
      const {error} = solver.validate(puzzle);

      if (error != null) {
        return res.json({error});
      }

      return res.json(solver.solve(puzzle));
    });
};
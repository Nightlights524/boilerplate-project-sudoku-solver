const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {

  test('Logic handles a valid puzzle string of 81 characters', done => {
    done();
  });

  // test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', done => {
  //   // done();
  // });

  // test('Logic handles a puzzle string that is not 81 characters in length', done => {
  //   // done();
  // });

  // test('Logic handles a valid row placement', done => {
  //   // done();
  // });

  // test('Logic handles an invalid row placement', done => {
  //   // done();
  // });

  // test('Logic handles a valid column placement', done => {
  //   // done();
  // });

  // test('Logic handles an invalid column placement', done => {
  //   // done();
  // });

  // test('Logic handles a valid region (3x3 grid) placement', done => {
  //   // done();
  // });

  // test('Logic handles an invalid region (3x3 grid) placement', done => {
  //   // done();
  // });

  // test('Valid puzzle strings pass the solver', done => {
  //   // done();
  // });

  // test('Invalid puzzle strings fail the solver', done => {
  //   // done();
  // });

  // test('Solver returns the the expected solution for an incomplete puzzle', done => {
  //   // done();
  // });

});

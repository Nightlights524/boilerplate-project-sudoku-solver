const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  test('Solve a puzzle with valid puzzle string', done => {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const solution = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
    chai.request(server)
      .post('/api/solve')
      .send({puzzle})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {solution});
        done();
      });
    });
    
  test('Solve a puzzle with missing puzzle string', done => {
    chai.request(server)
    .post('/api/solve')
    .send({})
    .end((err, res) => {
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, {error: 'Required field missing'});
      done();
    });
  });
  
  test('Solve a puzzle with invalid characters', done => {
    const puzzle = '..-..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    chai.request(server)
    .post('/api/solve')
    .send({puzzle})
    .end((err, res) => {
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, {error: 'Invalid characters in puzzle'});
      done();
    });
  });
  
  test('Solve a puzzle with incorrect length', done => {
    const puzzle = '..6.62.71...9......1945....4.37.4.3..6..';
    chai.request(server)
    .post('/api/solve')
    .send({puzzle})
    .end((err, res) => {
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, {error: 'Expected puzzle to be 81 characters long'});
      done();
    });
  });

  test('Solve a puzzle that cannot be solved', done => {
    const puzzle = '999..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    chai.request(server)
      .post('/api/solve')
      .send({puzzle})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {error: 'Puzzle cannot be solved'});
        done();
      });
  });

  test('Check a puzzle placement with all fields', done => {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle,
        coordinate: 'A1',
        value: 7
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {valid: true});
        done();
      });
  });

  test('Check a puzzle placement with single placement conflict', done => {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle,
        coordinate: 'A1',
        value: 2
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {"valid": false, "conflict": [ "region" ]});
        done();
      });
  });

  test('Check a puzzle placement with multiple placement conflicts', done => {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle,
        coordinate: 'A1',
        value: 1
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {"valid": false, "conflict": [ "row", "column" ]});
        done();
      });
  });

  test('Check a puzzle placement with all placement conflicts', done => {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle,
        coordinate: 'A1',
        value: 5
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {"valid": false, "conflict": [ "row", "column", "region" ]});
        done();
      });
  });

  test('Check a puzzle placement with missing required fields', done => {
    chai.request(server)
      .post('/api/check')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {error: 'Required field(s) missing'});
        done();
      });
  });

  test('Check a puzzle placement with invalid characters', done => {
    const puzzle = '..-..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle,
        coordinate: 'A1',
        value: 5
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {error: 'Invalid characters in puzzle'});
        done();
      });
  });

  test('Check a puzzle placement with incorrect length', done => {
    const puzzle = '9.....6.62.71...9......1945....4.37.4.3..6..';
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle,
        coordinate: 'A1',
        value: 5
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {error: 'Expected puzzle to be 81 characters long'});
        done();
      });
  });

  test('Check a puzzle placement with invalid placement coordinate', done => {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle,
        coordinate: 'Z1',
        value: 5
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {error: 'Invalid coordinate'});
        done();
      });
  });

  test('Check a puzzle placement with invalid placement value', done => {
    const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle,
        coordinate: 'A1',
        value: 24
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {error: 'Invalid value'});
        done();
      });
  });

});


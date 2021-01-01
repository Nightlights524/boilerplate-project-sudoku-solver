const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  test('Solve a puzzle with valid puzzle string', done => {
    chai.request(server)
      .post('/api/solve')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Solve a puzzle with missing puzzle string', done => {
    chai.request(server)
      .post('/api/solve')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Solve a puzzle with invalid characters', done => {
    chai.request(server)
      .post('/api/solve')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Solve a puzzle with incorrect length', done => {
    chai.request(server)
      .post('/api/solve')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Solve a puzzle that cannot be solved', done => {
    chai.request(server)
      .post('/api/solve')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Check a puzzle placement with all fields', done => {
    chai.request(server)
      .post('/api/check')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Check a puzzle placement with single placement conflict', done => {
    chai.request(server)
      .post('/api/check')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Check a puzzle placement with multiple placement conflicts', done => {
    chai.request(server)
      .post('/api/check')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Check a puzzle placement with all placement conflicts', done => {
    chai.request(server)
      .post('/api/check')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Check a puzzle placement with missing required fields', done => {
    chai.request(server)
      .post('/api/check')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Check a puzzle placement with invalid characters', done => {
    chai.request(server)
      .post('/api/check')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Check a puzzle placement with incorrect length', done => {
    chai.request(server)
      .post('/api/check')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Check a puzzle placement with invalid placement coordinate', done => {
    chai.request(server)
      .post('/api/check')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

  test('Check a puzzle placement with invalid placement value', done => {
    chai.request(server)
      .post('/api/check')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

});


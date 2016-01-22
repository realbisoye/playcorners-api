'use strict';

process.env.NODE_ENV = 'test';

var request = require('supertest');
var app = require('../server');

describe('server test', function() {

  it('should respond on connection', function() {

    request(app)
    .get('api/vi/events')
    .end(function(err, response) {
    expect(response.status).toEqual(200);
      if (err) {
        console.log(err);
      }
      });
    });
});

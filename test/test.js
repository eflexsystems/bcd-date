'use strict';

var assert  = require('assert');
var moment  = require('moment');
var subject = require('../index');

describe("bcd-date", function() {

  it("should translate a bcd-date buffer into a normal date", function() {

    var expected = moment('2010-12-23 11:30:30.123').toDate();
    var bytes    = new Buffer('1012231130301235', 'hex');
    var result   = subject(bytes);

    assert.deepEqual(result, expected);
  });

  it("should handle midnight properly", function() {

    var expected = moment('2010-01-01 00:00:00.123').toDate();
    var bytes    = new Buffer('1001010000001235', 'hex');
    var result   = subject(bytes);

    assert.deepEqual(result, expected);
  });

});


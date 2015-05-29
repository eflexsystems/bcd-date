'use strict';

var assert  = require('assert');
var moment  = require('moment');
var subject = require('../index');

describe("bcd-date", function() {

  describe("decode", function() {

    it("should decode a bcd-date buffer into a normal date", function() {
      var expected = moment('2010-12-23 11:30:30.123').toDate();
      var bytes    = new Buffer('1012231130301234', 'hex');
      var result   = subject.decode(bytes);

      assert.deepEqual(result, expected);
    });

    it("should handle midnight properly", function() {
      var expected = moment('2010-01-01 00:00:00.123').toDate();
      var bytes    = new Buffer('1001010000001234', 'hex');
      var result   = subject.decode(bytes);

      assert.deepEqual(result, expected);
    });

    it("should allow using utc mode", function() {
      var expected = moment.utc('2010-01-01 00:00:00.123').toDate();
      var bytes    = new Buffer('1001010000001234', 'hex');
      var result   = subject.decode(bytes, true);

      assert.deepEqual(result, expected);
    })
  });

  describe("encode", function() {
    it("should encode a date into a bcd-date buffer", function() {
      var encodedDate = moment('2010-12-23 11:30:30.123').toDate();
      var expected    = new Buffer('1012231130301234', 'hex');
      var result      = subject.encode(encodedDate);

      assert.deepEqual(result, expected);
    });

    it("should allow using utc mode", function() {
      var encodedDate = moment.utc('2010-12-23 11:30:30.123').toDate();
      var expected    = new Buffer('1012231130301234', 'hex');
      var result      = subject.encode(encodedDate, true);

      assert.deepEqual(result, expected);
    });
  });
});


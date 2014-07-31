'use strict';

var bcd    = require('bcd');
var moment = require('moment');

function _getMillisecond(bytes) {
    var number           = bcd.decode(bytes);
    var numberString     = number.toString();
    var lastDigitRemoved = numberString.slice(0, numberString.length - 1);

    return parseInt(lastDigitRemoved);
}

function decode(bytes) {
  var date = {
      year:        2000 + bcd.decode(bytes.slice(0, 1)),
      month:       bcd.decode(bytes.slice(1, 2)) - 1,
      day:         bcd.decode(bytes.slice(2, 3)),
      hour:        bcd.decode(bytes.slice(3, 4)),
      minute:      bcd.decode(bytes.slice(4, 5)),
      second:      bcd.decode(bytes.slice(5, 6)),
      millisecond: _getMillisecond(bytes.slice(6, 8))
  };

  return moment(date).toDate();
}

module.exports = decode;

'use strict';

var bcd    = require('bcd');
var moment = require('moment');

function _decodeMillisecond(bytes) {
    var number           = bcd.decode(bytes);
    var numberString     = number.toString();
    var lastDigitRemoved = numberString.slice(0, numberString.length - 1);

    return parseInt(lastDigitRemoved);
}

function _encodeMilliseconds(wrappedDate) {
  var millisecond = wrappedDate.format('SSS');

  var msd = millisecond.slice(0, 2);
  var lsd = millisecond.slice(2, 3) + wrappedDate.weekday();

  return Buffer.concat([bcd.encode(msd), bcd.encode(parseInt(lsd))]);
}

function decode(bytes) {
  var date = {
      year:        2000 + bcd.decode(bytes.slice(0, 1)),
      month:       bcd.decode(bytes.slice(1, 2)) - 1,
      day:         bcd.decode(bytes.slice(2, 3)),
      hour:        bcd.decode(bytes.slice(3, 4)),
      minute:      bcd.decode(bytes.slice(4, 5)),
      second:      bcd.decode(bytes.slice(5, 6)),
      millisecond: _decodeMillisecond(bytes.slice(6, 8))
  };

  return moment(date).toDate();
}

function encode(date) {
  var wrappedDate = moment(date);

  var splitDate = {
    year: wrappedDate.year() - 2000,
    month: wrappedDate.month() + 1,
    day:  wrappedDate.date(),
    hour: wrappedDate.hour(),
    minute: wrappedDate.minute(),
    second: wrappedDate.second(),
  };

  var buffer = new Buffer(0);
  for (var prop in splitDate) {
    var bytes = bcd.encode(splitDate[prop]);
    buffer = Buffer.concat([buffer, bytes]);
  }

  var millisecond = _encodeMilliseconds(wrappedDate);

  buffer = Buffer.concat([buffer, millisecond]);

  return buffer;
}

module.exports.decode = decode;
module.exports.encode = encode;

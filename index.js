'use strict';

var bcd    = require('bcd');
var moment = require('moment');

function _decodeMillisecond(bytes) {
    var number           = bcd.decode(bytes);
    var numberString     = number.toString();
    var lastDigitRemoved = numberString.slice(0, numberString.length - 1);

    return parseInt(lastDigitRemoved);
}

function _encodeMilliseconds(date) {
  var millisecond = date.format('SSS');

  var msd = millisecond.slice(0, 2);
  var lsd = millisecond.slice(2, 3) + date.weekday();

  return Buffer.concat([bcd.encode(msd), bcd.encode(lsd)]);
}

function decode(bytes, useUtc) {
  var date = [
    2000 + bcd.decode(bytes.slice(0, 1)),
    bcd.decode(bytes.slice(1, 2)) - 1,
    bcd.decode(bytes.slice(2, 3)),
    bcd.decode(bytes.slice(3, 4)),
    bcd.decode(bytes.slice(4, 5)),
    bcd.decode(bytes.slice(5, 6)),
    _decodeMillisecond(bytes.slice(6, 8))
  ];

  if (useUtc) {
    return moment.utc(date).toDate();
  } else {
    return moment(date).toDate();
  }
}

function encode(encodedDate, useUtc) {
  var date = null;

  if (useUtc) {
    date = moment.utc(encodedDate);
  } else {
    date = moment(encodedDate);
  }

  var splitDate = [
    bcd.encode(date.year() - 2000),
    bcd.encode(date.month() + 1),
    bcd.encode(date.date()),
    bcd.encode(date.hour()),
    bcd.encode(date.minute()),
    bcd.encode(date.second()),
    _encodeMilliseconds(date)
  ];

  return splitDate.reduce(function(buffer, bytes) {
    return Buffer.concat([buffer, bytes]);
  }, new Buffer(0));
}

module.exports.decode = decode;
module.exports.encode = encode;


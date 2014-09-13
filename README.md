bcd-date
========

[![Build Status](https://travis-ci.org/eflexsystems/bcd-date.svg?branch=master)](https://travis-ci.org/eflexsystems/bcd-date)

Node.js package to decode BCD datetime buffers used by Siemens and Rockwell PLCs into a normal javascript date objects.

The format of the BCD date is as follows


| Byte           | Contents             | Range |
|----------------|----------------------|-------|
| 0              | Year                 | 90-89 |
| 1              | Month                | 1-12  |
| 2              | Day                  | 1-31  |
| 3              | Hour                 | 0-23  |
| 4              | Minute               | 0-59  |
| 5              | Second               | 0-59  |
| 6              | 2 MSD of ms          | 0-99  |
| 7 (1st nibble) | LSD of ms            | 0-9   |
| 7 (2nd nibble) | Day of week (unused) | 1-7   |

example
=======

	var bcdDate = require('bcd-date');

	var buffer = new Buffer('1012231130301235', 'hex');
	
	var date   = bcdDate.decode(buffer);
	var buffer = bcdDate.encode(date);

	// date   == date at 2010-12-23 11:30:30.123
	// buffer == buffer of 1012231130301235


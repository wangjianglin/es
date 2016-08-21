'use strict';

var test = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var i;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < 10)) {
              _context.next = 8;
              break;
            }

            _context.next = 4;
            return sleep(500);

          case 4:
            console.log('i=' + i);

          case 5:
            i++;
            _context.next = 1;
            break;

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function test() {
    return _ref.apply(this, arguments);
  };
}();

// module.exports.test = test;


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var base = require('./base');
module.exports = base;

var http = require('./http');

base.apply(module.exports, http);

function sleep() {
  var ms = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

  return new Promise(function (resolve, reject) {
    return setTimeout(resolve, ms);
  });
}

base.apply(module.exports, { test: test });

//test().then(() => console.log('done'));

//export test;
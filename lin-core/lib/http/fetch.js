'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (url, config) {
    var _this = this;

    if ((0, _base.isObject)(url)) {
        config = (0, _base.extend)(url);
    } else {
        config = (0, _base.extend)(config);
        config.url = url;
    }

    var request = {
        headers: config.headers || {},
        method: config.method
    };

    if (config.contentType) {
        request.headers['Content-Type'] = config.contentType;
    }

    if (config.mode) {
        request.mode = config.mode;
    }

    if (config.method.toLowerCase() == 'post') {
        request.body = config.params;
    }

    return fetch(config.url, request).then(function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(response) {
            var text;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return response.text();

                        case 2:
                            text = _context.sent;
                            return _context.abrupt('return', {
                                text: text,
                                status: response.status,
                                statusText: response.statusText,
                                headers: response.headers
                            });

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }());

    // return new Promise(function(resolve, reject){
    //     // _http(config).then((response)=>{
    //     //     resultFun(response,resolve,reject);
    //     // });
    //     fetch(config.url,{
    //     }).then((res)=>{
    //         console.log(res);
    //         resolve(res);
    //     });
    // });
};

var _base = require('../base/base');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
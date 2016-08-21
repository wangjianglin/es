'use strict';

//处理同步调用问题

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.http = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var http = exports.http = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(url, config) {
        var response, r;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:

                        if ((0, _base.isObject)(url)) {
                            config = (0, _base.extend)(url);
                        } else {
                            config = (0, _base.extend)(config);
                            config.url = url;
                        }
                        _processConfig(config);

                        // var resultFun = function(response,resolve, reject) {
                        //     var r = undefined;
                        //     try {
                        //         r = JSON.parse(response.text);
                        //     } catch (e) {
                        //         console.log(e)
                        //         reject({ code: -4, message: '网络故障' });
                        //         return;
                        //     }

                        //     if (r.code === undefined || r.code === null || r.code < 0) {
                        //         reject(r);
                        //     } else {
                        //         if(r.result && typeof r.result == 'object' && r.warnings){
                        //             r.result.$warnings = r.warnings;
                        //         }
                        //         resolve(r.result);
                        //     }
                        // };

                        // var faultFun = function(request) {
                        //     if (faultFun) {
                        //         faultFun({ code: -4, message: '网络故障', request: request });
                        //     }
                        // }

                        // return new Promise(function(resolve, reject){
                        //     _http(config).then((response)=>{
                        //         resultFun(response,resolve,reject);
                        //     });
                        // });

                        _context.next = 4;
                        return _http(config);

                    case 4:
                        response = _context.sent;
                        r = undefined;
                        _context.prev = 6;

                        r = JSON.parse(response.text);
                        _context.next = 13;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](6);
                        throw { code: -4, message: '网络故障' };

                    case 13:
                        if (!(r.code === undefined || r.code === null || r.code < 0)) {
                            _context.next = 17;
                            break;
                        }

                        throw r;

                    case 17:
                        if (r.result && _typeof(r.result) == 'object' && r.warnings) {
                            r.result.$warnings = r.warnings;
                        }

                    case 18:
                        return _context.abrupt('return', r.result);

                    case 19:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[6, 10]]);
    }));

    return function http(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var _base = require('../base/base');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var _http = undefined;
if (typeof fetch == 'function') {
    _http = require('./fetch').default;
} else {
    _http = require('./ajax').default;
}

var _httpCommUrlValue = "";

function _httpCommUrl(value) {
    if (value.charAt(0) !== '/' && value.toLowerCase().indexOf("http://") != 0 && value.toLowerCase().indexOf("https://") != 0) {
        value = "/" + value;
    }
    if (value.charAt(value.length - 1) == '/' && value.length > 1) {
        _httpCommUrlValue = value.substring(0, value.length - 1);
    } else {
        _httpCommUrlValue = value;
    }
}

var _httpUrl = function _httpUrl(url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    if (url.charAt(0) == "/") {
        return _httpCommUrlValue + url;
    } else {
        return _httpCommUrlValue + "/" + url;
    }
};

var _defaultHeaders = {};
function _addDefaultHeader(header, value) {
    _defaultHeaders[header] = value;
}

var _ajaxParams = function _ajaxParams(config) {

    var params = config.params || {};

    var isupload = false;
    if (typeof params === 'string') {
        params = { params: '' };
    }

    if (config.contentType == 'multipart/form-data') {
        isupload = true;
    } else {
        for (var param in params) {
            if (params[param] && params[param].constructor && params[param].constructor.name == 'File') {
                isupload = true;
                break;
            }
        }
    }

    var httpParams = undefined;
    if (isupload) {
        config.method = 'post';
        config.contentType = 'multipart/form-data';
    }
    if (isupload || config.method.toLowerCase() == "post") {
        httpParams = new FormData();
        for (var param in params) {
            httpParams.append(param, params[param]);
        }
    } else {
        httpParams = '';
        for (var param in params) {
            httpParams += '&' + param + '=' + params[param];
        }
        httpParams = httpParams.substr(1);

        //if (config.method.toLowerCase() !== "post" && !isupload) {
        if (config.url.indexOf('?') != -1) {
            config.url += '&' + httpParams;
        } else {
            config.url += '?' + httpParams;
        }
        //}
    }
    console.log(httpParams);
    config.params = httpParams;
    config.url = _httpUrl(config.url);

    // if (!params[1]) { //文件上传时，不能设置 Content-Type
    //     xmlRequest.setRequestHeader('Content-Type', config.contentType);
    // }
};

var _processConfig = function _processConfig(config) {

    config.method = config.method || 'post';

    _ajaxParams(config);

    var headers = config.headers || {};
    var allHeaders = {};
    for (var header in _defaultHeaders) {
        allHeaders[header] = _defaultHeaders[header];
    }
    for (var header in headers) {
        allHeaders[header] = headers[header];
    }
    config.headers = allHeaders;

    if (config.async === undefined || config.async === null) {
        config.async = true;
    }
};

http.addHeader = _addDefaultHeader;
http.commUrl = _httpCommUrl;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (url, config) {

    return new Promise(function (resolve, reject) {
        if ((0, _base.isObject)(url)) {
            config = (0, _base.extend)(url);
        } else {
            config = (0, _base.extend)(config);
            config.url = url;
        }

        var xmlRequest = undefined;

        if (typeof XMLHttpRequest != 'undefined') {
            xmlRequest = new XMLHttpRequest();
        } else {
            xmlRequest = new ActiveXObject('Microsoft.XMLHTTP');
        }

        config.method = config.method || 'get';
        var params = config.params || {};

        config.contentType = config.contentType || 'application/x-www-form-urlencoded';

        xmlRequest.open(config.method, config.url, config.async, config.bstrUser, config.bstrPassword);
        if (config.async) {
            xmlRequest.timeout = config.timeout === undefined ? 20000 : config.timeout;
        }
        if (typeof params === 'FormData') {
            //文件上传时，不能设置 Content-Type
            xmlRequest.setRequestHeader('Content-Type', config.contentType);
        }

        for (var header in config.headers) {
            xmlRequest.setRequestHeader(header, config.headers[header]);
        }

        if (config.method.toString().toLowerCase() === "post") {
            xmlRequest.send(params);
        } else {
            xmlRequest.send();
        }

        var onreadystatechange = function onreadystatechange() {
            if (xmlRequest.readyState == 3) {
                // progress();
                return;
            }
            if (xmlRequest.readyState != 4) {
                return;
            }
            resolve({
                text: xmlRequest.responseXML || xmlRequest.responseText,
                status: xmlRequest.status,
                statusText: xmlRequest.statusText,
                timeout: xmlRequest.timeout,
                headers: xmlRequest.getAllResponseHeaders()
            });
        };
        if (config.async == true) {
            xmlRequest.onreadystatechange = onreadystatechange;
        } else {
            onreadystatechange();
        }
    });
};

var _base = require('../base');
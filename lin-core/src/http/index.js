'use strict';

//处理同步调用问题

import {apply,isObject,extend} from '../base/base';

var _http = undefined;
if(typeof fetch == 'function'){
    _http = require('./fetch').default;
}else{
    _http = require('./ajax').default;
}

var _httpCommUrlValue = "";

function _httpCommUrl(value) {
    if (value.charAt(0) !== '/'
        && value.toLowerCase().indexOf("http://") != 0
        && value.toLowerCase().indexOf("https://") != 0) {
        value = "/" + value;
    }
    if (value.charAt(value.length - 1) == '/' && value.length > 1) {
        _httpCommUrlValue = value.substring(0, value.length - 1);
    } else {
        _httpCommUrlValue = value;
    }
}

var _httpUrl = function(url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    if (url.charAt(0) == "/") {
        return _httpCommUrlValue + url;
    } else {
        return _httpCommUrlValue + "/" + url;
    }
}

var _defaultHeaders = {}
function _addDefaultHeader(header, value) {
    _defaultHeaders[header] = value;
}

var _ajaxParams = function(config) {

    var params = config.params || {};

    var isupload = false;
    if (typeof params === 'string') {
        params = {params:''};
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
    
    config.params = httpParams;
    config.url = _httpUrl(config.url);

    // if (!params[1]) { //文件上传时，不能设置 Content-Type
    //     xmlRequest.setRequestHeader('Content-Type', config.contentType);
    // }
}

var _processConfig = function(config){

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

}


export async function http(url,config){

    if (isObject(url)) {
        config = extend(url);
    } else {
        config = extend(config);
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

    var response = await _http(config);
    
    var r = undefined;
    try {
        r = JSON.parse(response.text);
    } catch (e) {
        throw { code: -4, message: '网络故障' };
    }

    if (r.code === undefined || r.code === null || r.code < 0) {
        throw r;
    } else {
        if(r.result && typeof r.result == 'object' && r.warnings){
            r.result.$warnings = r.warnings;
        }
    }
    return r.result;
}


http.addHeader = _addDefaultHeader;
http.commUrl = _httpCommUrl;




// console.log('ajax....')
// export default function http(){
//     console.log('ajax....')
// }
// 'use strict';



// var standardJsonHttpRequestHandle = function() {

// };
// // Object.defineProperty(exports.http, 'STANDARD_JSON_REQUEST', {
// //     value: standardJsonHttpRequestHandle,
// //     writable: false,
// //     configurable: false
// // });
import {isObject,extend} from "../base";

export default function(url, config) {

    return new Promise(function(resolve, reject){
        if (isObject(url)) {
            config = extend(url);
        } else {
            config = extend(config);
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
        if (typeof params === 'FormData') { //文件上传时，不能设置 Content-Type
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

        var onreadystatechange = function() {
            if (xmlRequest.readyState == 3) {
                // progress();
                return;
            }
            if (xmlRequest.readyState != 4) {
                return;
            }
            resolve({
                text: xmlRequest.responseXML || xmlRequest.responseText,
                status:xmlRequest.status,
                statusText:xmlRequest.statusText,
                timeout:xmlRequest.timeout,
                headers:xmlRequest.getAllResponseHeaders()
            });

        };
        if (config.async == true) {
            xmlRequest.onreadystatechange = onreadystatechange;
        } else {
            onreadystatechange();
        }
    });
}

// //exports.http.ajax = ajaxFun;



// export default function communicateFun(config) {

//     // if (lin.isObject(url)) {
//     //     config = lin.extend(url);
//     // } else {
//     //     config = lin.extend(config);
//     //     config.url = url;
//     // }
//     // if (config.async === undefined || config.async === null) {
//     //     config.async = true;
//     // }
//     // config.method = config.method || "post";

//     // config.headers = config.headers || {};
//     // config.headers["__http_comm_protocol__"] = "";
//     // config.headers["__http_comm_protocol_debug__"] = "";
//     // config.url = httpUrl(config.url);

    
//     ajaxFun(config);

// };
// //exports.http = communicateFun;


// var defaultHeaders = {}
// var setDefaultHeaders = function(header, value) {
//     defaultHeaders[header] = value;
// }

// //exports.http.addHeader = setDefaultHeaders;
// //解决文件上传的问题
// var ajaxParams = function(params, contentType) {

//     if (typeof params === 'string') {
//         return [params, false];
//     }

//     var isupload = false;
//     if (contentType == 'multipart/form-data') {
//         isupload = true;
//     } else {
//         for (var param in params) {
//             if (params[param] && params[param].constructor && params[param].constructor.name == 'File') {
//                 isupload = true;
//                 break;
//             }
//         }
//     }

//     var paramString = undefined;
//     if (isupload) {
//         paramString = new FormData();
//         for (var param in params) {
//             paramString.append(param, params[param]);
//         }
//     } else {
//         paramString = '';
//         for (var param in params) {
//             paramString += '&' + param + '=' + params[param];
//         }
//         paramString = paramString.substr(1);

//     }
//     return [paramString, isupload];
// };




  

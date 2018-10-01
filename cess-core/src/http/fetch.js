'use strict';

import {isObject,extend} from "../base/base";

export default function(url, config){

    if (isObject(url)) {
        config = extend(url);
    } else {
        config = extend(config);
        config.url = url;
    }

    var request = {
        headers:config.headers || {},
        method:config.method
    }

    if(config.contentType){
        request.headers['Content-Type'] = config.contentType
    }

    if(config.mode){
        request.mode = config.mode
    }

    if(config.method.toLowerCase() == 'post'){
        request.body = config.params;
    }

    return fetch(config.url,request).then(async (response)=>{
        
        var text = await response.text();
        return {
            text: text,
            status:response.status,
            statusText:response.statusText,
            headers:response.headers
        }
    })

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
}

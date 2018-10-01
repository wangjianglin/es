
import req from './http/req';

class HttpDNS {

    constructor(){
        this._hosts = {};
    }
    
    async getIpByServerInter(host){
        var r = await getIpByServer(host)
        if(!r){
            r = {};
            r.host = host;
            r.ttl = 120 * 1000;
            r.query = new Date().getTime();
        }
        if(r.ttl < 10 * 1000){
            r.ttl = 120 * 1000;
        }
        r.host = host;
        this._hosts[host] = r;
        return new Promise(function(resolve, reject){
            // if (isObject(url)) {
            //     config = extend(url);
            // } else {
            //     config = extend(config);
            //     config.url = url;
            // }

            // var xmlRequest = undefined;

            // if (typeof XMLHttpRequest != 'undefined') {
            //     xmlRequest = new XMLHttpRequest();
            // } else {
            //     xmlRequest = new ActiveXObject('Microsoft.XMLHTTP');
            // }

            // config.method = config.method || 'get';
            // var params = config.params || {};

            // config.contentType = config.contentType || 'application/x-www-form-urlencoded';


            // xmlRequest.open(config.method, config.url, config.async, config.bstrUser, config.bstrPassword);
            // if (config.async) {
            //     xmlRequest.timeout = config.timeout === undefined ? 20000 : config.timeout;
            // }
            // if (typeof params === 'FormData') { //文件上传时，不能设置 Content-Type
            //     xmlRequest.setRequestHeader('Content-Type', config.contentType);
            // }

            // for (var header in config.headers) {
            //     xmlRequest.setRequestHeader(header, config.headers[header]);
            // }

            // if (config.method.toString().toLowerCase() === "post") {
            //     xmlRequest.send(params);
            // } else {
            //     xmlRequest.send();
            // }

            // var onreadystatechange = function() {
            //     if (xmlRequest.readyState == 3) {
            //         // progress();
            //         return;
            //     }
            //     if (xmlRequest.readyState != 4) {
            //         return;
            //     }
            //     resolve({
            //         text: xmlRequest.responseXML || xmlRequest.responseText,
            //         status:xmlRequest.status,
            //         statusText:xmlRequest.statusText,
            //         timeout:xmlRequest.timeout,
            //         headers:xmlRequest.getAllResponseHeaders()
            //     });

            // };
            // if (config.async == true) {
            //     xmlRequest.onreadystatechange = onreadystatechange;
            // } else {
            //     onreadystatechange();
            // }
        });
    }
// var getIpByServer = function(httpDns,account,hostName,callback){
//              // String resolveUrl = "http://" + SERVER_IP + "/" + accountId + "/d?host=" + hostName;
//              var resolveUrl = "https://"+ AliHttpDNS.SERVER_IP + "/" + account + "/d?host=" + hostName;
//              var destString = undefined;
            
//             try{
//                  ajaxFun({
//                     url:resolveUrl,
//                     async:true,
//                     timeout:3000,
//                     result:function(e){
//                     try{
//                             destString = e && e.responseText || "{}";

//                             var destJson = JSON.parse(destString);
//                             var ttl = destJson['ttl'] * 1000;
//                             if(ttl <= 0){
//                                 ttl = 120;
//                             }
//                             httpDns._ttl[hostName] = ttl;
//                             httpDns._query[hostName] = new Date().getTime();
//                             var ip = destJson['ips'][0];
//                             httpDns._host[hostName] = ip;
//                         // return ip;

//                             callback(ip)
//                         }catch(e){
//                             httpDns._ttl[hostName] = 1200;
//                             httpDns._query[hostName] = new Date().getTime();
//                             httpDns._host[hostName] = "";
//                             callback();
//                         }
//                     },fault:function(e){
//                         callback();
//                     }
//                  });
//              }catch(e){
//                 console.log(e);
//                 callback();
//              }
//         }

        
    async getIpByHost(host){
        
        if(this._degradation != null && typeof this._degradation == 'function'){
            if(this._degradation(host)){
                callback()
                return;
            }
        }
        var destIp = this._hosts[host];
        if(destIp){
            var ttl = this._ttl[host];
            var query = this._query[host];
            if(query + ttl > new Date().getTime()){
                // callback(destIp);
                return destIp;
            }else if(this.expiredIpAvailable){
                _query[host] = new Date().getTime();
                return await getIpByServer(host);
                // setTimeout(function(){
                //     httpDns._query[hostName] = new Date().getTime();
                //     getIpByServer(this,this._acccount,host,callback);
                // },10);
                // callback(destIp());
                // return;
            }
        }
        return await getIpByServer(host)
        // getIpByServer(this,this._acccount,host,callback);
    }

    degradationFilter (degradation){
        this._degradation = degradation;
    }
        // AliHttpDNS.SERVER_IP = '203.107.1.1'
        // return AliHttpDNS;
}

class AliHttpDNS {

    static SERVER_IP = '203.107.1.1'
    constructor(account){
        this._acccount = account;
    }

    async getIpByServer(hostName){
        var resolveUrl = "https://"+ SERVER_IP + "/" + account + "/d?host=" + hostName;
        var destString = undefined;
        
        try{
            var response = await reg({
                url:resolveUrl,
                async:true,
                timeout:3000
            });
            
            destString = e && e.responseText || "{}";

            var destJson = JSON.parse(destString);
            var ttl = destJson['ttl'] * 1000;
            if(ttl <= 0){
                ttl = 120;
            }
            var r = {};
            r.ttl = ttl;
            // r._query[hostName] = new Date().getTime();
            var ips = destJson['ips'];
            r.ips = ips;
        // return ip;

            // callback(ip)
            return r;
                        
        }catch(e){
        }
    }
// var AliHttpDNS = function(account){

//             this._host = {};
//             this._acccount = account;
//             this._ttl = {};
//             this._query = {};

//             Object.defineProperty(this,'expiredIpAvailable',{
//                 get:function(){

//                 },
//                 set:function(){

//                 }
//             });
//         }

}
// var aliHttpDNS = (function(){

//         var getIpByServer = function(httpDns,account,hostName,callback){
//              // String resolveUrl = "http://" + SERVER_IP + "/" + accountId + "/d?host=" + hostName;
//              var resolveUrl = "https://"+ AliHttpDNS.SERVER_IP + "/" + account + "/d?host=" + hostName;
//              var destString = undefined;
            
//             try{
//                  ajaxFun({
//                     url:resolveUrl,
//                     async:true,
//                     timeout:3000,
//                     result:function(e){
//                     try{
//                             destString = e && e.responseText || "{}";

//                             var destJson = JSON.parse(destString);
//                             var ttl = destJson['ttl'] * 1000;
//                             if(ttl <= 0){
//                                 ttl = 120;
//                             }
//                             httpDns._ttl[hostName] = ttl;
//                             httpDns._query[hostName] = new Date().getTime();
//                             var ip = destJson['ips'][0];
//                             httpDns._host[hostName] = ip;
//                         // return ip;

//                             callback(ip)
//                         }catch(e){
//                             httpDns._ttl[hostName] = 1200;
//                             httpDns._query[hostName] = new Date().getTime();
//                             httpDns._host[hostName] = "";
//                             callback();
//                         }
//                     },fault:function(e){
//                         callback();
//                     }
//                  });
//              }catch(e){
//                 console.log(e);
//                 callback();
//              }
//         }

//         var AliHttpDNS = function(account){

//             this._host = {};
//             this._acccount = account;
//             this._ttl = {};
//             this._query = {};

//             Object.defineProperty(this,'expiredIpAvailable',{
//                 get:function(){

//                 },
//                 set:function(){

//                 }
//             });
//         }
//         AliHttpDNS.prototype.getIpByHost = function(host,callback){
            
//             if(this._degradation != null && typeof this._degradation == 'function'){
//                 if(this._degradation(host)){
//                     callback()
//                     return;
//                 }
//             }
//             var destIp = this._host[host];
//             if(destIp){
//                 var ttl = this._ttl[host];
//                 var query = this._query[host];
//                 if(query + ttl > new Date().getTime()){
//                     callback(destIp);
//                     return;
//                 }else if(this.expiredIpAvailable){
//                     setTimeout(function(){
//                         httpDns._query[hostName] = new Date().getTime();
//                         getIpByServer(this,this._acccount,host,callback);
//                     },10);
//                     callback(destIp());
//                     return;
//                 }
//             }
//             getIpByServer(this,this._acccount,host,callback);
//         }

//         AliHttpDNS.prototype.degradationFilter = function(degradation){
//             this._degradation = degradation;
//         }
//         AliHttpDNS.SERVER_IP = '203.107.1.1'
//         return AliHttpDNS;
//     })();




'use strict'



 var lin = lin || {};
 window.lin = lin;


(function(exports) {

    //监听window对象事件  开始
    var funs = {};
    exports.on = function(name, fun) {
        var tmpFuns = funs[name];
        if (!tmpFuns) {
            tmpFuns = [];
            funs[name] = tmpFuns;
        }
        tmpFuns.push(fun);
    };

    exports.remove = function(name, fun) {
        var tmpFuns = funs[name];
        if (!tmpFuns) {
            return;
        }
        funs[name] = tmpFuns.filter(function(value) {
            return value != fun;
        });
    };

    var fireFun = function(name, e) {
        var tmpFuns = funs[name];
        if (!tmpFuns) {
            return;
        }
        tmpFuns.forEach(function(value) {
            if (value) {
                value(e);
            }
        });
    }

    window.onpopstate = function(e) {
            fireFun('popstate', e);
        }
        //监听window对象事件  结束

    Object.defineProperty(exports, 'fire', {
        value: fireFun,
        writable: false,
        enumerable: true,
        configurable: false
    });


    var _platform = undefined;
    Object.defineProperty(exports, 'platform', {
        get: function() {
            if (_platform) {
                return _platform;
            }
            if (window.AndroidInterface !== undefined) {
                _platform = "android";
                return;
            }
            // if(window.IOSDeviceInfo !== undefined){
            //   return "ios";
            // }
            try {
                _platform = lin.web.exec({ action: 'platform' });
            } catch (e) {}
            if (_platform !== 'ios') {
                _platform = "web";
            }
            return _platform;
        },
        enumerable: true,
        configurable: false
    });
    Object.defineProperty(exports, 'browser', {
        get: function() {
            if (exports.isQQ) {
                return 'QQ'; }
            if (exports.isQQBrowser) {
                return 'QQBrowser'; }
            if (exports.isMicroMessage) {
                return 'MicroMessage'; }
            if (exports.isUC) {
                return 'UC'; }
            if (exports.isChrome) {
                return 'Chrome'; }
            return "other";
        },
        enumerable: true,
        configurable: false
    });

    // window.navigator.userAgent.indexOf('QQ') != -1
    var values = {
        isQQ: window.navigator.userAgent.indexOf('QQ') != -1,
        isQQBrowser: window.navigator.userAgent.indexOf('MQQBrowser') != -1,
        isMicroMessenger: window.navigator.userAgent.indexOf('MicroMessenger') != -1,
        isUC: window.navigator.userAgent.indexOf('UCBrowser') != -1,
        isChrome: window.navigator.userAgent.indexOf('Chrome') != -1,
        isAndroid: window.navigator.userAgent.indexOf('Android') != -1,
        isIOS: window.navigator.userAgent.indexOf('iPhone OS') != -1,
        isSafari: window.navigator.userAgent.indexOf('Safari') != -1
    };

    for (var key in values) {
        Object.defineProperty(exports, key, {
            value: values[key],
            writable: false,
            enumerable: true,
            configurable: false
        });
    }

    var device = {};
    Object.defineProperty(exports, 'device', {
        value: device,
        enumerable: true,
        writable: false,
        configurable: false
    });


    Object.defineProperty(device, 'productName', {
        get: function() {
            // if(exports.platform === "android"){
            //   return window.AndroidDeviceInfo.getProductName();
            // }else 
            if (exports.platform === "ios" || exports.platform === "android") {
                return lin.web.exec({ action: 'productName' });
            }
            return undefined;
        },
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(device, 'versionName', {
        get: function() {
            // if(exports.platform == 'android'){
            //   return window.AndroidDeviceInfo.getOSVersion();
            // }
            if (exports.platform == 'ios' || exports.platform == 'android') {
                return lin.web.exec({ action: 'versionName' });
            }
            return undefined;
        },
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(device, 'model', {
        get: function() {
            // if(exports.platform == 'android'){
            //   return window.AndroidDeviceInfo.getModel();
            // }
            if (exports.platform == 'ios' || exports.platform === "android") {
                return lin.web.exec({ action: 'model' });
            }
            return "";
        },
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(device, 'version', {
        get: function() {
            // if(exports.platform == 'android'){
            //   return window.AndroidDeviceInfo.getSDKVersion();
            // }
            if (exports.platform == 'ios' || exports.platform === "android") {
                return lin.web.exec({ action: 'version' });
            }
            return undefined;
        },
        enumerable: true,
        configurable: false
    });
    Object.defineProperty(device, 'uuid', {
        get: function() {
            // if(exports.platform == 'android'){
            //   return window.AndroidDeviceInfo.getUuid();
            // }
            if (exports.platform == 'ios' || exports.platform === "android") {
                return lin.web.exec({ action: 'uuid' });
            }
            return undefined;
        },
        enumerable: true,
        configurable: false
    });

    var appInfo = {};
    Object.defineProperty(exports, 'app', {
        value: appInfo,
        enumerable: true,
        writable: false,
        configurable: false
    });


    Object.defineProperty(appInfo, 'version', {
        get: function() {
            // if(exports.platform == 'android'){
            //   return window.AndroidAppInfo.getVersionCode();
            // }
            if (exports.platform == 'ios' || exports.platform == 'android') {
                return lin.web.exec({ plugin: 'app', action: 'bulid' });
            }
            return undefined;
        },
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(appInfo, 'versionName', {
        get: function() {
            // if(exports.platform == 'android'){
            //   return window.AndroidAppInfo.getVersionName();
            // }
            if (exports.platform == 'ios' || exports.platform == 'android') {
                return lin.web.exec({ plugin: 'app', action: 'version' });
            }
            return undefined;
        },
        enumerable: true,
        configurable: false
    });

    Object.defineProperty(appInfo, 'identifier', {
        get: function() {
            // if(exports.platform == 'android'){
            //   return window.AndroidAppInfo.getPackageName();
            // }
            if (exports.platform == 'ios' || exports.platform == 'android') {
                return lin.web.exec({ plugin: 'app', action: 'identifier' });
            }
            return undefined;
        },
        enumerable: true,
        configurable: false
    });

}(lin));








//js object and android bridge
lin.ns('lin.web');
(function(exports) {

  var execFun = function(config){
      var config = Object.create(config);
      // config.url = "http://192.168.1.66/test";
      config.url = "http://" + window.location.host + ":0000/device-info";
      var flag = sessionStorage.getItem('web-flag');
      // config.url += 'web-flag:' + flag;
      config.params = config.params ? JSON.stringify(config.params) :  "{}";//{a:'a',b:'b',data:'测试中文！'};
      config.method = 'post';
      config.headers = {'web-flag':flag,'action':config.action || '','plugin':config.plugin || ''};
      config.async = config.async || false;
      if(config.async){
        config.timeout = 0;
      }
      // console.log('start request.');
      var r = undefined;
      var resultFun = config.result;
      config.result = function(e){
        // console.log(e);
        // r = eval(e.responseText);
        //debugger
        if(e.responseText){
          try{
            r = JSON.parse(e.responseText);
          }catch(e2){
            r = {};
          }
        }
        if(resultFun){
          resultFun(r);
        }
      };
      var faultFun = config.fault;
      config.fault = function(e){
        // console.log('error.');
        if(faultFun){
          faultFun(e);
        }
      };
      lin.http.ajax(config);
      // console.log('end request.');
      return r;
  }
  var androidExecFunImpl = function(config){
      var r = JSON.stringify(config);
      r = window.AndroidInterface.exec(r);
      r = JSON.parse(r);
      if(config.result){
        config.result(r);
      }
      return r;
    }

  var androidExecFun = function(config){
      if(config.async){
        setTimeout(function(){
          androidExecFunImpl(config);
        },0);
      }else{
        return androidExecFunImpl(config);
      }
  }
  if(window.AndroidInterface){
    exports.exec = androidExecFun;
  }else{
    exports.exec = execFun;
  }
}(lin.web));


//storage

(function() {

  //localStorage
  if (lin.platform === 'ios') {
    window.localStorage.getItem = function(item){
      return lin.web.exec({plugin:'storage',action:'getItem',params:{item:item}}).value;
    }
    window.localStorage.setItem = function(item,value){
      lin.web.exec({plugin:'storage',action:'setItem',params:{item:item,value:JSON.stringify({value:value})}});
    }
    window.localStorage.remove = function(item){
      lin.web.exec({plugin:'storage',action:'removeItem',params:{item:item}});
    }
  }else{
    var oldGetItem = window.localStorage.getItem;
    window.localStorage.getItem = function(item){
      var value = oldGetItem.call(window.localStorage,item);
      if(!value){
        return value;
      }
      return JSON.parse(value).value;
    }
    var oldSetItem = window.localStorage.setItem;
    window.localStorage.setItem = function(item,value){
      //lin.web.exec({plugin:'storage',action:'setItem',params:{item:item,value:JSON.stringify({value:value})}});
      oldSetItem.call(window.localStorage,item,JSON.stringify({value:value}));
    }
  }

  //sessionStorage
  // if (lin.platform === 'ios') {
  //   window.sessionStorage.getItem = function(item){
  //     return lin.web.exec({plugin:'storage',action:'getItem',params:{item:item}}).value;
  //   }
  //   window.sessionStorage.setItem = function(item,value){
  //     lin.web.exec({plugin:'storage',action:'setItem',params:{item:item,value:JSON.stringify({value:value})}});
  //   }
  //   window.sessionStorage.remove = function(item){
  //     lin.web.exec({plugin:'storage',action:'removeItem',params:{item:item}});
  //   }
  // }else{
    var oldGetItem = window.sessionStorage.getItem;
    window.sessionStorage.getItem = function(item){
      var value = oldGetItem.call(window.sessionStorage,item);
      if(!value){
        return value;
      }
      return JSON.parse(value).value;
    }
    var oldSetItem = window.sessionStorage.setItem;
    window.sessionStorage.setItem = function(item,value){
      //lin.web.exec({plugin:'storage',action:'setItem',params:{item:item,value:JSON.stringify({value:value})}});
      oldSetItem.call(window.sessionStorage,item,JSON.stringify({value:value}));
    }
  // }
  
}());

//alert

(function(exports){

  exports.window ={};
    var oldAlert = window.alert;
    exports.window.alert = function(){
      return oldAlert.apply(window,arguments);
    }

    var oldConfirm = window.confirm;
    exports.window.confirm = function(){
      return oldConfirm.apply(window,arguments);
    }

  if (lin.platform === 'ios') {
    
    window.alert = function(message,callback,button){
      lin.web.exec({plugin:'app',action:'alert',params:{message:message,button:button},async:true,
        result:function(){
          if(callback){
            callback();
          }
        }
      });
    }

    window.confirm = function(message,callback){
      return lin.web.exec({plugin:'app',action:'confirm',async:true,params:{message:message},
        result:function(e){
          callback(e);
        }
      });
    }
    
  }else{
      window.alert = function(message,callback,button){
        setTimeout(function(){
          exports.window.alert(message);
          if(callback && typeof callback == 'function'){
            callback();
          }
        },0);
      }

      window.confirm = function(message,callback){
        setTimeout(function(){
          var r = exports.window.confirm(message);
          if(callback && typeof callback == 'function'){
            callback(r);
          }
        },0);
      }
  }

  exports.info = function(info){
    lin.web.exec({plugin:'app',action:'info',params:{text:info}});
  }

}(lin));


(function(){



// var formatDate = function(date, style){
//         var y = date.getFullYear();
//         var M = "0" + (date.getMonth() + 1);
//         M = M.substring(M.length - 2);
//         var d = "0" + date.getDate();
//         d = d.substring(d.length - 2);
//         var h = "0" + date.getHours();
//         h = h.substring(h.length - 2);
//         var m = "0" + date.getMinutes();
//         m = m.substring(m.length - 2);
//         return style.replace('yyyy', y).replace('MM', M).replace('dd', d).replace('hh', h).replace('mm', m);  
//    }


   Date.prototype.format = function(style){
    var y = this.getFullYear();
        var M = "0" + (this.getMonth() + 1);
        M = M.substring(M.length - 2);
        var d = "0" + this.getDate();
        d = d.substring(d.length - 2);
        var h = "0" + this.getHours();
        h = h.substring(h.length - 2);
        var m = "0" + this.getMinutes();
        m = m.substring(m.length - 2);
        var s = "0" + this.getSeconds();
        s = s.substring(s.length - 2);
        return style.replace('yyyy', y).replace('MM', M).replace('dd', d).replace('hh', h).replace('mm', m).replace('ss', s); 
   }
}());

window.lin = lin;
return lin;

}));
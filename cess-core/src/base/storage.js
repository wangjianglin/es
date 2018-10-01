

import {JSON} from './base';

var originSessionStorage = sessionStorage || {
    getItem:function () {},
    setItem:function () {},
    removeItem:function () {}
};
var originSessionStorageGetItem = originSessionStorage && originSessionStorage.getItem;
var originSessionStorageSetItem = originSessionStorage && originSessionStorage.setItem;
var originSessionStorageRemoveItem = originSessionStorage && originSessionStorage.removeItem;

export var sessionStorage = {
  
    getItem: function(item){
        var value = originSessionStorageGetItem.call(originSessionStorage,item);
            if(!value){
                return value;
            }
        return JSON.parse(value).value;
    },
    setItem:function(item,value){
        originSessionStorageSetItem.call(originSessionStorage,item,JSON.stringify({value:value}));
    },
    removeItem:function(item){
        originSessionStorageRemoveItem.call(originSessionStorage,item);
    }
};

var originLocalStorage = localStorage || {
    getItem:function () {},
    setItem:function () {},
    removeItem:function () {}
};
var originLocalStorageGetItem = originLocalStorage && originLocalStorage.getItem;
var originLocalStorageSetItem = originLocalStorage && originLocalStorage.setItem;
var originLocalStorageRemoveItem = originLocalStorage && originLocalStorage.removeItem;

export var localStorage = {
  
    getItem: function(item){
        var value = originLocalStorageGetItem.call(originLocalStorage,item);
            if(!value){
                return value;
            }
        return JSON.parse(value).value;
    },
    setItem:function(item,value){
        originLocalStorageSetItem.call(originLocalStorage,item,JSON.stringify({value:value}));
    },
    removeItem:function(item){
        originLocalStorageRemoveItem.call(originLocalStorage,item);
    }
};

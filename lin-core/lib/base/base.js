'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.isObject = isObject;
exports.apply = apply;
exports.applyIf = applyIf;
exports.extend = extend;


var objectPrototype = Object.prototype;
var toString = objectPrototype.toString;
var enumerables = true;
var enumerablesTest = { toString: 1 };

var callOverrideParent = function callOverrideParent() {
    var method = callOverrideParent.caller.caller;
    return method.$owner.prototype[method.$name].apply(this, arguments);
};

for (var i in enumerablesTest) {
    enumerables = null;
}

if (enumerables) {
    enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'constructor'];
}

function isObject(value) {
    // http://jsperf.com/isobject4
    return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
};

//exports.enumerables = enumerables;


function apply(object, config, defaults) {
    if (defaults) {
        apply(object, defaults);
    }

    if (object && config && (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
        var i, j, k;

        for (i in config) {
            object[i] = config[i];
        }

        if (enumerables) {
            for (j = enumerables.length; j--;) {
                k = enumerables[j];
                if (config.hasOwnProperty(k)) {
                    object[k] = config[k];
                }
            }
        }
    }

    return object;
}

function applyIf(object, config) {
    var property;

    if (object) {
        for (property in config) {
            if (object[property] === undefined) {
                object[property] = config[property];
            }
        }
    }
    return object;
}

function extend(obj) {
    if (typeof Object.create === 'function') {
        return Object.create(obj || {});
    }
    var F = function F() {};
    F.prototype = obj;
    return new F();
}
// exports.extend = function(obj){
// return Object.create(obj || null);
// // var obj = new Object();
// // obj.prototype = obj;
// // return obj;
// }

// }(lin));


// export function isExitsFunction(funcName) {
//     try {
//         if (typeof(eval(funcName)) == "function") {
//             return true;
//         }
//     } catch(e) {}
//     return false;
// }
// //是否存在指定变量 
// export function isExitsVariable(variableName) {
//     try {
//         if (typeof(variableName) == "undefined") {
//             //alert("value is undefined"); 
//             return false;
//         } else {
//             //alert("value is true"); 
//             return true;
//         }
//     } catch(e) {}
//     return false;
// }
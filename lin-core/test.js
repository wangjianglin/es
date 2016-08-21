// import download from '@leizongmin/es2015_demo'


// function sleep(ms = 0) {
//   return new Promise((resolve, reject) => setTimeout(resolve, ms));
// }

// download();

// async function test() {
//   for (let i = 0; i < 10; i++) {
//     await sleep(500);
//     console.log(`i=${i}`);
//   }
// }

// test().then(() => console.log('done'));

// var a = "aaaEgEFEEgga333";
// console.log(a.toLowerCase());
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var xhr = new XMLHttpRequest();
global.XMLHttpRequest = XMLHttpRequest;

var linCore = require('./')
//import {isObject,test,http,httpCommUrl} from '../';
var isObject = linCore.isObject;
var test = linCore.test;
var http = linCore.http;
//var httpCommUrl =


    // test().then(() => console.log('done'));

    // console.log(isObject);
    // console.log(http);
    console.log(http);
    test().then(() => console.log('done'));
    http.commUrl('http://s.feicuibaba.com');
    http.addHeader('__http_comm_protocol__','');
    http.addHeader('__http_comm_protocol_debug__','');
    http({
        url:'/core/comm/test.action',
        params:{
            data:'test data!'
        },result:(r)=>{
            console.log(r);
        },fault:(e)=>{
            console.log(e);
        }
    })


var base = require('./base');
module.exports = base;

var http = require('./http');

base.apply(module.exports,http)

function sleep(ms = 0) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

async function test() {
  for (let i = 0; i < 10; i++) {
    await sleep(500);
    console.log(`i=${i}`);
  }
}

// module.exports.test = test;
base.apply(module.exports,{test:test})

//test().then(() => console.log('done'));

//export test;
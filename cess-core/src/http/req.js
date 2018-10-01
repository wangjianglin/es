var req = undefined;
if(typeof fetch == 'function'){
    req = require('./fetch').default;
}else{
    req = require('./ajax').default;
}

export default req;
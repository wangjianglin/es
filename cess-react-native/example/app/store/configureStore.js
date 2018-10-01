'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
// var promise = require('./promise');
// var array = require('./array');
// var analytics = require('./analytics');
var reducers = require('../reducers');
var createLogger = require('redux-logger');
import {persistStore, autoRehydrate} from 'redux-persist';
var {AsyncStorage} = require('react-native');

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

// var logger = createLogger({
//   predicate: (getState, action) => isDebuggingInChrome,
//   collapsed: true,
//   duration: true,
// });

var createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

//export default function configureStore(onComplete: ?() => void) {
export default function configureStore() {
  // TODO(frantic): reconsider usage of redux-persist, maybe add cache breaker
  // const store = autoRehydrate()(createStoreWithMiddleware)(reducers);
   const store = createStoreWithMiddleware(reducers, {})
  
  //persistStore(store, {storage: AsyncStorage}, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }

  //热替换选项
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }


  return store;
}

// module.exports = configureStore;

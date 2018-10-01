'use strict';

import { combineReducers } from 'redux';


//reducer其实也是个方法而已,参数是state和action,返回值是新的state
// function counter(state = 10, action) {
//   // switch (action.type) {
//   //   case INCREMENT_COUNTER:
//   //     return state + 1
//   //   case DECREMENT_COUNTER:
//   //     return state - 1
//   //   default:
//       return state
//   // }
// }

import user from './user';


module.exports = combineReducers({
  // config: require('./config'),
  // notifications: require('./notifications'),
  // maps: require('./maps'),
  // sessions: require('./sessions'),
  // user: require('./user'),
  // schedule: require('./schedule'),
  // topics: require('./topics'),
  // filter: require('./filter'),
  // navigation: require('./navigation'),
  // friendsSchedules: require('./friendsSchedules'),
  // surveys: require('./surveys'),
  user:user
});
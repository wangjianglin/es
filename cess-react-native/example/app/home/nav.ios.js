

'use strict';

// var React = require('React');
// var AppState = require('AppState');
// var LoginScreen = require('./login/LoginScreen');
// var PushNotificationsController = require('./PushNotificationsController');
// var StyleSheet = require('StyleSheet');
// var F8Navigator = require('F8Navigator');
// var CodePush = require('react-native-code-push');
// var View = require('View');
import React,{ Component } from 'react';

import {Text,
    View,
    StyleSheet,
    NavigatorIOS
} from 'react-native'
import StatusBar from 'StatusBar';

import { connect } from 'react-redux';
import Home from './home';


// var { version } = require('./env.js');

//@connect()
export default class Nav extends Component{
  componentDidMount() {
    //console.log(this);
  }

  componentWillUnmount() {
  }

  handleAppStateChange(appState) {
  }

  render() {
    return (
      <NavigatorIOS style={styles.container}
         initialRoute={{
            title: 'Search Books',
            component: Home
        }}>
      </NavigatorIOS>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// function select(store) {
//   return {
//     isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
//     // isLoggedIn:false,
//   };
// }

// module.exports = connect(select)(App);

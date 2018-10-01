

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

import {Text,View,StyleSheet} from 'react-native'
import StatusBar from 'StatusBar';
// var {
//   loadConfig,
//   loadMaps,
//   loadNotifications,
//   loadSessions,
//   loadFriendsSchedules,
//   loadSurveys,
// } = require('./actions');
// var { updateInstallation } = require('./actions/installation');
import { connect } from 'react-redux';
import LoginScreen from './LoginScreen';
import {MainScreen} from '../../index'

// var { version } = require('./env.js');

//var App = React.createClass({

import Home from './home/home';
import Main from './home/Main'
import Projects from './home/projects'

const tabs = {
    apple:{
        // icon:{uri: base64Icon, scale: 3},
        icon:require('./images/icon.png'),
        selectedIcon:require('./images/icon-hover.png'),
        renderAsOriginal:true,
        title:"apple tab",
        component:Projects
    },
    banana:{
        // systemIcon:"history",
        icon:require('./images/icon.png'),
        selectedIcon:require('./images/icon-hover.png'),
        badge:50,
        renderAsOriginal:true,
        title:"banana tab",
        component:Home
    },
    orange:{
        icon:require('./images/flux.png'),
        selectedIcon:require('./images/relay.png'),
        renderAsOriginal:true,
        title:"orange tab",
        component:Home
    }
}

class App extends Component{
  componentDidMount() {
    // AppState.addEventListener('change', this.handleAppStateChange);

    // this.props.dispatch(loadNotifications());
    // this.props.dispatch(loadMaps());
    // this.props.dispatch(loadConfig());
    // this.props.dispatch(loadSessions());
    // this.props.dispatch(loadFriendsSchedules());
    // this.props.dispatch(loadSurveys());

    // updateInstallation({version});
    // CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
  }

  componentWillUnmount() {
    // AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    // if (appState === 'active') {
    //   this.props.dispatch(loadSessions());
    //   this.props.dispatch(loadNotifications());
    //   this.props.dispatch(loadSurveys());
    //   CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
    // }
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <LoginScreen />;
    }
    return (
      <MainScreen style={styles.container}
      tabs={tabs}
      >
      </MainScreen>
    );
  }

};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function select(store) {
  return {
    // isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
    isLoggedIn:true,
  };
}

module.exports = connect(select)(App);

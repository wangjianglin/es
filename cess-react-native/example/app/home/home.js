

'use strict';


//import {isObject,test,http,httpCommUrl} from 'lin-core';
//import {localStorage,sessionStorage} from 'lin-core';
//import {Event} from 'lin-core';

// var React = require('React');
// var AppState = require('AppState');
// var LoginScreen = require('./login/LoginScreen');
// var PushNotificationsController = require('./PushNotificationsController');
// var StyleSheet = require('StyleSheet');
// var F8Navigator = require('F8Navigator');
// var CodePush = require('react-native-code-push');
// var View = require('View');
import React,{ Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
// import StatusBar from 'StatusBar';
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
// import LoginScreen from './LoginScreen';
// import MainScreen from './MainScreen'

// 'use strict';
// var React = require('react-native');
// var {
//     StyleSheet,
//     View,
//     Component
//    } = React;
import Detial from './detial';

var styles = StyleSheet.create({
});

//@connect()
export default class Home extends React.Component {
//const Home = React.createClass({
    // constructor(props){
    //     super(props);
    // }
    _press(){
        // this.props.navigate.push({
        //       title: 'Very Long Custom View Example Title',
        //       component: Detial,
        //     });
        const route = {key: '[]-' + Date.now(),component:Detial};
        // this.props.navigate({type: 'push', route});
        this.props.navigate.push(route);

        // http.commUrl('http://s.feicuibaba.com');
        // //http.commUrl('/api');
        // http.addHeader('__http_comm_protocol__','');
        // http.addHeader('__http_comm_protocol_debug__','');
        // //ToastAndroid.show('require',ToastAndroid.SHORT);
        // http({
        //     url:'/core/comm/test.action',
        //     // method:'get',
        //     params:{
        //         data:'测试中文！'
        //     }
        // }).then((data)=>{
        //     console.log(data);
        // //ToastAndroid.show(data+'',ToastAndroid.SHORT);
        //     //done();
        // },(error)=>{
        //     console.log(error);
        // //ToastAndroid.show(error+'require',ToastAndroid.SHORT);
        //     //done();
        // })

          
    }
    render() {
        return (
            <TouchableOpacity onPress={this._press.bind(this)}>
            <View><Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
        </View>        
        </TouchableOpacity>     
        );
    }

    // rightBar(){
    //     return (
    //         <TouchableOpacity>
    //             <Image source={require('../../app/images/flux.png')} />
    //         </TouchableOpacity>
    //     );
    // }

    static title = "====="
}

//module.exports = Home;
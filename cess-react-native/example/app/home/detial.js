

'use strict';


import React,{ Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native'

import { connect } from 'react-redux';



// var styles = StyleSheet.create({
// });


export default class Detial extends Component {

    // static propTypes = {
    //   ...Component.propTypes,
    //   // navigate: PropTypes.func.isRequired,
    //   rightBar:React.PropTypes.func
    // };

    constructor(props){
        super(props);
        //debugger
        console.log('---------------------------------------------')
       // this.rightBar = this.rightBar2.bind(this);
    }
    componentWillMount(){
       // this.props.nav.rightBar(this.rightBar2());
       // this.props.nav.setTitle('detial title');
    }
    _press(){
        // console.log('======')
        // console.log(this);
        // console.log(this.props);
        // this.props.navigator.push({
        //       component: Detial,
        //       navigationBarHidden:true
        //     });
        const route = {component:Detial,title:'detial',hidden:false};
        this.props.navigate.push(route);
    }

    _press2(){
        this.props.navigate.pop();
    }

    _press3(){
        this.props.nav.rightBar(this.rightBar());
        this.props.nav.setTitle("title"+Math.ceil(Math.random()*100));
    }

    render() {
        return (
            <ScrollView style={styles.scrollView}>
            <View>
            <TouchableOpacity onPress={this._press.bind(this)}>
            <View><Text>1、===</Text>
            <Text>2、===</Text>
            <Text>3、===</Text>
            <Text>4、===</Text>
            <Text>5、===</Text>
            <Text>6、===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>******************</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
            <Text>===</Text>
        </View>    
        </TouchableOpacity>  

        <TouchableOpacity onPress={this._press2.bind(this)}>
            <View><Text>pop</Text>
        </View>    
        </TouchableOpacity> 

        <TouchableOpacity onPress={this._press3.bind(this)}>
            <View><Text>re set</Text>
            <Text>re set</Text>
            <Text>re set</Text>
        </View>    
        </TouchableOpacity> 

        </View>  
        </ScrollView>      
        );
    }

    rightBar = ()=>{
        return (
            <TouchableOpacity onPress={this._press.bind(this)}>
                <Image source={require('../../app/images/flux.png')} />
                <Text>
                    {Math.ceil(Math.random()*100)}
                </Text>
            </TouchableOpacity>
        );
    }

    static title = 'detial ==== '
}

// Detial.prototype.rightBar = ()=>{
//         return (
//             <TouchableOpacity>
//                 <Image source={require('../../app/images/flux.png')} />
//             </TouchableOpacity>
//         );
//     }

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  navigatorCardStack: {
    flex: 20,
  },
  scrollView: {
    marginTop: 0,
    flex:1
  }
});
//module.exports = SearchBooks;
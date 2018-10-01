
'use strict';
import React, { Component } from 'react';
import {
    View,
    ListView,
    Image,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    Alert,
    Dimensions,
    ScrollView,
    FlatList,
    InteractionManager,
    AppRegistry
} from 'react-native';


//import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';
import PullRefreshScrollView from '../../../src/PullRefreshScrollView'
import {PtrScrollView} from '../../../src/';
import {PtrListView} from '../../../src/';

const Platform = require('Platform');

export default class Projects extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this.data = [];
        this.data = ['列表项', '列表项', '列表项', '列表项', '列表项', '列表项', '列表项'];
        this.state = {
            dataSource: ds.cloneWithRows(this.data),
            data: this.data,
        }
    }

    componentDidMount(){
        // this.refs['ptr'].autoRefresh();
        // setTimeout(()=>{
        //     this.refs['ptr'].autoRefresh();
        // },1000);
    }

    ___onRefresh(PullRefresh){
        console.log('refresh');


        setTimeout(function(){
            PullRefresh.onRefreshEnd();
        },2000);

    }

    onLoadMore(PullRefresh) {
      setTimeout(()=>{

            this.data = self.data.concat(['列表项(新)']);
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(this.data)
            });
            // PullRefresh.onLoadMoreEnd(); uncomment to end loadmore
        },2000);
      
      console.log('onLoadMore');
    }

    _onRefresh(){
        console.log('========= on refresh =========')
            this.state.isRefreshing = true;
        setTimeout(()=>{
            // setTimeout(()=>{
            this.refs['ptr'].complete();
            this.state.isRefreshing = false;
            this.data = ['列表项'];
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(this.data),
              data: this.data
            });
        // },0);
        },5000);
    }

    _onLoadMore(){
        console.log('========= on loadmore =========')
            this.state.isRefreshing = true;
        setTimeout(()=>{
            this.data = this.data.concat(['列表项(新)','列表项(新)','列表项(新)','列表项(新)'
                ,'列表项(新)','列表项(新)','列表项(新)','列表项(新)','列表项(新)']);
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(this.data),
              data:this.data
            });

            this.state.isRefreshing = false;
            this.refs['ptr'].complete();
        console.log('========= on loadmore =========2')
        },2000);
    }

    render() {
        return (
            <PtrListView
                ref="ptr"
                ptr_onRefresh={() => {  this._onRefresh();}} // 刷新回调的方法
                ptr_enableRefresh={true} // 是否打开下拉刷新

                // isOnLoadMore={this.state.LoadMore} // 控制刷新状态,true 开始刷新，false 停止刷新
                ptr_onLoadMore={() => {  this._onLoadMore();}} // 刷新回调的方法
                ptr_enableLoadMore={true} // 是否打开下拉刷新

                data={this.state.data}
                // renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
                renderItem={(rowData) => <View style={styles.rowItem}><Text style={{fontSize:16}}>ok</Text></View>}
                extraData={this.state}
                keyExtractor= {(item, index) => index}
                //   dataSource={this.state.dataSource}
                // renderRow={this._renderRow}
                // renderHeader={this._renderHeader}
                // initialListSize={3}
                // automaticallyAdjustContentInsets={false}

                // enableEmptySections={true}
            />
            );
    }

    renderw(){
        return (
            <View style={styles.container}>

<PtrScrollView
ref="ptr"
// isOnPullToRefresh={this.state.isRefreshing} // 控制刷新状态,true 开始刷新，false 停止刷新
onRefresh={() => {  this._onRefresh();}} // 刷新回调的方法
enableRefresh={true} // 是否打开下拉刷新

// isOnLoadMore={this.state.LoadMore} // 控制刷新状态,true 开始刷新，false 停止刷新
onLoadMore={() => {  this._onLoadMore();}} // 刷新回调的方法
enableLoadMore={true} // 是否打开下拉刷新
>
                <ListView
 style={{flex:1}}
                    //renderScrollComponent={(props) => <PullRefreshScrollView onRefresh={(PullRefresh)=>this.onRefresh(PullRefresh)} onLoadMore={(PullRefresh)=>this.onLoadMore(PullRefresh)} useLoadMore={1}{...props} />}
                    // renderScrollComponent={(props) => <PtrScrollView 
                    //     // onRefresh={(PullRefresh)=>this.onRefresh(PullRefresh)} 
                    //     // onLoadMore={(PullRefresh)=>this.onLoadMore(PullRefresh)} 
                    //     // useLoadMore={1}{...props} 
                    //     />}

                    dataSource={this.state.dataSource}
                    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
                    renderRow={(rowData) => <View style={styles.rowItem}><Text style={{fontSize:16}}>{rowData}</Text></View>}
                
                  //   dataSource={this.state.dataSource}
                  // renderRow={this._renderRow}
                  // renderHeader={this._renderHeader}
                  initialListSize={3}
                  automaticallyAdjustContentInsets={false}

                />
                </PtrScrollView>
            </View>

        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'green'
    },
    header:{
        height:64,
        backgroundColor: '#293447',
    },
    rowItem:{
        flex:1,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'red'
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
      },
});


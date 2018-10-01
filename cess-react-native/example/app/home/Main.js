/**
 * Created by panda on 2017/1/18.
 */
import React, {Component} from 'react';
import {
    View,
    StatusBar,
    ToolbarAndroid,
    ScrollView,
    ToastAndroid,
    ListView,
    StyleSheet,
    Text
} from 'react-native';
//import PtrFrame from '../../src/PtrComponent';

export default class extends Component {

    constructor(){
        super();
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.data = ['有种你滑我啊', '有种你滑我啊', '有种你滑我啊', '有种你滑我啊', '有种你滑我啊', '有种你滑我啊', '有种你滑我啊', '有种你滑我啊', '有种你滑我啊', '有种你滑我啊'];
        this.state = {
            dataSource: ds.cloneWithRows(this.data),

        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
               
                
            <ScrollView
                    ref='ptr'
                    handleRefresh={() => this._getData()}
                    durationToCloseHeader={300}
                    durationToClose={200}
                    resistance={2}
                    pinContent={false}
                    ratioOfHeaderHeightToRefresh={1.2}
                    pullToRefresh={false}
                    keepHeaderWhenRefresh={true}
                    style={{flex: 1}}>
                        
                        <View style={{backgroundColor: '#00AAAA', height: 200}}/>
                        
                       
                
                </ScrollView>
            </View>
        );

        //<ListView

                //     // renderScrollComponent={(props) => <PtrFrame 
                //     //     onPtrRefresh={(PullRefresh)=>this.onRefresh(PullRefresh)} 
                //     //     onPtrLoadMore={(PullRefresh)=>this.onLoadMore(PullRefresh)} 
                //     //     useLoadMore={1}{...props} 
                //     //     />}

                //     dataSource={this.state.dataSource}
                //     renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
                //     renderRow={(rowData) => <View style={styles.rowItem}><Text style={{fontSize:16}}>{rowData}</Text></View>}
                // />
    };

    _getData() {
        ToastAndroid.show("refreshing", ToastAndroid.SHORT);
        this.timer = setTimeout(() => {
            this.refs.ptr.refreshComplete();
        }, 1500);
    };

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header:{
        height:64,
        backgroundColor: '#293447',
    },
    rowItem:{
        flex:1,
        height:50,
        alignItems:'center',
        justifyContent:'center'
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
      },
});

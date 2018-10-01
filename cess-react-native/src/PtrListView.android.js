/**
 *
 * @providesModule PtrListView
 * @flow
 */

'use strict';
import React, { 
    Component
} from 'react';
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
    InteractionManager,
    AppRegistry,
    Platform,
    FlatList
} from 'react-native';

const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

import PtrScrollView from './PtrScrollView';

var DEFAULT_PAGE_SIZE = 1;
var DEFAULT_INITIAL_ROWS = 10;
var DEFAULT_SCROLL_RENDER_AHEAD = 1000;
var DEFAULT_END_REACHED_THRESHOLD = 1000;
var DEFAULT_SCROLL_CALLBACK_THROTTLE = 50;

export default class PtrListView extends Component {
    static propTypes = {
        ...FlatList.propTypes,
        ptr_enableRefresh: PropTypes.bool,
        ptr_onRefresh: PropTypes.func,
        ptr_enableLoadMore: PropTypes.bool,
        ptr_onLoadMore: PropTypes.func,
        ptr_fefreshing:PropTypes.bool
    }

    static defaultProps = {
        initialListSize: DEFAULT_INITIAL_ROWS,
        pageSize: DEFAULT_PAGE_SIZE,
        renderScrollComponent: props => <ScrollView {...props} />,
        scrollRenderAheadDistance: DEFAULT_SCROLL_RENDER_AHEAD,
        onEndReachedThreshold: DEFAULT_END_REACHED_THRESHOLD,
        stickySectionHeadersEnabled: true,
        stickyHeaderIndices: [],
        ptr_fefreshing:false
    }

    // componentWillReceiveProps(nextProps) {
    //     if (!nextProps.ptr_fefreshing) {
    //         this.complete();
    //     }
    // }
    constructor(props) {
        super(props);
        // this.state= {
        //     dataSource : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        //     .cloneWithRows([])
        // };
    }

    _refresh(){
        setTimeout(()=>{
            this.props.ptr_onRefresh && this.props.ptr_onRefresh();
        },0);
    }

    _loadMore(){
        setTimeout(()=>{
            this.props.ptr_onLoadMore && this.props.ptr_onLoadMore();
        },0);
    }
    autoRefresh() {
        setTimeout(()=>{
            this.ptr && this.ptr.autoRefresh();
        },0);
    }

    autoLoadMore() {
        setTimeout(()=>{
            this.ptr && this.ptr.autoLoadMore();
        },0);
    }

    complete(){
        setTimeout(()=>{
            this.ptr && this.ptr.complete();
        },0);
    }

    // componentWillReceiveProps(nextProps: Object) {
    //     if (this.props.data !== nextProps.data ||
    //         this.props.initialListSize !== nextProps.initialListSize) {

    //         setTimeout(()=>{
    //             // this.refs["list"].props.dataSource = this.props.dataSource;
    //             this.setState({
    //                 data:this.props.data
    //             });
    //         },0);       
    //     }
    // }

    render() {
        var Component = this.props.component || FlatList;
        return (
            <PtrScrollView
                ref={v => this.ptr = v}
                style={{flex:1}}
                // isOnPullToRefresh={this.state.isRefreshing} // 控制刷新状态,true 开始刷新，false 停止刷新
                onRefresh={() => {this._refresh();}} // 刷新回调的方法
                enableRefresh={this.props.ptr_enableRefresh} // 是否打开下拉刷新

                // isOnLoadMore={this.state.LoadMore} // 控制刷新状态,true 开始刷新，false 停止刷新
                onLoadMore={() => {this._loadMore();}} // 刷新回调的方法
                enableLoadMore={this.props.ptr_enableLoadMore} // 是否打开下拉刷新
                >
                <Component
                    style={{flex:1}}
                    //renderScrollComponent={(props) => <PullRefreshScrollView onRefresh={(PullRefresh)=>this.onRefresh(PullRefresh)} onLoadMore={(PullRefresh)=>this.onLoadMore(PullRefresh)} useLoadMore={1}{...props} />}
                    // renderScrollComponent={(props) => <PtrScrollView 
                    //     // onRefresh={(PullRefresh)=>this.onRefresh(PullRefresh)} 
                    //     // onLoadMore={(PullRefresh)=>this.onLoadMore(PullRefresh)} 
                    //     // useLoadMore={1}{...props} 
                    //     />}
                    {...this.props}
                    // dataSource={this.state.dataSource}
                />
            </PtrScrollView>
        );
    }
}

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule PtrScrollView
 * @flow
 */

'use strict';
import React from 'react';
// import {
//     View,
//     EdgeInsetsPropType,
//     PointPropType
// } from 'react-native';
// const StyleSheetPropType = require('StyleSheetPropType');

// import React from 'react-native';
import ReactNative,{
    ColorPropType,
    EdgeInsetsPropType,
    Platform,
    PointPropType,
    ScrollResponder,
    StyleSheet,
    View,
    ViewPropTypes,
    ScrollView
} from 'react-native';;

const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

import PtrScrollViewComponent from './PtrScrollViewComponent'


// createReactClass({
//   displayName: 'ScrollView',
//   mixins: [ScrollResponder.Mixin],

var PtrScrollView = createReactClass({

    propTypes: {
        ...ViewPropTypes,
        ...ScrollView.propTypes,
        //     enablePullToRefresh: PropTypes.bool,
        // isOnPullToRefresh: PropTypes.bool,
        //     onRefreshData: PropTypes.func,


        //     enableLoadMore: PropTypes.bool,
        // isOnLoadMore: PropTypes.bool,
        // onLoadMoreData: PropTypes.func,
        enableRefresh: PropTypes.bool,
        // isOnPullToRefresh: PropTypes.bool,
        onRefresh: PropTypes.func,


        enableLoadMore: PropTypes.bool,
        // isOnLoadMore: PropTypes.bool,
        onLoadMore: PropTypes.func,
        ptr_fefreshing:PropTypes.bool,

    },
    mixins: [ScrollView.MIXIN],

    componentWillReceiveProps: function(nextProps) {
        if (!nextProps.ptr_fefreshing) {
            this.complete();
        }

        setTimeout(()=>{
            this.setEnableRefresh(this.props.enableRefresh || false);
            this.setEnableLoadMore(this.props.enableLoadMore || false);
        });
    },

    //defaultProps: { initialValue: '' } // 设置 initial state 
    getInitialState: function() { 
        return { enableRefresh: this.props.enableRefresh || false,
            enableLoadMore: false
        }; 
    },

    recalcSize: function(){
        
        this.ptr && this.ptr.refresh();
        // this.setEnableRefresh(this.props.enableRefresh || false);
        // this.setEnableLoadMore(this.props.enableLoadMore || false);

        this.timeoutId = setTimeout(()=>{
            this.recalcSize();
        },600);
    },

    componentWillUnmount: function(){
        if(this.timeoutId){
            clearTimeout(this.timeoutId);
        }
    },

    componentDidMount: function(){
        this.setEnableRefresh(this.props.enableRefresh || false);
        setTimeout(()=>{
            this.setEnableLoadMore(this.props.enableLoadMore || false);
            this.recalcSize();
        },0);
    },

    setEnableRefresh: function(value){
        this.state.enableRefresh = value;
        this.setNativeProps({
            enablePullToRefresh : value
        });
    },

    setEnableLoadMore: function(value){
        this.state.enableLoadMore = value;
        setTimeout(()=>{
            this.setNativeProps({
                enableLoadMore : value
            });
        },0);
    },

    autoRefresh: function() {
        this.ptr && this.ptr.startPullToRefresh();
    },

    _stopPullToRefresh: function() {
        this.ptr && this.ptr.stopPullToRefresh();
    },

    autoLoadMore: function() {
        this.ptr && this.ptr.startLoadMore();
    },

    _stopLoadMore: function() {
        this.ptr && this.ptr.stopLoadMore();
    },

    getPtrState: function(){
        return this.ptrState;
    },

    complete: function(){
        setTimeout(() => {
            if(this.ptrState == 'refresh'){
                this._stopPullToRefresh();
            }else if(this.ptrState == 'loadMore'){
                this._stopLoadMore();
            }
            setTimeout(()=>{
                this.setEnableRefresh(this.props.enableRefresh || false);
                this.setEnableLoadMore(this.props.enableLoadMore || false);
            });
            this.ptrState = ''
        },500);
    },

    // getInitialState: function() {
    //     return this.ptr && this.ptr.getInitialState();
    // },

    setNativeProps: function(props: Object) {
        this.ptr && this.ptr && this.ptr && this.ptr.setNativeProps(props);
    },

    getScrollResponder: function(): PtrScrollViewComponent {
        return this.ptr && this.ptr.getScrollResponder();
    },

    getScrollableNode: function(): any {
        return this.ptr && this.ptr.getScrollableNode();
    },

    getInnerViewNode: function(): any {
        return this.ptr && this.ptr.getInnerViewNode();
    },

    scrollTo: function(
        y?: number | { x?: number, y?: number, animated?: boolean },
        x?: number,
        animated?: boolean
    ) {
        this.ptr && this.ptr.scrollTo(y,x,animated)
    },

  /**
   * If this is a vertical ScrollView scrolls to the bottom.
   * If this is a horizontal ScrollView scrolls to the right.
   *
   * Use `scrollToEnd({animated: true})` for smooth animated scrolling,
   * `scrollToEnd({animated: false})` for immediate scrolling.
   * If no options are passed, `animated` defaults to true.
   */
    scrollToEnd: function(
        options?: { animated?: boolean },
    ) {
        this.ptr && this.ptr.scrollToEnd(options);
    },

  /**
   * Deprecated, use `scrollTo` instead.
   */
    scrollWithoutAnimationTo: function(y: number = 0, x: number = 0) {
        this.ptr && this.ptr.scrollWithoutAnimationTo(y,x);
    },

    _onRefreshData: function(){
        this.setEnableLoadMore(false);
        this.ptrState = 'refresh'
        this.props.onRefresh && this.props.onRefresh();
    },

    _onLoadMoreData: function(){
        this.setEnableRefresh(false);
        this.ptrState = 'loadMore'
        this.props.onLoadMore && this.props.onLoadMore();
    },

    render: function(){

        return (
            <PtrScrollViewComponent

             {...this.props}
                ref={v => this.ptr = v}
                enablePullToRefresh={this.state.enableRefresh || false}
                onRefreshData={this._onRefreshData.bind(this)}

                enableLoadMore={this.state.enableLoadMore}
                onLoadMoreData={this._onLoadMoreData.bind(this)}
             />
            )
    }
});

export default PtrScrollView;
// module.exports = PtrScrollView;
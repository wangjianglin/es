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

export default class PtrScrollView extends ScrollView{

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

    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.ptr_fefreshing) {
            this.complete();
        }

        setTimeout(()=>{
            this.setEnableRefresh(this.props.enableRefresh || false);
            this.setEnableLoadMore(this.props.enableLoadMore || false);
        });
    }

    //defaultProps: { initialValue: '' } // 设置 initial state 
    getInitialState() { 
        return { enableRefresh: this.props.enableRefresh || false,
            enableLoadMore: false
        }; 
    }

    recalcSize(){
        
        this.ptr && this.ptr.refresh();
        this.setEnableRefresh(this.props.enableRefresh || false);
        this.setEnableLoadMore(this.props.enableLoadMore || false);

        this.timeoutId = setTimeout(()=>{
            this.recalcSize();
        },600);
    }

    componentWillUnmount(){
        if(this.timeoutId){
            clearTimeout(this.timeoutId);
        }
    }

    componentDidMount(){
        debugger
        this.setEnableRefresh(this.props.enableRefresh || false);
        setTimeout(()=>{
            this.setEnableLoadMore(this.props.enableLoadMore || false);
            this.recalcSize();
        },0);
    }

    setEnableRefresh(value){
        this.state.enableRefresh = value;
        this.setNativeProps({
            enablePullToRefresh : value
        });
    }

    setEnableLoadMore(value){
        this.state.enableLoadMore = value;
        // setTimeout(()=>{
            this.setNativeProps({
                enableLoadMore : value
            });
        // },0);
    }

    autoRefresh() {
        this.ptr && this.ptr.startPullToRefresh();
    }

    _stopPullToRefresh() {
        this.ptr && this.ptr.stopPullToRefresh();
    }

    autoLoadMore() {
        this.ptr && this.ptr.startLoadMore();
    }

    _stopLoadMore() {
        this.ptr && this.ptr.stopLoadMore();
    }

    getPtrState(){
        return this.ptrState;
    }

    complete(){
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
    }

    // getInitialState: function() {
    //     return this.ptr && this.ptr.getInitialState();
    // },

    setNativeProps(props: Object) {
        this.ptr && this.ptr && this.ptr && this.ptr.setNativeProps(props);
    }

    getScrollResponder(): PtrScrollViewComponent {
        return this.ptr && this.ptr.getScrollResponder();
    }

    getScrollableNode(): any {
        return this.ptr && this.ptr.getScrollableNode();
    }

    getInnerViewNode(): any {
        return this.ptr && this.ptr.getInnerViewNode();
    }

    scrollTo(
        y?: number | { x?: number, y?: number, animated?: boolean },
        x?: number,
        animated?: boolean
    ) {
        this.ptr && this.ptr.scrollTo(y,x,animated)
    }

  /**
   * If this is a vertical ScrollView scrolls to the bottom.
   * If this is a horizontal ScrollView scrolls to the right.
   *
   * Use `scrollToEnd({animated: true})` for smooth animated scrolling,
   * `scrollToEnd({animated: false})` for immediate scrolling.
   * If no options are passed, `animated` defaults to true.
   */
    scrollToEnd(
        options?: { animated?: boolean },
    ) {
        this.ptr && this.ptr.scrollToEnd(options);
    }

  /**
   * Deprecated, use `scrollTo` instead.
   */
    scrollWithoutAnimationTo(y: number = 0, x: number = 0) {
        this.ptr && this.ptr.scrollWithoutAnimationTo(y,x);
    }

    _onRefreshData(){
        this.setEnableLoadMore(false);
        this.ptrState = 'refresh'
        this.props.onRefresh && this.props.onRefresh();
    }

    _onLoadMoreData(){
        this.setEnableRefresh(false);
        this.ptrState = 'loadMore'
        this.props.onLoadMore && this.props.onLoadMore();
    }

    render(){

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
};

// module.exports = PtrScrollView;
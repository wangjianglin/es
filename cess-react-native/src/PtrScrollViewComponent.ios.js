/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';


import React, { 
    Component
} from 'react';
import ReactNative,{
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
    EdgeInsetsPropType,
    PointPropType,
    ColorPropType,
    requireNativeComponent,
    UIManager,
    ViewPropTypes
} from 'react-native';

// const ColorPropType = require('ColorPropType');
// const EdgeInsetsPropType = require('EdgeInsetsPropType');
// const Platform = require('Platform');
// const PointPropType = require('PointPropType');
// const React = require('React');
// const ReactNative = require('ReactNative');
// const ScrollResponder = require('ScrollResponder');
// const StyleSheet = require('StyleSheet');
// const StyleSheetPropType = require('StyleSheetPropType');
// const View = require('View');
// const ViewStylePropTypes = require('ViewStylePropTypes');

// const dismissKeyboard = require('dismissKeyboard');
// const flattenStyle = require('flattenStyle');
// const invariant = require('fbjs/lib/invariant');
import flattenStyle2 from './flattenStyle2';
import invariant from 'fbjs/lib/invariant';
// import ScrollResponder from 'ScrollResponder';

// const processDecelerationRate = require('processDecelerationRate');
// const PropTypes = React.PropTypes;
// const requireNativeComponent = require('requireNativeComponent');
// var UIManager = require('UIManager');

const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

/**
 * Component that wraps platform ScrollView while providing
 * integration with touch locking "responder" system.
 *
 * Keep in mind that ScrollViews must have a bounded height in order to work,
 * since they contain unbounded-height children into a bounded container (via
 * a scroll interaction). In order to bound the height of a ScrollView, either
 * set the height of the view directly (discouraged) or make sure all parent
 * views have bounded height. Forgetting to transfer `{flex: 1}` down the
 * view stack can lead to errors here, which the element inspector makes
 * easy to debug.
 *
 * Doesn't yet support other contained responders from blocking this scroll
 * view from becoming the responder.
 *
 *
 * `<ScrollView>` vs `<ListView>` - which one to use?
 * ScrollView simply renders all its react child components at once. That
 * makes it very easy to understand and use.
 * On the other hand, this has a performance downside. Imagine you have a very
 * long list of items you want to display, worth of couple of your ScrollView’s
 * heights. Creating JS components and native views upfront for all its items,
 * which may not even be shown, will contribute to slow rendering of your
 * screen and increased memory usage.
 *
 * This is where ListView comes into play. ListView renders items lazily,
 * just when they are about to appear. This laziness comes at cost of a more
 * complicated API, which is worth it unless you are rendering a small fixed
 * set of items.
 */
 class PtrScrollViewComponent extends ScrollView{

    static propTypes = {
        ...ScrollView.propTypes,

        enablePullToRefresh: PropTypes.bool,
        isOnPullToRefresh: PropTypes.bool,
        onRefreshData: PropTypes.func,


        enableLoadMore: PropTypes.bool,
        isOnLoadMore: PropTypes.bool,
        onLoadMoreData: PropTypes.func
    }
    startPullToRefresh() {
      // RCTPtrScrollViewManager.startPullToRefresh(
      //     ReactNative.findNodeHandle(this)
      // );
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(this),
            UIManager.RCTPtrScrollView.Commands.startPullToRefresh,
            [],
        );
    }

    refresh() {
      // RCTPtrScrollViewManager.startPullToRefresh(
      //     ReactNative.findNodeHandle(this)
      // );
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(this),
            UIManager.RCTPtrScrollView.Commands.refresh,
            [],
        );
    }

    stopPullToRefresh() {
    // RCTPtrScrollViewManager.stopPullToRefresh(
    //     ReactNative.findNodeHandle(this)
    // );
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(this),
            UIManager.RCTPtrScrollView.Commands.stopPullToRefresh,
            [],
        );
    }

    startLoadMore() {
        // RCTPtrScrollViewManager.startPullToRefresh(
        //     ReactNative.findNodeHandle(this)
        // );
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(this),
            UIManager.RCTPtrScrollView.Commands.startLoadMore,
            [],
        );
    }

    stopLoadMore() {
    // RCTPtrScrollViewManager.stopPullToRefresh(
    //     ReactNative.findNodeHandle(this)
    // );
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(this),
            UIManager.RCTPtrScrollView.Commands.stopLoadMore,
            [],
        );
    }

    render() {
        const contentContainerStyle = [
            this.props.horizontal && styles.contentContainerHorizontal,
            this.props.contentContainerStyle,
        ];
        let style, childLayoutProps;
        if (__DEV__ && this.props.style) {
            style = flattenStyle2(this.props.style);
            childLayoutProps = ['alignItems', 'justifyContent']
                .filter((prop) => style && style[prop] !== undefined);
            invariant(
                childLayoutProps.length === 0,
                'ScrollView child layout (' + JSON.stringify(childLayoutProps) +
                ') must be applied through the contentContainerStyle prop.'
            );
        }

        let contentSizeChangeProps = {};
        if (this.props.onContentSizeChange) {
            contentSizeChangeProps = {
                onLayout: this._handleContentOnLayout,
            };
        }

        const contentContainer =
            <View
                {...contentSizeChangeProps}
                ref={this._setInnerViewRef}
                style={contentContainerStyle}
                removeClippedSubviews={this.props.removeClippedSubviews}
                collapsable={false}>
                    {this.props.children}
            </View>;

        const alwaysBounceHorizontal =
            this.props.alwaysBounceHorizontal !== undefined ?
            this.props.alwaysBounceHorizontal :
            this.props.horizontal;

        const alwaysBounceVertical =
            this.props.alwaysBounceVertical !== undefined ?
            this.props.alwaysBounceVertical :
            this.props.horizontal;

        const baseStyle = this.props.horizontal ? styles.baseHorizontal : styles.baseVertical;
        const props = {
            ...this.props,
            alwaysBounceHorizontal,
            alwaysBounceVertical,
            style: ([baseStyle, this.props.style]: ?Array<any>),
            // Override the onContentSizeChange from props, since this event can
            // bubble up from TextInputs
            onContentSizeChange: null,
            onTouchStart: this.scrollResponderHandleTouchStart,
            onTouchMove: this.scrollResponderHandleTouchMove,
            onTouchEnd: this.scrollResponderHandleTouchEnd,
            onScrollBeginDrag: this.scrollResponderHandleScrollBeginDrag,
            onScrollEndDrag: this.scrollResponderHandleScrollEndDrag,
            onMomentumScrollBegin: this.scrollResponderHandleMomentumScrollBegin,
            onMomentumScrollEnd: this.scrollResponderHandleMomentumScrollEnd,
            onStartShouldSetResponder: this.scrollResponderHandleStartShouldSetResponder,
            onStartShouldSetResponderCapture: this.scrollResponderHandleStartShouldSetResponderCapture,
            onScrollShouldSetResponder: this.scrollResponderHandleScrollShouldSetResponder,
            onScroll: this._handleScroll,
            onResponderGrant: this.scrollResponderHandleResponderGrant,
            onResponderTerminationRequest: this.scrollResponderHandleTerminationRequest,
            onResponderTerminate: this.scrollResponderHandleTerminate,
            onResponderRelease: this.scrollResponderHandleResponderRelease,
            onResponderReject: this.scrollResponderHandleResponderReject,
            sendMomentumEvents: (this.props.onMomentumScrollBegin || this.props.onMomentumScrollEnd) ? true : false,
        };

        const { decelerationRate } = this.props;
        if (decelerationRate) {
            props.decelerationRate = processDecelerationRate(decelerationRate);
        }

        let ScrollViewClass;
        // if (Platform.OS === 'ios') {
        ScrollViewClass = RCTPtrScrollView;
        // } else if (Platform.OS === 'android') {
        //   if (this.props.horizontal) {
        //     ScrollViewClass = AndroidHorizontalScrollView;
        //   } else {
        //     ScrollViewClass = AndroidScrollView;
        //   }
        // }
        invariant(
            ScrollViewClass !== undefined,
            'ScrollViewClass must not be undefined'
        );

        const refreshControl = this.props.refreshControl;
        if (refreshControl) {
            if (Platform.OS === 'ios') {
            // On iOS the RefreshControl is a child of the ScrollView.
                return (
                    <ScrollViewClass {...props} ref={this._setScrollViewRef}>
                        {refreshControl}
                        {contentContainer}
                    </ScrollViewClass>
                );
            } else if (Platform.OS === 'android') {
            // On Android wrap the ScrollView with a AndroidSwipeRefreshLayout.
            // Since the ScrollView is wrapped add the style props to the
            // AndroidSwipeRefreshLayout and use flex: 1 for the ScrollView.
            // Note: we should only apply props.style on the wrapper
            // however, the ScrollView still needs the baseStyle to be scrollable

                return React.cloneElement(
                    refreshControl,
                    {style: props.style},
                    <ScrollViewClass {...props} style={baseStyle} ref={this._setScrollViewRef}>
                        {contentContainer}
                    </ScrollViewClass>
                );
            }
        }
        return (
            <ScrollViewClass {...props} ref={this._setScrollViewRef}>
                {contentContainer}
            </ScrollViewClass>
        );
    }
 }


const styles = StyleSheet.create({
    baseVertical: {
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: 'column',
        overflow: 'scroll',
    },
    baseHorizontal: {
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: 'row',
        overflow: 'scroll',
    },
    contentContainerHorizontal: {
        flexDirection: 'row',
    },
});

let nativeOnlyProps, AndroidScrollView, AndroidHorizontalScrollView, RCTPtrScrollView;
if (Platform.OS === 'android') {
    nativeOnlyProps = {
        nativeOnly: {
            sendMomentumEvents: true,
        }
    };
    AndroidScrollView = requireNativeComponent('RCTScrollView', ScrollView, nativeOnlyProps);
    AndroidHorizontalScrollView = requireNativeComponent(
        'AndroidHorizontalScrollView',
        ScrollView,
        nativeOnlyProps
    );
} else if (Platform.OS === 'ios') {
    nativeOnlyProps = {
        nativeOnly: {
            onMomentumScrollBegin: true,
            onMomentumScrollEnd : true,
            onScrollBeginDrag: true,
            onScrollEndDrag: true,
        }
    };
    RCTPtrScrollView = requireNativeComponent('RCTPtrScrollView', PtrScrollViewComponent, nativeOnlyProps);
}

module.exports = PtrScrollViewComponent;

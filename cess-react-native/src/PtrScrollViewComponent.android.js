import React, {
    Component
} from 'react';
import ReactNative,{
    requireNativeComponent,
    View,
    ToastAndroid,
    UIManager
} from 'react-native';

const PropTypes = require('prop-types');

const REF_PTR = "ptr_ref";

export default class PtrComponent extends Component {
    constructor(props) {
        super(props);
        //this._onRefresh = this._onRefresh.bind(this);
    }

    // _onRefresh() {
    //     if (!this.props.handleRefresh) {
    //         return;
    //     }
    //     this.props.handleRefresh();
    // };

    // _onLoadMore() {
    //     ToastAndroid.show("load more", ToastAndroid.SHORT);
    //     this.timer = setTimeout(() => {
    //         //this.refs[REF_PTR].refreshComplete();
    //         this.refreshComplete();
    //     }, 1500);
    // }

    /**
     * 自动刷新
     */
    autoRefresh() {
        let self = this;
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(self),
            UIManager.RCTPtrAndroid.Commands.autoRefresh,
            null
        );
    }

    /**
     * 自动刷新
     */
    autoLoadMore() {
        let self = this;
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(this),
            UIManager.RCTPtrAndroid.Commands.autoLoadMore,
            null
        );
    }

    /**
     * 刷新完成
     */
    complete() {
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(this),
            UIManager.RCTPtrAndroid.Commands.complete,
            null
        );
    }

    render() {
        // onPtrRefresh 事件对应原生的ptrRefresh事件
        return (
            <RCTPtrAndroid
                {...this.props}/>
        );
    }
}

PtrComponent.name = "RCTPtrAndroid"; //便于调试时显示(可以设置为任意字符串)
PtrComponent.propTypes = {
    handleRefresh: PropTypes.func,
    // resistance: PropTypes.number,
    // durationToCloseHeader: PropTypes.number,
    // durationToClose: PropTypes.number,
    // ratioOfHeaderHeightToRefresh: PropTypes.number,
    pullToRefresh: PropTypes.bool,
    loadMore: PropTypes.bool,
    keepHeaderWhenRefresh: PropTypes.bool,
    pinContent: PropTypes.bool,
    ...View.propTypes,
};

const RCTPtrAndroid = requireNativeComponent('RCTPtrAndroid', PtrComponent, {
    nativeOnly: {onPtrRefresh: true,
        onPtrLoadMore:true
    }
});
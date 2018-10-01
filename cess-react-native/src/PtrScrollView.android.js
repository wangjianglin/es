import React, {
    Component
} from 'react';
import ReactNative,{
    requireNativeComponent,
    View,
    ToastAndroid,
    UIManager,
    ViewPropTypes
} from 'react-native';

const PropTypes = require('prop-types');
// const UIManager = require('UIManager');
// const ReactNative = require('ReactNative');

import PtrScrollViewComponent from './PtrScrollViewComponent'


export default class PtrScrollView extends Component {

    static propTypes={
        ...ViewPropTypes,
        enableRefresh: PropTypes.bool,
        onRefresh: PropTypes.func,

        enableLoadMore: PropTypes.bool,
        onLoadMore: PropTypes.func
    }
    constructor(props) {
        super(props);
        //this._onRefresh = this._onRefresh.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.ptr_fefreshing) {
            this.complete();
        }
    }

    _onRefresh() {
        this.ptrState = 'refresh';
        this.props.onRefresh && this.props.onRefresh();
    };

    _onLoadMore() {
        this.ptrState = 'loadMore';
        this.props.onLoadMore && this.props.onLoadMore();
    }

    /**
     * 自动刷新
     */
    autoRefresh() {
        this.ptr && this.ptr.autoRefresh();
    }

    /**
     * 自动刷新
     */
    autoLoadMore() {
        this.ptr && this.ptr.autoLoadMore();
    }

    getPtrState(){
        return this.ptrState;
    }

    /**
     * 刷新完成
     */
    complete() {
        this.ptrState = '';
        this.ptr && this.ptr.complete();
    }

    render() {
        // onPtrRefresh 事件对应原生的ptrRefresh事件
        return (
            <PtrScrollViewComponent
                {...this.props}
                ref={v => this.ptr = v}
                loadMore={this.props.enableLoadMore}
                pullToRefresh={this.props.enableRefresh}
                onPtrRefresh={() => this._onRefresh()}
                onPtrLoadMore={()=> this._onLoadMore()}/>
        );
    }
}

// PtrComponent.name = "RCTPtrAndroid"; //便于调试时显示(可以设置为任意字符串)
// PtrComponent.propTypes = {
//     handleRefresh: PropTypes.func,
//     resistance: PropTypes.number,
//     durationToCloseHeader: PropTypes.number,
//     durationToClose: PropTypes.number,
//     ratioOfHeaderHeightToRefresh: PropTypes.number,
//     pullToRefresh: PropTypes.bool,
//     keepHeaderWhenRefresh: PropTypes.bool,
//     pinContent: PropTypes.bool,
//     ...View.propTypes,
// };

// const RCTPtrAndroid = requireNativeComponent('RCTPtrAndroid', PtrComponent, {
//     nativeOnly: {onPtrRefresh: true,
//         onPtrLoadMore:true
//     }
// });
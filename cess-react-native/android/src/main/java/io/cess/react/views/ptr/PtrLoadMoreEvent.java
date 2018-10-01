package io.cess.react.views.ptr;

import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;


/**
 * Created by panda on 2016/12/9 上午10:12.
 */
public class PtrLoadMoreEvent extends Event<PtrLoadMoreEvent> {

    public PtrLoadMoreEvent(int viewId, long timestampMs) {
        super(viewId);
    }

    @Override
    public String getEventName() {
        return "ptrLoadMore";
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), null);
    }
}

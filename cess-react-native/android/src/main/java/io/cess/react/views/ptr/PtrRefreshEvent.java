package io.cess.react.views.ptr;

import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;


/**
 * Created by panda on 2016/12/9 上午10:12.
 */
public class PtrRefreshEvent extends Event<PtrRefreshEvent> {

    public PtrRefreshEvent(int viewId, long timestampMs) {
        super(viewId);
    }

    @Override
    public String getEventName() {
        return "ptrRefresh";
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), null);
    }
}

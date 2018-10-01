package io.cess.react.views.ptr;

import android.content.Context;
import android.util.AttributeSet;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
//import com.sgb.library.ptr.PtrClassicFrameLayout;
//import com.sgb.library.ptr.PtrDefaultHandler;
//import com.sgb.library.ptr.PtrFrameLayout;

import java.util.Date;
import java.util.Map;

import javax.annotation.Nullable;

import io.cess.core.ptr.PtrDefaultView;
import io.cess.core.ptr.PtrView;

class PtrView2 extends PtrDefaultView {
    public PtrView2(Context context) {
        super(context);
    }

    public PtrView2(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public PtrView2(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    private boolean isFinishInflate = false;
    public void setViews(){
        if(isFinishInflate){
            return;
        }
        isFinishInflate = true;
        super.onFinishInflate();
    }

    private boolean mPullToRefresh = false;
    private boolean mLoadMore = false;
    public void setPullToRefresh(boolean pullToRefresh) {
        this.mPullToRefresh = pullToRefresh;
        setModel();
    }


    public void setLoadMore(boolean loadMore) {
        this.mLoadMore = loadMore;
        setModel();
    }

    private void setModel(){
        if(mPullToRefresh && mLoadMore){
            setMode(Mode.Both);
        }else if(mPullToRefresh){
            setMode(Mode.Refresh);
        }else if(mLoadMore){
            setMode(Mode.LoadMore);
        }else{
            setMode(Mode.Disable);
        }
    }
}

/**
 * Created by panda on 2016/12/7 下午4:50.
 */
public class ReactPtrAndroidManager extends ViewGroupManager<PtrView2> {

    private static final int REFRESH_COMPLETE = 0;
    private static final int AUTO_REFRESH = 1;
    private static final int AUTO_LOAD_MORE = 2;

    @Override
    public String getName() {
        return "RCTPtrAndroid";
    }

    @Override
    protected PtrView2 createViewInstance(final ThemedReactContext reactContext) {
        PtrView2 layout = new PtrView2(reactContext);
        layout.setLayoutParams(new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        return layout;
    }

//    @ReactProp(name = "resistance", defaultFloat = 1.7f)
//    public void setResistance(PtrView2 ptr, float resistance) {
////        ptr.setResistance(resistance);
//    }
//
//    @ReactProp(name = "durationToCloseHeader", defaultInt = 200)
//    public void setDurationToCloseHeader(PtrView2 ptr, int duration) {
////        ptr.setDurationToCloseHeader(duration);
//    }
//
//    @ReactProp(name = "durationToClose", defaultInt = 300)
//    public void setDurationToClose(PtrView2 ptr, int duration) {
////        ptr.setDurationToClose(duration);
//    }

//    @ReactProp(name = "ratioOfHeaderHeightToRefresh", defaultFloat = 1.2f)
//    public void setRatioOfHeaderHeightToRefresh(PtrView2 ptr, float ratio) {
////        ptr.setRatioOfHeaderHeightToRefresh(ratio);
//    }

    @ReactProp(name = "pullToRefresh", defaultBoolean = false)
    public void setPullToRefresh(PtrView2 ptr, boolean pullToRefresh) {
        ptr.setPullToRefresh(pullToRefresh);
    }

    @ReactProp(name = "loadMore", defaultBoolean = false)
    public void setLoadMore(PtrView2 ptr, boolean loadMore) {
        ptr.setLoadMore(loadMore);
    }

//    @ReactProp(name = "keepHeaderWhenRefresh", defaultBoolean = false)
//    public void setKeepHeaderWhenRefresh(PtrView2 ptr, boolean keep) {
////        ptr.setKeepHeaderWhenRefresh(keep);
//    }

    @ReactProp(name = "pinContent", defaultBoolean = false)
    public void setPinContent(PtrDefaultView ptr, boolean pinContent) {
        ptr.setPinContent(pinContent);
    }


    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        Map<String, Integer> map = MapBuilder.of("autoRefresh", AUTO_REFRESH, "complete", REFRESH_COMPLETE);
        map.put("autoLoadMore",AUTO_LOAD_MORE);
        return map;
    }

    @Override
    public void receiveCommand(PtrView2 root, int commandId, @Nullable ReadableArray args) {
        switch (commandId) {
            case AUTO_REFRESH:
                root.autoRefresh();
                break;
            case AUTO_LOAD_MORE:
                root.autoLoadMore();
                break;
            case REFRESH_COMPLETE:
                root.complete();
                break;
            default:
                break;
        }
    }

    @Override
    protected void addEventEmitters(final ThemedReactContext reactContext, final PtrView2 view) {
//        view.setLastUpdateTimeRelateObject(this);
//        view.setPtrHandler(new PtrDefaultHandler() {
//            @Override
//            public boolean checkCanDoRefresh(PtrFrameLayout frame, View content, View header) {
//                return checkContentCanBePulledDown(frame, content, header);
//            }
//
//            @Override
//            public void onRefreshBegin(PtrFrameLayout frame) {
//                reactContext
//                        .getNativeModule(UIManagerModule.class)
//                        .getEventDispatcher()
//                        .dispatchEvent(new PtrRefreshEvent(view.getId()));
//            }
//        });
        view.setOnRefreshListener(new PtrView.OnRefreshListener() {
            @Override
            public void onRefresh(PtrView ptrView) {
                reactContext.getNativeModule(UIManagerModule.class)
                        .getEventDispatcher()
                        .dispatchEvent(new PtrRefreshEvent(view.getId(),new Date().getTime()));
            }
        });

        view.setOnLoadMoreListener(new PtrView.OnLoadMoreListener() {
            @Override
            public void onLoadMore(PtrView ptrView) {
                reactContext.getNativeModule(UIManagerModule.class)
                        .getEventDispatcher()
                        .dispatchEvent(new PtrLoadMoreEvent(view.getId(),new Date().getTime()));
            }
        });
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        Map<String,Object> map = MapBuilder.<String, Object>of(
                "ptrRefresh", MapBuilder.of("registrationName", "onPtrRefresh"));
        map.put("ptrLoadMore",MapBuilder.of("registrationName","onPtrLoadMore"));
        return map;
    }

    @Override
    public void addView(PtrView2 parent, View child, int index) {

        super.addView(parent, child, -1);
        parent.setViews();
//        parent.finishInflateRN();
    }
}

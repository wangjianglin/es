/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "RCTPtrScrollView.h"

#import <UIKit/UIKit.h>

#import "React/RCTConvert.h"
#import "React/RCTEventDispatcher.h"
#import "React/RCTLog.h"
#import "React/RCTRefreshControl.h"
#import "React/RCTUIManager.h"
#import "React/RCTUtils.h"
//#import "React/UIView+Private.h"
//#import "React/UIView+React.h"
#import "MJRefresh.h"

CGFloat const PTR_ZINDEX_DEFAULT = 0;
CGFloat const PTR_ZINDEX_STICKY_HEADER = 50;

@interface RCTPtrScrollEvent : NSObject <RCTEvent>

- (instancetype)initWithEventName:(NSString *)eventName
                         reactTag:(NSNumber *)reactTag
                       scrollView:(UIScrollView *)scrollView
                         userData:(NSDictionary *)userData
                    coalescingKey:(uint16_t)coalescingKey NS_DESIGNATED_INITIALIZER;

@end

@implementation RCTPtrScrollEvent
{
  UIScrollView *_scrollView;
  NSDictionary *_userData;
  uint16_t _coalescingKey;
}

@synthesize viewTag = _viewTag;
@synthesize eventName = _eventName;

- (instancetype)initWithEventName:(NSString *)eventName
                         reactTag:(NSNumber *)reactTag
                       scrollView:(UIScrollView *)scrollView
                         userData:(NSDictionary *)userData
                    coalescingKey:(uint16_t)coalescingKey
{
  RCTAssertParam(reactTag);

  if ((self = [super init])) {
    _eventName = [eventName copy];
    _viewTag = reactTag;
    _scrollView = scrollView;
    _userData = userData;
    _coalescingKey = coalescingKey;
  }
  return self;
}

RCT_NOT_IMPLEMENTED(- (instancetype)init)

- (uint16_t)coalescingKey
{
  return _coalescingKey;
}

- (NSDictionary *)body
{
  NSDictionary *body = @{
    @"contentOffset": @{
      @"x": @(_scrollView.contentOffset.x),
      @"y": @(_scrollView.contentOffset.y)
    },
    @"contentInset": @{
      @"top": @(_scrollView.contentInset.top),
      @"left": @(_scrollView.contentInset.left),
      @"bottom": @(_scrollView.contentInset.bottom),
      @"right": @(_scrollView.contentInset.right)
    },
    @"contentSize": @{
      @"width": @(_scrollView.contentSize.width),
      @"height": @(_scrollView.contentSize.height)
    },
    @"layoutMeasurement": @{
      @"width": @(_scrollView.frame.size.width),
      @"height": @(_scrollView.frame.size.height)
    },
    @"zoomScale": @(_scrollView.zoomScale ?: 1),
  };

  if (_userData) {
    NSMutableDictionary *mutableBody = [body mutableCopy];
    [mutableBody addEntriesFromDictionary:_userData];
    body = mutableBody;
  }

  return body;
}

- (BOOL)canCoalesce
{
  return YES;
}

- (RCTPtrScrollEvent *)coalesceWithEvent:(RCTPtrScrollEvent *)newEvent
{
  NSArray<NSDictionary *> *updatedChildFrames = [_userData[@"updatedChildFrames"] arrayByAddingObjectsFromArray:newEvent->_userData[@"updatedChildFrames"]];

  if (updatedChildFrames) {
    NSMutableDictionary *userData = [newEvent->_userData mutableCopy];
    userData[@"updatedChildFrames"] = updatedChildFrames;
    newEvent->_userData = userData;
  }

  return newEvent;
}

+ (NSString *)moduleDotMethod
{
  return @"RCTEventEmitter.receiveEvent";
}

- (NSArray *)arguments
{
  return @[self.viewTag, RCTNormalizeInputEventName(self.eventName), [self body]];
}

@end


@implementation RCTPtrScrollView
{
//  RCTEventDispatcher *_eventDispatcher;
//  RCTPtrCustomScrollView *_scrollView;
//  UIView *_contentView;
//  NSTimeInterval _lastScrollDispatchTime;
//  NSMutableArray<NSValue *> *_cachedChildFrames;
//  BOOL _allowNextScrollNoMatterWhat;
//  CGRect _lastClippedToRect;
//  uint16_t _coalescingKey;
//  NSString *_lastEmittedEventName;
//  NSHashTable *_scrollListeners;
//  NSObject<UIScrollViewDelegate> * _nativeScrollDelegate;
////  DJRefresh * _refresh;
}

//@synthesize nativeScrollDelegate = _nativeScrollDelegate;

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
  RCTAssertParam(eventDispatcher);
    
    self = [super initWithEventDispatcher:eventDispatcher];
  
  return self;
}


//MARK: PullToRefresh
- (void)setEnablePullToRefresh:(BOOL)enablePullToRefresh
{
  _enablePullToRefresh = enablePullToRefresh;
  if (enablePullToRefresh) {
    if (self.scrollView.mj_header == nil) {
      MJRefreshNormalHeader *header = [MJRefreshNormalHeader headerWithRefreshingTarget:self refreshingAction:@selector(refreshData)];
      header.lastUpdatedTimeLabel.hidden = NO;
      header.stateLabel.hidden = NO;
      
      self.scrollView.mj_header = header;
      self.currentRefreshingState = NO;
    }
  }else{
    self.scrollView.mj_header = NULL;
  }
}

- (void)setIsOnPullToRefresh:(BOOL)isOnPullToRefresh
{
  if (_currentRefreshingState != isOnPullToRefresh) {
    _currentRefreshingState = isOnPullToRefresh;
    if (isOnPullToRefresh) {
      [self.scrollView.mj_header beginRefreshing];
      
    } else {
      [self.scrollView.mj_header endRefreshing];
    }
  }
}

-(void)refreshData
{
  _currentRefreshingState = self.scrollView.mj_header.isRefreshing;
  if (_onRefreshData) {
    _onRefreshData(nil);
  }
}


- (void)startPullToRefresh
{
  self.isOnPullToRefresh = YES;
  [self.scrollView.mj_header beginRefreshing];
  
}

- (void)stopPullToRefresh
{
  self.isOnPullToRefresh = NO;
  [self.scrollView.mj_header endRefreshing];
  
    [self updateContentOffsetIfNeeded];
}

//MARK: LoadMore

- (void)setEnableLoadMore:(BOOL)enableLoadMore
{
  _enableLoadMore = enableLoadMore;
  if (enableLoadMore) {
    if (self.scrollView.mj_footer == nil) {
      MJRefreshBackNormalFooter *footer = [MJRefreshBackNormalFooter footerWithRefreshingTarget:self refreshingAction:@selector(loadMoreData)];
//      header.lastUpdatedTimeLabel.hidden = NO;
//      header.stateLabel.hidden = NO;
      
      self.scrollView.mj_footer = footer;
      self.currentLoadMoreState = NO;
    }
  }else{
    self.scrollView.mj_footer = NULL;
  }
}

- (void)setIsOnLoadMore:(BOOL)isOnLoadMore
{
  if (_currentLoadMoreState != isOnLoadMore) {
    _currentLoadMoreState = isOnLoadMore;
    if (isOnLoadMore) {
      [self.scrollView.mj_footer beginRefreshing];
      
    } else {
      [self.scrollView.mj_footer endRefreshing];
    }
  }
}

-(void)loadMoreData
{
  _currentLoadMoreState = self.scrollView.mj_footer.isRefreshing;
  if (_onLoadMoreData) {
    _onLoadMoreData(nil);
  }
}


- (void)startLoadMore
{
  self.isOnLoadMore = YES;
  [self.scrollView.mj_footer beginRefreshing];
  
}

- (void)stopLoadMore
{
  self.isOnLoadMore = NO;
  [self.scrollView.mj_footer endRefreshing];
  [self updateContentOffsetIfNeeded];
}



@end

@implementation RCTEventDispatcher (RCTPtrScrollView)

- (void)sendFakePtrScrollEvent:(NSNumber *)reactTag
{
  // Use the selector here in case the onScroll block property is ever renamed
  NSString *eventName = NSStringFromSelector(@selector(onScroll));
  RCTPtrScrollEvent *fakeScrollEvent = [[RCTPtrScrollEvent alloc] initWithEventName:eventName
                                                                     reactTag:reactTag
                                                                   scrollView:nil
                                                                     userData:nil
                                                                coalescingKey:0];
  [self sendEvent:fakeScrollEvent];
}

@end


//@implementation RCTPtrScrollView
//
//- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
//{
//  RCTAssertParam(eventDispatcher);
//  
//  if ((self = [super initWithEventDispatcher:eventDispatcher])) {
//    
//  }
//  
//  MJRefreshNormalHeader * header = [MJRefreshNormalHeader headerWithRefreshingTarget:self refreshingAction:@selector(refreshData)];
//  header.lastUpdatedTimeLabel.hidden = NO;
//  header.stateLabel.hidden = NO;
//  
//  self.scrollView.mj_header = header;
//  
//  MJRefreshBackNormalFooter * footer = [MJRefreshBackNormalFooter footerWithRefreshingTarget:self refreshingAction:@selector(refreshData)];
//  
//  self.scrollView.mj_footer = footer;
//  
//  //  _scrollView.mj_footer
//  
//  //  _refresh=[[DJRefresh alloc] initWithScrollView:_scrollView delegate:self];
//  //  ///设置显示下拉刷新
//  //  _refresh.topEnabled=YES;
//  //  ///显示加载更多
//  //  _refresh.bottomEnabled=YES;
//  
//  return self;
//}
//
//@end

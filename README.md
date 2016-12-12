# 移动端页面工具类

用于H5页面的工具类，初始化页面状态，检测平台浏览器信息等等

## 功能

1. 设置根字体大小rem px2rem rem2px docW docH dpr
2. 检测内核、平台、版本 OS & browser
3. 检测是否支持webp
4. requestAnimationFrame
5. 日志记录
6. 离线检测
7. 页面可见性


## 使用方式

### 初始化REM

根据设计稿的宽度生成REM的大小，如设计稿是750大小，那么页面上的尺寸就可以完成按照设计稿中的尺寸来写成px了，然后借助px2rem 的postcss插件将px转成rem单位就可自适用各种移动端屏幕了

```javascript
mTools.initREM(size); //size: 设计稿的宽度（默认为750）
window.px2rem(75) = 1;
window.rem2px(1) = 75;
```

### 检测浏览器信息

```javascript
mTools.browser;
//{name: "Chrome", isChrome: true, version: "50.0.2661.75"}
```

### 检测系统平台

```javascript
mTools.os;
//{name: "iPhone", isIPhone: true, isIPad: false, isIOS: true, version: "9.1"}
```

### 是否支持Webp图片

```javascript
mTools.supportWebp(function(isSupport){
  isSupport ? renderWebpImgs() : renderNormalImgs();
});
```

### 是否在线

页面在第一次加载时，网络正常，是不会触发 `online` 事件的，只有当网络断开又连接时，才会同时触发 `online` 和 `offline` 事件

```javascript
//new mTools.Network(onlineFn, offlineFn)
new mTools.Network(function(){
  document.getElementById('networkTip').style.display='block';
}, function(){
  document.getElementById('networkTip').style.display='none';
})
```

### 页面是否可见

```javascript
//mTools.pageVisiblity(visibleFn, hideFn)

mTools.pageVisiblity(function(){
  console.log('页面可见', Date())
}, function(){
  console.log('页面不可见', Date())
})
```

### 打印错误日志

```javascript
window.onerror = function(err){ mTools.log(err) }
```

### 获取 requestAnimationFrame 对象

```javascript
mTools.rAF(function(){
//实时更新DOM
});
```

待更新
hotfix

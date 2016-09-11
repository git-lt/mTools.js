# 移动端页面工具类

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

```
mTools.initREM();
```


### 检测浏览器信息

```
mTools.browser();
//
```

### 检测系统平台

```
mTools.os();
//
```

### 是否支持Webp图片

```
mTools.supportWebp(function(isSupport){

});
```

### 是否在线

```
new mTools.Network(function(){

}, function(){

})
```

### 页面是否可见

```
mTools.pageVisiblity(function(){}, function(){})
```

### 打印错误日志

```
window.onerror=function(err){ mTools.log(err) }
```

### 获取 requestAnimationFrame 对象

```
mTools.rAF(function(){

});
```

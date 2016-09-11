// 1. 设置根字体大小rem px2rem rem2px docW docH dpr
// 2. 检测内核、平台、版本 OS & browser
// 3. 检测是否支持webp
// 4. requestAnimationFrame
// 5. 日志记录
// 6. 离线检测
// 7. 页面可见性
/**
 * [mTools.js 移动端工具类]
 * author: 935486956@qq.com
 * github:
 * version: v0.0.1
 */
;(function(window, document, undefined){
  var mTools = {}, win=window, doc = document, ua = window.navigator.userAgent;

  mTools.initREM = function(){
    var docEl = doc.documentElement;
    var resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';
    win.docH = docEl.clientHeight;
    win.docW = docEl.clientWidth;
    win.dpr = win.devicePixelRatio || 1;
    win.px2rem = function(n){ return parseFloat(n)/win.rem; }
    win.rem2px = function(n){ return parseFloat(n) * win.rem; }
    docEl.style.opacity=0;
    docEl.setAttribute('data-dpr', win.dpr);

    var recalc = function () {
          win.docH = docEl.clientHeight;
          win.docW = docEl.clientWidth;
          var clientWidth = win.docW || 320;
          var docCls = docEl.classList;
          var fontSize = (clientWidth < 320 ? 320 : clientWidth > 750 ? 750 : clientWidth)/10;
          docEl.style.fontSize = fontSize + 'px';
          win.rem = fontSize;
          docEl.style.opacity = 1;
    };

    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  }

  mTools.os = (function(ua){
    var os, matched;
    if ((matched = ua.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/))) {
        os = {
            name: 'Windows Phone',
            isWindowsPhone: true,
            version: matched[1]
        };
    } else if(!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
        os = {
            version: matched[1]
        };

        if (ua.match(/Mobile\s+Safari/)) {
            os.name = 'Android';
            os.isAndroid = true;
        } else {
            os.name = 'AndroidPad';
            os.isAndroidPad = true;
        }
    } else if((matched = ua.match(/(iPhone|iPad|iPod)/))) {
        var name = matched[1];

        if ((matched = ua.match(/OS ([\d_\.]+) like Mac OS X/))) {
            os = {
                name: name,
                isIPhone: (name === 'iPhone' || name === 'iPod'),
                isIPad: name === 'iPad',
                isIOS: true,
                version: matched[1].split('_').join('.')
            };
        }
    }

    if (!os) {
        os = {
            name: 'unknown',
            version: '0.0.0'
        };
    }
    return os;
  })(ua)

  mTools.browser =(function(ua){
    var  browser, matched;

    if((matched = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))) {
        browser = {
            name: 'UC',
            isUC: true,
            version: matched[1]
        };
    } else if((matched = ua.match(/MQQBrowser\/([\d\.]+)/))) {
        browser = {
            name: 'QQ',
            isQQ: true,
            version: matched[1]
        };
    } else if ((matched = ua.match(/(?:Firefox|FxiOS)\/([\d\.]+)/))) {
        browser = {
            name: 'Firefox',
            isFirefox: true,
            version: matched[1]
        };
    } else if ((matched = ua.match(/MSIE\s([\d\.]+)/)) ||
                    (matched = ua.match(/IEMobile\/([\d\.]+)/))) {

        browser = {
            version: matched[1]
        };

        if (ua.match(/IEMobile/)) {
            browser.name = 'IEMobile';
            browser.isIEMobile = true;
        } else {
            browser.name = 'IE';
            browser.isIE = true;
        }

        if (ua.match(/Android|iPhone/)) {
            browser.isIELikeWebkit = true;
        }
    } else if((matched = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/))) {
        browser = {
            name: 'Chrome',
            isChrome: true,
            version: matched[1]
        };

        if (ua.match(/Version\/[\d+\.]+\s*Chrome/)) {
            browser.name = 'Chrome Webview';
            browser.isWebview = true;
        }
    } else if(!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
        browser = {
            name: 'Android',
            isAndroid: true,
            version: matched[1]
        };
    } else if(ua.match(/iPhone|iPad|iPod/)) {
        if(ua.match(/Safari/) && (matched = ua.match(/Version\/([\d\.]+)/))) {
            browser = {
                name: 'Safari',
                isSafari: true,
                version: matched[1]
            };
        } else if ((matched = ua.match(/OS ([\d_\.]+) like Mac OS X/))) {
            browser = {
                name: 'iOS Webview',
                isWebview: true,
                version: matched[1].replace(/\_/g, '.')
            };
        }
    }

    if (!browser) {
        browser = {
            name: 'unknown',
            version: '0.0.0'
        };
    }

    return browser;

  })(ua)

  mTools.rAF = (function(window) {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      function(callback) {
        return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
      };
  })(win);

  mTools.log = function(errmsg, data){
    var oLogBox= doc.getElementById('logBox');
    if(!oLogBox){
      oLogBox = doc.createElement('div');
      oLogBox.id = 'logBox';
      oLogBox.style.cssText = "position:fixed; bottom:0; left:0; right:0; top:auto; pading:10px;background:#333;color:#red; word-break:break-all;"
      doc.body.appendChild(oLogBox);
    }
    oLogBox.innerHTML += errmsg+(data && JSON.stringify(data) || '')+'<br/>';
  }

  mTools.supportWebp = function(callback){
    if(localStorage.getItem('support-webp')==='1'){
      doc.documentElement.classList.add('webp');
      return callback && callback(true);
    }

    var image = new Image();
    image.onerror = function(){
      localStorage.setItem('support-webp','0');
      callback && callback(false);
    };
    image.onload = function(){
      if(image.width == 1){
        callback && callback(true);
        document.documentElement.classList.add('webp');
        localStorage.setItem('support-webp','1');
      }else{
        callback && callback(false);
        localStorage.setItem('support-webp','0');
      }
    };
    image.src = 'data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA==';
  }

  // 使用场景：断网时，把数据存储在本地，连网时，把数据更新到服务器
  mTools.Network = function(onlineFn, offlineFn){
    this.onlineFn = onlineFn;
    this.offlineFn = offlineFn;
    this.isOnline = win.navigator.online;
    this.init();
  }
  mTools.Network.prototype.init = function(){
    var _this = this;
      win.addEventListener("online",function(){
           that.onlineFn() ;
       }, true) ;
       win.addEventListener("offline",function(){
           _this.offlineFn() ;
       }, true) ;
  }

  // 使用场景：更新聊天在线状态、视频播放与暂停、登录状态同步
  mTools.pageVisiblity = function(visibleFn, hideFn){
    doc.addEventListener('visibilitychange webkitvisibilitychange', function() {
      if (doc.hidden) {
        hideFn && hideFn();
      } else {
        visibleFn && visibleFn();
      }
    });
  }

  mTools.supportWebp();
  window.mTools = mTools;
})(window, document);

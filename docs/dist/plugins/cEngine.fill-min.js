!function e(i,n,t){function o(r,d){if(!n[r]){if(!i[r]){var a="function"==typeof require&&require;if(!d&&a)return a(r,!0);if(s)return s(r,!0);throw new Error("Cannot find module '"+r+"'")}var l=n[r]={exports:{}};i[r][0].call(l.exports,function(e){var n=i[r][1][e];return o(n?n:e)},l,l.exports,e,i,n,t)}return n[r].exports}for(var s="function"==typeof require&&require,r=0;r<t.length;r++)o(t[r]);return o}({1:[function(e,i,n){"use strict";!function(e){!function(){var e=function(e,i,n){n=n||window;var t=!1,o=function(){t||(t=!0,requestAnimationFrame(function(){n.dispatchEvent(new CustomEvent(i)),t=!1}))};n.addEventListener(e,o)};e("resize","optimizedResize")}(),e.extend("fill",{create:function(e){e=e||{};var i={cEnginePlugin:{name:"fill",version:"0.0.2"},mode:e.mode,useFixedResolution:!1,aspectRetion:"undefined"!=typeof e.aspectRetion&&e.aspectRetion,useResolutionDevider:"undefined"!=typeof e.useResolutionDevider&&e.useResolutionDevider,resolutionDevider:e.resolutionDevider||2,engine:void 0,initHeight:void 0,initWidth:void 0,init:function(e){i.engine=e,i.initWidth=e.width,i.initHeight=e.height,"fill"===i.mode?(window.addEventListener("optimizedResize",i.resizeTo,!1),i.resizeTo()):(i.aspectRetion&&(window.addEventListener("optimizedResize",i.resizeToRatio,!1),i.resizeToRatio()),"stretch"===i.mode&&("static"===e.domElement.style.position&&(e.domElement.style.position="relative"),e.canvas.style.position="absolute",e.canvas.style.top="0",e.canvas.style.left="0",e.canvas.style.width="100%",e.canvas.style.height="100%",e.width=e.domElement.clientWidth,e.height=e.domElement.clientHeight))},destroy:function(){window.removeEventListener("optimizedResize",i.resizeTo,!1),window.removeEventListener("optimizedResize",i.resizeToRatio,!1)},resizeToRatio:function(){var e=i.engine.domElement.clientWidth/i.engine.domElement.clientHeight;i.engine.canvas.height=i.initHeight,i.engine.canvas.width=i.engine.canvas.height*e,i.engine.width=i.engine.domElement.clientWidth,i.engine.height=i.engine.domElement.clientHeight},resizeTo:function(){if(i.useResolutionDevider){i.engine.canvas.width=i.engine.domElement.clientWidth/i.engine.resolutionDevider,i.engine.canvas.height=i.engine.domElement.clientHeight/i.engine.resolutionDevider,i.engine.canvas.style.transformOrigin="0% 0%";var e=i.resolutionDevider;i.engine.canvas.style.transform="scale("+e+", "+e+")"}else i.engine.canvas.width=i.engine.domElement.clientWidth,i.engine.canvas.height=i.engine.domElement.clientHeight;i.engine.width=i.engine.domElement.clientWidth,i.engine.height=i.engine.domElement.clientHeight}};return i}})}(cEngine)},{}]},{},[1]);
//# sourceMappingURL=cEngine.fill-min.js.map
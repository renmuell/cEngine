!function e(n,t,i){function o(r,a){if(!t[r]){if(!n[r]){var u="function"==typeof require&&require;if(!a&&u)return u(r,!0);if(s)return s(r,!0);throw new Error("Cannot find module '"+r+"'")}var c=t[r]={exports:{}};n[r][0].call(c.exports,function(e){var t=n[r][1][e];return o(t?t:e)},c,c.exports,e,n,t,i)}return t[r].exports}for(var s="function"==typeof require&&require,r=0;r<i.length;r++)o(i[r]);return o}({1:[function(e,n,t){"use strict";e("./vendors/polyfils"),function(e){var n={version:"0.1.9",create:function(e){var n={stepTimeThen:0,stepTimeNow:0,stepTimeElapsed:0,isRunning:!1,canvas:void 0,context:void 0,pluginList:[],requestAnimationFrameId:void 0,init:function(){n.createDomElement(),n.createPluginList(),n.callPlugins("init",[n])},start:function(){n.isRunning=!0,n.stepTimeElapsed=0,n.stepTimeNow=0,n.stepTimeThen=0,n.callPlugins("start"),n.loop()},stop:function(){n.isRunning=!1,n.stepTimeElapsed=0,n.stepTimeNow=0,n.stepTimeThen=0,n.requestAnimationFrameId&&window.cancelAnimationFrame(n.requestAnimationFrameId),n.callPlugins("stop")},stepFn:function(){n.stepTimeNow=(new Date).getTime(),0!==n.stepTimeThen&&(n.stepTimeElapsed=n.stepTimeNow-n.stepTimeThen),n.autoClear&&n.clear(),n.callPlugins("preStep",[n.context,n.canvas.width,n.canvas.height,n.stepTimeElapsed]),n.step.call(t,n.context,n.canvas.width,n.canvas.height,n.stepTimeElapsed),n.callPlugins("postStep",[n.context,n.canvas.width,n.canvas.height,n.stepTimeElapsed]),n.stepTimeThen=n.stepTimeNow},clear:function(){n.context.clearRect(0,0,n.canvas.width,n.canvas.height)},loop:function(){n.isRunning&&(n.stepFn(),n.requestAnimationFrameId=window.requestAnimationFrame(n.loop))},createDomElement:function(){n.canvas=document.createElement("canvas"),n.domElement.appendChild(n.canvas),n.context=n.canvas.getContext("2d"),n.style&&n.setStyle(n.style),n.resizeTo(n.width||n.canvas.width,n.height||n.canvas.height)},destroy:function(){n.callPlugins("destroy"),n.canvas.remove()},setStyle:function(e){for(var t in e)n.canvas.style[t]=e[t]},resizeTo:function(e,t){n.width=n.canvas.width=e,n.height=n.canvas.height=t},callPlugins:function(e,t){n.pluginList.forEach(function(n){n[e]&&n[e].apply(void 0,t)})},createPluginList:function(){for(var e in n.plugins)n.plugins.hasOwnProperty(e)&&"undefined"!=typeof n.plugins[e]&&"undefined"!=typeof n.plugins[e].cEnginePlugin&&n.pluginList.push(n.plugins[e])}};Object.assign(n,{domElement:document.body,autoClear:!1,step:void 0,width:void 0,height:void 0,style:void 0,plugins:{}},e),n.init();var t={plugins:n.plugins,stop:function(){return n.stop(),t},step:function(e){return e&&e>1?(n.stepFn(),t.step(--e)):(n.stepFn(),t)},start:function(){return n.start(),t},clear:function(){return n.clear(),t},destroy:function(){n.stop(),n.destroy(),n=void 0}};return t},extend:function(e,t){if("undefined"==typeof e||"undefined"==typeof t)throw new Error("id or plugin is undefined!");if(""===e)throw new Error("id is empty!");if(n[e])throw new Error("skiped cEngine-plugin ["+e+']. Maybe already attached or uses intern blocked name like "create", "extend" or "version"!');if("undefined"==typeof t.create)throw new Error("plugin has no create function!");n[e]=t}};e.cEngine=n}("undefined"!=typeof window?window:void 0)},{"./vendors/polyfils":2}],2:[function(e,n,t){"function"!=typeof Object.assign&&!function(){Object.assign=function(e){"use strict";if(void 0===e||null===e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),t=1;t<arguments.length;t++){var i=arguments[t];if(void 0!==i&&null!==i)for(var o in i)i.hasOwnProperty(o)&&(n[o]=i[o])}return n}}()},{}]},{},[1]);
//# sourceMappingURL=cEngine-min.js.map

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*global cEngine */

(function (cEngine) {

  var inputPlugin = {

    create: function create(config) {
      config = config || {};

      var input = {

        cEnginePlugin: {
          name: 'inputPlugin',
          version: '0.0.4'
        },

        onTouch: config.onTouch || function () {},

        engine: undefined,
        keys: {},
        touches: [],
        mouseIsTouching: false,
        mouseTouch: undefined,

        init: function init(engine) {
          input.engine = engine;

          input.engine.canvas.addEventListener('touchmove', input.touchmove);
          input.engine.canvas.addEventListener('touchstart', input.touchmove);

          input.engine.canvas.addEventListener('mousemove', input.mousemove);
          input.engine.canvas.addEventListener('mousedown', input.mousedown);
          window.document.addEventListener('mouseup', input.mouseup);

          window.document.addEventListener('keydown', input.onKeydown);
          window.document.addEventListener('keyup', input.onKeyup);
        },

        postStep: function postStep() {
          if (input.mouseTouch) {
            input.onTouch(input.getCanvasPosition(input.mouseTouch));
            input.mouseTouch = undefined;
          }

          if (input.touches.length > 0) {
            for (var index = 0; index < input.touches.length; index++) {
              input.onTouch(input.getCanvasPosition(input.touches[index]));
            }
            input.touches = [];
          }
        },

        destroy: function destroy() {
          input.engine.canvas.removeEventListener('mousemove', input.mousemove);
          input.engine.canvas.removeEventListener('mousedown', input.mousedown);
          window.document.removeEventListener('mouseup', input.mouseup);
          input.engine.canvas.removeEventListener('touchstart', input.touchmove);
          input.engine.canvas.removeEventListener('touchmove', input.touchmove);
          window.document.removeEventListener('keydown', input.onKeydown);
          window.document.removeEventListener('keyup', input.onKeyup);
        },

        mousedown: function mousedown(event) {
          if (event.which == 1) {
            event.preventDefault();
            event.stopImmediatePropagation();
            input.mouseIsTouching = true;
            input.mouseTouch = event;
            return false;
          }
        },

        mousemove: function mousemove(event) {
          if (event.which == 1) {
            event.preventDefault();
            event.stopImmediatePropagation();
            if (input.mouseIsTouching) input.mouseTouch = event;
            return false;
          }
        },

        mouseup: function mouseup(event) {
          if (event.which == 1) {
            event.preventDefault();
            event.stopImmediatePropagation();
            input.mouseTouch = event;
            input.mouseIsTouching = false;
            return false;
          }
        },

        touchmove: function touchmove(event) {
          event.preventDefault();
          event.stopImmediatePropagation();
          input.touches = event.targetTouches;
          return false;
        },

        onKeydown: function onKeydown(event) {
          input.keys[inputPlugin.KeyCode[event.keyCode]] = true;
        },

        onKeyup: function onKeyup(event) {
          input.keys[inputPlugin.KeyCode[event.keyCode]] = false;
        },

        getCanvasPosition: function getCanvasPosition(event) {
          var rect = input.engine.canvas.getBoundingClientRect();
          var newEvent = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
          };

          if (input.engine.useResolutionDevider) {
            newEvent.x = newEvent.x / input.engine.resolutionDevider;
            newEvent.y = newEvent.y / input.engine.resolutionDevider;
          }

          return newEvent;
        }
      };

      return input;
    },

    KeyCode: {
      27: 'ESC',
      32: 'SPACE',
      37: 'LEFT',
      38: 'UP',
      39: 'RIGHT',
      40: 'DOWN',
      65: 'A',
      66: 'B',
      67: 'C',
      68: 'D',
      69: 'E',
      70: 'F',
      71: 'G',
      72: 'H',
      73: 'I',
      74: 'J',
      75: 'K',
      76: 'L',
      77: 'M',
      78: 'N',
      79: 'O',
      80: 'P',
      81: 'Q',
      82: 'R',
      83: 'S',
      84: 'T',
      85: 'U',
      86: 'V',
      87: 'W',
      88: 'X',
      89: 'Y',
      90: 'Z'
    }
  };

  cEngine.extend('input', inputPlugin);
})(cEngine);
},{}]},{},[1])
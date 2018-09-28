/*global cEngine */

((cEngine) => {

  const MOUSE_LEFT_TOUCH = "MOUSE_LEFT_TOUCH"

  const inputPlugin = {

    create: (config) => {
      config = config || {}

      const input  = {

        cEnginePlugin: {
          name: 'inputPlugin',
          version: '0.0.7'          
        },
        engine: undefined,
        keys: {},
        touches: [], 

        init: (engine) => {
          input.engine = engine

          input.engine.canvas.addEventListener('touchstart', input.touchstart)
          window.document.addEventListener('touchmove', input.touchmove)
          window.document.addEventListener('touchend', input.touchend)
          window.document.addEventListener('touchcancel', input.touchend)

          input.engine.canvas.addEventListener('mousedown', input.mousedown)
          window.document.addEventListener('mousemove', input.mousemove)
          window.document.addEventListener('mouseup', input.mouseup)

          window.document.addEventListener('keydown', input.onKeydown)
          window.document.addEventListener('keyup', input.onKeyup)
        },

        destroy: () => {
          input.engine.canvas.removeEventListener('touchstart', input.touchstart)
          window.document.removeEventListener('touchmove', input.touchmove)
          window.document.removeEventListener('touchend', input.touchend)
          window.document.removeEventListener('touchcancel', input.touchend)

          input.engine.canvas.removeEventListener('mousedown', input.mousedown)
          window.document.removeEventListener('mousemove', input.mousemove)
          window.document.removeEventListener('mouseup', input.mouseup)

          window.document.removeEventListener('keydown', input.onKeydown)
          window.document.removeEventListener('keyup', input.onKeyup)
        },

        mousedown: (event) => {
          if (event.which == 1) {
            event.preventDefault()
            input.mouseIsTouching = true
            event.identifier = MOUSE_LEFT_TOUCH
            input.touches.push(input.createTouch(event))
          }
        },
  
        mousemove: (event) => {
          if (event.which == 1) {
            event.preventDefault()
            if (input.mouseIsTouching) {
              event.identifier = MOUSE_LEFT_TOUCH
              var idx = input.ongoingTouchIndexById(event.identifier)
              if (idx >= 0) {
                input.touches.splice(idx, 1, input.createTouch(event))  // swap in the new touch record
              }
            }
          }
        },

        mouseup: (event) => {
          if (event.which == 1) {
            event.preventDefault()
            input.mouseIsTouching = false
            event.identifier = MOUSE_LEFT_TOUCH
            var idx = input.ongoingTouchIndexById(event.identifier)
            if (idx >= 0) {
              input.touches.splice(idx, 1)  // remove it; we're done
            }
          }
        },

        touchstart: (event) => {
          event.preventDefault()
          var touches = event.changedTouches
          for (var i = 0; i < touches.length; i++) {
            input.touches.push(input.createTouch(touches[i]))
          }
        },

        touchmove: (event) => {
          event.preventDefault()
          var touches = event.changedTouches
          for (var i = 0; i < touches.length; i++) {
            var idx = input.ongoingTouchIndexById(touches[i].identifier)
            if (idx >= 0) {
              input.touches.splice(idx, 1, input.createTouch(touches[i]))  // swap in the new touch record
            }
          }
        },

        touchend: (event) => {
          event.preventDefault()
          var touches = event.changedTouches
          for (var i = 0; i < touches.length; i++) {
            var idx = input.ongoingTouchIndexById(touches[i].identifier)
            if (idx >= 0) {
              input.touches.splice(idx, 1)  // remove it; we're done
            }
          }
        },

        ongoingTouchIndexById: (idToFind) => {
          for (var i = 0; i < input.touches.length; i++) {
            var id = input.touches[i].identifier
            
            if (id == idToFind) {
              return i
            }
          }
          return -1    // not found
        },

        onKeydown: (event) => {
          input.keys[inputPlugin.KeyCode[event.keyCode]] = true
        },

        onKeyup: (event) => {
          input.keys[inputPlugin.KeyCode[event.keyCode]] = false
        },

        createTouch: (touch) => {
          let rect = input.engine.canvas.getBoundingClientRect()
          let newTouch = {
            identifier: touch.identifier,
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
          }

          if (input.engine.useResolutionDevider) {
            newTouch.x = newTouch.x/input.engine.resolutionDevider
            newTouch.y = newTouch.y/input.engine.resolutionDevider
          }

          return newTouch
        }
      }

      return input
    },

    KeyCode: {
        27 : 'ESC'
      , 32 : 'SPACE'
      , 37 : 'LEFT'
      , 38 : 'UP'
      , 39 : 'RIGHT'
      , 40 : 'DOWN'
      , 65 : 'A' 
      , 66 : 'B' 
      , 67 : 'C' 
      , 68 : 'D' 
      , 69 : 'E' 
      , 70 : 'F' 
      , 71 : 'G' 
      , 72 : 'H' 
      , 73 : 'I' 
      , 74 : 'J' 
      , 75 : 'K' 
      , 76 : 'L' 
      , 77 : 'M' 
      , 78 : 'N' 
      , 79 : 'O' 
      , 80 : 'P' 
      , 81 : 'Q' 
      , 82 : 'R' 
      , 83 : 'S' 
      , 84 : 'T' 
      , 85 : 'U' 
      , 86 : 'V' 
      , 87 : 'W' 
      , 88 : 'X' 
      , 89 : 'Y' 
      , 90 : 'Z' 
    }
  }

  cEngine.extend('input', inputPlugin)

})(cEngine)
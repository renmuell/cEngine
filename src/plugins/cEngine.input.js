/*global cEngine */

((cEngine) => {

  const inputPlugin = {

    create: (config) => {
      config = config || {}

      const input  = {

        cEnginePlugin: {
          name: 'inputPlugin',
          version: '0.0.4'          
        },

        onTouch: config.onTouch || function(){},

        engine: undefined,
        keys: {},
        touches: [], 
        mouseIsTouching: false,
        mouseTouch: undefined,

        init: (engine) => {
          input.engine = engine

          input.engine.canvas.addEventListener('touchmove', input.touchmove)
          input.engine.canvas.addEventListener('touchstart', input.touchmove)

          input.engine.canvas.addEventListener('mousemove', input.mousemove)
          input.engine.canvas.addEventListener('mousedown', input.mousedown)
          window.document.addEventListener('mouseup', input.mouseup)

          window.document.addEventListener('keydown', input.onKeydown)
          window.document.addEventListener('keyup', input.onKeyup)
        },
        
  
        postStep: () => {
          if (input.mouseTouch) {
            input.onTouch(input.getCanvasPosition(input.mouseTouch))
            input.mouseTouch = undefined
          }

          if (input.touches.length > 0) {
            for (let index = 0; index < input.touches.length; index++) {
              input.onTouch(input.getCanvasPosition(input.touches[index]))
            }
            input.touches = []
          }
        },

        destroy: () => {
          input.engine.canvas.removeEventListener('mousemove', input.mousemove)
          input.engine.canvas.removeEventListener('mousedown', input.mousedown)
          window.document.removeEventListener('mouseup', input.mouseup)
          input.engine.canvas.removeEventListener('touchstart', input.touchmove)
          input.engine.canvas.removeEventListener('touchmove', input.touchmove)
          window.document.removeEventListener('keydown', input.onKeydown)
          window.document.removeEventListener('keyup', input.onKeyup)
        },

        mousedown: (event) => {
          if (event.which == 1) {
            event.preventDefault()
            event.stopImmediatePropagation()
            input.mouseIsTouching = true
            input.mouseTouch = event
            return false
          }
        },
  
        mousemove: (event) => {
          if (event.which == 1) {
            event.preventDefault()
            event.stopImmediatePropagation()
            if (input.mouseIsTouching)
              input.mouseTouch = event
            return false
          }
        },

        mouseup: (event) => {
          if (event.which == 1) {
            event.preventDefault()
            event.stopImmediatePropagation()
            input.mouseTouch = event
            input.mouseIsTouching = false
            return false
          }
        },

        touchmove: (event) => {
          event.preventDefault()
          event.stopImmediatePropagation()
          input.touches = event.targetTouches
          return false
        },

        onKeydown: (event) => {
          input.keys[inputPlugin.KeyCode[event.keyCode]] = true
        },

        onKeyup: (event) => {
          input.keys[inputPlugin.KeyCode[event.keyCode]] = false
        },

        getCanvasPosition: (event) => {
          let rect = input.engine.canvas.getBoundingClientRect()
          let newEvent = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
          }

          if (input.engine.useResolutionDevider) {
            newEvent.x = newEvent.x/input.engine.resolutionDevider
            newEvent.y = newEvent.y/input.engine.resolutionDevider
          }

          return newEvent
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
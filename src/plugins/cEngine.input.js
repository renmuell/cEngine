/*global cEngine */

((cEngine) => {

  const inputPlugin = {
    version: '0.0.3',
    create: () => {

      const input  = {
        cEnginePlugin: true,
        engine: undefined,
        keys: {},
        clicks: [],
        mousemove: [],
        init: (engine) => {
          input.engine = engine
          input.engine.canvas.addEventListener('click', (event) => {
            input.clicks.push(event)
          })

          input.engine.canvas.addEventListener('mousemove', (event) => {
            if (Math.random()> 0.92) {
              input.mousemove.push(event)
            }
          })

          window.document.addEventListener('keydown', (event) => {
            input.keys[inputPlugin.KeyCode[event.keyCode]] = true
          })

          window.document.addEventListener('keyup', (event) => {
            input.keys[inputPlugin.KeyCode[event.keyCode]] = false
          })
        },
        destroy: () => {

        },
        getCanvasPosition: (event) => {
          let rect = input.engine.canvas.getBoundingClientRect(),
              x = event.clientX - rect.left,
              y = event.clientY - rect.top

            if (input.engine.useResolutionDevider) {
              x = x/input.engine.resolutionDevider
              y = y/input.engine.resolutionDevider
            }

            return {
              x: x,
              y: y
            }
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
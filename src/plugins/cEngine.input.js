/*global cEngine */

import Hammer from '../vendors/hammer.min'
import '../vendors/hammer-time.min'

((cEngine) => {

  const inputPlugin = {

    create: (config) => {
      config = config || {}

      const input  = {

        cEnginePlugin: {
          name: 'inputPlugin',
          version: '0.0.3'          
        },

        engine: undefined,
        keys: {},

        onTap       : config.onTap       || function(){},
        onPan       : config.onPan       || function(){},

        hammerManager: undefined,
        gestures: {
          singleTap : undefined,
          pan       : undefined
        },

        init: (engine) => {
          input.engine = engine

          input.setupHammer()

          window.document.addEventListener('keydown', input.onKeydown)
          window.document.addEventListener('keyup', input.onKeyup)
        },
        
        setupHammer: () => {
          input.hammerManager = new Hammer.Manager(input.engine.domElement)

          input.hammerManager.add(new Hammer.Tap({
            event: 'singleTap'
          }))

          input.hammerManager.add(new Hammer.Pan({
            event: 'pan'
          }))

          input.hammerManager.get('singleTap').recognizeWith('pan')

          input.hammerManager.on('singleTap', (ev) => { 
            input.gestures.singleTap = ev.center
          })

          input.hammerManager.on('pan', (ev) => {
            input.gestures.pan = ev.center
          })
        },

        postStep: () => {
          if(input.gestures.singleTap){
            input.onTap(
              input.getCanvasPosition(
                input.gestures.singleTap))

            input.gestures.singleTap = undefined
          }

          if(input.gestures.pan){
            input.onPan(
              input.getCanvasPosition(
                input.gestures.pan))

            input.gestures.pan = undefined
          }
        },

        destroy: () => {
          input.hammerManager.destroy()
          window.document.removeEventListener('keydown', input.onKeydown)
          window.document.removeEventListener('keyup', input.onKeyup)
        },

        onKeydown: (event) => {
          input.keys[inputPlugin.KeyCode[event.keyCode]] = true
        },

        onKeyup: (event) => {
          input.keys[inputPlugin.KeyCode[event.keyCode]] = false
        },

        getCanvasPosition: (event) => {
          let rect = input.engine.canvas.getBoundingClientRect()
            
          event.x = event.x - rect.left,
          event.y = event.y - rect.top

          if (input.engine.useResolutionDevider) {
            event.x = event.x/input.engine.resolutionDevider
            event.y = event.y/input.engine.resolutionDevider
          }

          return event
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
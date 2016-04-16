/*global cEngine */

((cEngine) => {

  cEngine.extend('fill', {

    create: (config) => {
      config = config || {}

      const fill = {

        cEnginePlugin: {
          name: 'fill',
          version: '0.0.1'          
        },

        /**
         *  // full, stretch 
         *  @type {string}
         */
        mode: config.mode,  

        useFixedResolution: false,

        aspectRetion:  typeof config.aspectRetion != 'undefined' ? config.aspectRetion : false,

        useResolutionDevider: typeof config.useResolutionDevider != 'undefined' ? config.useResolutionDevider : false,

        /**
         *  value for resolution devider
         *  @type {number}
         */
        resolutionDevider: config.resolutionDevider || 2,

        engine: undefined,

        initHeight: undefined,
        initWidth: undefined,

        init: (engine) => {
          fill.engine = engine
          fill.initWidth = engine.width
          fill.initHeight = engine.height

          if (fill.mode === 'fill') {

            window.addEventListener('resize', fill.resizeTo, false)
            fill.resizeTo()

          } else {

            if (fill.aspectRetion) {
              window.addEventListener('resize', fill.resizeToRatio, false)
              fill.resizeToRatio()
            }

            if (fill.mode === 'stretch') {
              
              if (engine.domElement.style.position === 'static') {
                engine.domElement.style.position  = 'relative'
              }

              engine.canvas.style.position = 'absolute'
              engine.canvas.style.top      = '0'
              engine.canvas.style.left     = '0'
              engine.canvas.style.width    = '100%'
              engine.canvas.style.height   = '100%'

              engine.width = engine.domElement.clientWidth
              engine.height = engine.domElement.clientHeight
            } 
          }
        },

        destroy: () => {
          window.removeEventListener('resize', fill.resizeTo, false)
          window.removeEventListener('resize', fill.resizeToRatio, false)
        },

        resizeToRatio: () => {
          const ratio = fill.engine.domElement.clientWidth / fill.engine.domElement.clientHeight
          
          fill.engine.canvas.height = fill.initHeight
          fill.engine.canvas.width = fill.engine.canvas.height * ratio

          fill.engine.width = fill.engine.domElement.clientWidth
          fill.engine.height = fill.engine.domElement.clientHeight
        },

        resizeTo: () => {
          if (fill.useResolutionDevider) {
          
            fill.engine.canvas.width = fill.engine.domElement.clientWidth/fill.engine.resolutionDevider
            fill.engine.canvas.height = fill.engine.domElement.clientHeight/fill.engine.resolutionDevider
            fill.engine.canvas.style.transformOrigin = '0% 0%'
            const s = fill.resolutionDevider
            fill.engine.canvas.style.transform = 'scale(' + s + ', ' + s + ')'
          
          } else {

            fill.engine.canvas.width = fill.engine.domElement.clientWidth
            fill.engine.canvas.height = fill.engine.domElement.clientHeight
          
          }

          fill.engine.width = fill.engine.domElement.clientWidth
          fill.engine.height = fill.engine.domElement.clientHeight
        }
      }

      return fill   
    }
  })

})(cEngine)

/*global cEngine */

((cEngine) => {

  cEngine.extend('activityTracker', {

    create: (config) => {

      config = config || {}

      var tracker = {

        cEnginePlugin: {
          name: 'activityTracker',
          version: '0.0.1'
        },

        engine: undefined,

        /**
         *  should engine be stoped if page focus is lost
         *  @type {bool}
         */
        stopOnUserLeave: typeof config.stopOnUserLeave != undefined ? config.stopOnUserLeave : false,

        init: (engine) => {
          tracker.engine = engine;

          if (tracker.stopOnUserLeave) {
            window.addEventListener('focus', tracker.onFocus)
            window.addEventListener('blur', tracker.onBlur)
          }
        },

        onBlur: () => {
          tracker.engine.stop()
        },

        onFocus: () => {
          tracker.engine.start()
        },

        destroy: () => {
          window.removeEventListener('focus', tracker.onFocus)
          window.removeEventListener('blur', tracker.onBlur)          
        }
      }

      return tracker
    }    
  })

})(cEngine)

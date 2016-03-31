/*global cEngine */
/*eslint no-console:0*/

((cEngine) => {

  cEngine.extend('__name__', {

    create: (config) => {

      config = config || {}

      var __name__ = {

        cEnginePlugin: {
          name: '__name__',
          version: '0.0.1'
        },

        init: (engine) => {
          console.log('init', engine)
        },

        start: () => {
          console.log('start')
        },

        stop: () => {
           console.log('stop')
        },

        preStep: (context, width, height, dt) => {
          console.log('preStep', context, width, height, dt)
        },

        postStep: (context, width, height, dt) => {
          console.log('postStep', context, width, height, dt)
        },

        destroy: () => {
          console.log('destroy')
        }
      }

      return __name__
    }    
  })

})(cEngine)

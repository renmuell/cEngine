/*global cEngine */

import Stats from '../vendors/stats.min'

(function(cEngine){

  cEngine.extend('stats', {

    create: function(config){
      config = config || {}

      var stats = {
        cEnginePlugin: {
          name: 'stats',
          version: '0.0.1'          
        },
        stats: undefined,
        tempLoop: undefined,
        init: () => {
          stats.stats = new Stats()
          stats.stats.setMode( config.mode || 0 )

          stats.stats.domElement.style.position = 'absolute'
          stats.stats.domElement.style.right = '0px'
          stats.stats.domElement.style.top = '0px'

          document.body.appendChild( stats.stats.domElement )
        },
        preStep: () => {
          stats.stats.begin()
        },
        postStep: () => {
           stats.stats.end()
        },
        destroy: () => {
          stats.stats.end()
          stats.stats.domElement.remove()        
        }
      }

      return stats
    }    
  })

}(cEngine))

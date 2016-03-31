/*global cEngine */

((cEngine) => {

  cEngine.extend('frameRate', {

    version: '0.0.1',
    
    create: (config) => {
      config = config || {}

      const frameRate = {

        cEnginePlugin: true,


        fps: config.fps || 60,

        /**
         *  Fps in ms
         *  @type {number}
         */
        fpsInterval: undefined,

        /**
         *  The current Frame number
         *  @type {number}
         */
        currentFrame: 0,

        init: (engine) => {
          frameRate.setFps(frameRate.fps)
          frameRate.engine = engine
          frameRate.engine.loop = frameRate.loop
        },

        start: () => {
          frameRate.engine.stepTimeNow = Date.now()
          frameRate.engine.stepTimeThen = frameRate.engine.stepTimeNow
        },
        setFps: (value) => {
          frameRate.fps = value;
          frameRate.fpsInterval = 1000 / frameRate.fps 
        },
        postStep: () => {
          frameRate.currentFrame++
        }, 
        loop: () => {

          if (frameRate.engine.isRunning) {
          
            frameRate.engine.stepTimeNow = new Date().getTime()
            
            frameRate.engine.stepTimeElapsed = frameRate.engine.stepTimeNow - frameRate.engine.stepTimeThen

            if (frameRate.engine.stepTimeElapsed > frameRate.fpsInterval) {
              frameRate.engine.stepFn()
              frameRate.engine.stepTimeThen = frameRate.engine.stepTimeNow - (frameRate.engine.stepTimeElapsed % frameRate.fpsInterval)
            }             

            requestAnimationFrame(frameRate.loop)
          }
        }
      }

      return frameRate   
    }
  })

})(cEngine)

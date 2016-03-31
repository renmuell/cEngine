import './vendors/polyfils'

/**
 *  Canvas engine with plugin capabilities.
 *  @param {object} global - window or this
 */
((global) => {

  /**
   *  Global namesapce
   *  @global
   */
  const cEngine = {
    
    version: '0.1.3',

    /**
     *  Factory for a new cEninge instance.
     *  @public
     *  @param {object=} config - config for engine
     *  @return {object} eEngine instance
     */
    create: (config) => {

      /**
       *  configurable engine values, with default values
       */
      const defaults = {

        /**
         *  parent dom element to attach to
         *  @type {HTMLElement}
         */
        domElement: document.body,

        /**
         *  should canvas be cleared every step
         *  @type {bool}
         */
        autoClear: false,

        /**
         *  callback for every step
         *  @type {function}
         */
        step: undefined,

        /**
         *  canvas width
         *  @type {number}
         */
        width: undefined,

        /**
         *  canvas height
         *  @type {number}
         */
        height: undefined,

        /**
         *  should engine be stoped if page focus is lost
         *  @type {bool}
         */
        stopOnUserLeave: false,

        /**
         *  style filter value
         *  @type {string}
         */
        cssFilter: undefined,

        /**
         *  object containing all plugins
         *  @type {object} 
         */
        plugins: {}
      }

      /**
       *  The cEngine instance.
       *  @private
       *  @instance
       *  @type {object}
       */
      const Engine = {

        /**
         *  Time of last step
         *  @type {date}
         */
        stepTimeThen: undefined,

        /**
         *  Time of step
         *  @type {date}
         */
        stepTimeNow: undefined,

        /**
         *  Elapsed time since last step
         *  @type {number}
         */
        stepTimeElapsed: undefined,
        
        /**
         *  is engine running
         *  @type {bool}
         */
        isRunning: false,

        /**
         *  canvas dom element
         *  @type {HTMLElement}
         */
        canvas: undefined,

        /**
         *  canvas 2d context
         *  @type {CanvasRenderingContext2D}
         */
        context: undefined,

        /**
         *  shorthand list of all plugins
         */
        pluginList: [],

        /**
         *  Initialize canvas engine.
         */
        init: () => {
          Engine.createDomElement()
          Engine.createPluginList()
          Engine.callPlugins('init', [Engine])
        },

        /**
         *  Starts the engine by calling the loop.
         */
        start: () => {
          Engine.isRunning = true
          Engine.callPlugins('start')
          Engine.loop()
        },

        /**
         *  Stops the engine.
         */
        stop: () => {
          Engine.isRunning = false
          Engine.callPlugins('stop')
        },

        /**
         *  Hanlder for every loop step.
         */
        stepFn: () => {
          if (Engine.autoClear) { 
            Engine.clear()
          }

          Engine.callPlugins('preStep', [
            Engine.context, 
            Engine.width, 
            Engine.height, 
            Engine.stepTimeElapsed])

          Engine.step(
            Engine.context, 
            Engine.width, 
            Engine.height, 
            Engine.stepTimeElapsed)

          Engine.callPlugins('postStep', [
            Engine.context, 
            Engine.width, 
            Engine.height, 
            Engine.stepTimeElapsed])
        },

        /**
         *  Clears the canvas context.
         */
        clear: () => {
          Engine.context.clearRect(0, 0, Engine.width, Engine.height)
        },

        /**
         *  Engine loop.
         */
        loop: () => {
          if (Engine.isRunning) {

            Engine.stepTimeNow = new Date().getTime()
            Engine.stepTimeElapsed = Engine.stepTimeNow - Engine.stepTimeThen

            Engine.stepFn()

            Engine.stepTimeThen = Engine.stepTimeNow 

            requestAnimationFrame(Engine.loop)
          }
        },

        /**
         *  Initialize Canvas and attach to dom element.
         */
        createDomElement: () => {
          Engine.canvas = document.createElement('canvas')

          Engine.domElement.appendChild(Engine.canvas)

          Engine.context = Engine.canvas.getContext('2d')

          if (Engine.cssFilter) {
            Engine.canvas.style.webkitFilter = Engine.cssFilter
            Engine.canvas.style.filter = Engine.cssFilter
          }

          if (Engine.stopOnUserLeave) {
            window.onblur = () => Engine.stop()
          }

          Engine.resizeTo(Engine.width  || Engine.canvas.width,
                          Engine.height || Engine.canvas.height)
        },

        /**
         *  Remove all engine garbage so garbage collection can 
         *  clear all and Dom is clean.
         */
        destroy: () => {
          Engine.canvas.remove()
          Engine.callPlugins('destroy')
        },

        /**
         *  Resize to width and height.
         *  @param {number} width - width
         *  @param {number} height - height
         */
        resizeTo: (width, height) => {
          Engine.width = Engine.canvas.width = width
          Engine.height = Engine.canvas.height = height
        },

        /**
         *  Call function of all plugins.
         *  @param {string} fn - function name
         *  @param {array} params - array of all call arguments
         */
        callPlugins: (fn, params) => {
          Engine.pluginList.forEach((plugin) => {
            if (plugin[fn]) {
               plugin[fn].apply(undefined, params)
            }
          })
        },

        /**
         *  Create shorthand plugin list for faster access.
         */
        createPluginList: () => {
          for (const plugin in Engine.plugins) {
             if (Engine.plugins.hasOwnProperty(plugin) 
              && typeof Engine.plugins[plugin] != 'undefined'
              && typeof Engine.plugins[plugin].cEnginePlugin != 'undefined') {

              Engine.pluginList.push(Engine.plugins[plugin])
            
             }
          }       
        }
      }

      Object.assign(Engine, defaults, config)

      Engine.init()

      /**
       *  Public interface for engine
       *  @public
       */
      const _public_ = {

        /**
         *  All Plugins
         *  @type {object}
         */
        plugins : Engine.plugins,

        /**
         *  Stop engine.
         *  @return {object} engine instance
         */
        stop: () => {
          Engine.stop()
          return _public_
        },

        /**
         *  Calls engine step one time or how many time count param says.
         *  @param {number} [count=2] - how many steps
         *  @return {object} engine instance
         */
        step: (count) => {
          if (count && count > 1) {
         
            Engine.stepFn()
            return _public_.step(--count)

          } else {

            Engine.stepFn()
            return _public_
          }
        },

        /**
         *  Starts engine.
         *  @return {object} engine instance
         */
        start: () => {
          Engine.start()
          return _public_
        },

        /**
         *  Clears Context of engine.
         *  @return {object} engine instance
         */
        clear: () => {
          Engine.clear()
          return _public_
        },

        /**
         *  Destoys engine.
         *  @return {object} engine instance
         */
        destroy: () => {
          Engine.destroy()
          return _public_
        }
      }

      return _public_
    },

    /**
     *  Extend cEngine with plugin.
     *  @param {string} id - id of plugin, eg 'filter' -> cEngine.filter
     *  @param {object} plugin - plugin
     *  @throws {Error} error
     */
    extend: (id, plugin) => {
      if (typeof id === 'undefined' || typeof plugin === 'undefined') {

        throw new Error('id or plugin is undefined!')  

      } else if (id === '') {

        throw new Error('id is empty!')  

      } else if (cEngine[id]) {

        throw new Error('skiped cEngine-plugin [' + id + ']. ' + 
                        'Maybe already attached or uses intern blocked ' +
                        'name like "create", "extend" or "version"!')   

      } else if ( typeof plugin.create === 'undefined') {
     
        throw new Error('plugin has no create function!')    
     
      } else {
         cEngine[id] = plugin
      }
    }
  }

  global.cEngine = cEngine

})(typeof window !== 'undefined' ? window : this)
import './vendors/polyfils'

/**
 *  Canvas engine with plugin capabilities.
 *  @param {object} global - window or this
 */
(function(global){

  /**
   *  Global namesapce
   *  @global
   */
  const cEngine = {
    
    /**
     *  The version.
     *  @type {string}
     */
    version: '0.1.9',

    /**
     *  Factory for a new cEninge instance.
     *  @public
     *  @param {object=} config - config for engine
     *  @return {object} eEngine instance
     */
    create: function (config) {

      /**
       *  The cEngine instance.
       *  @private
       *  @instance
       *  @type {object}
       */
      let Engine = {

        /**
         *  Time of last step
         *  @type {date}
         */
        stepTimeThen: 0,

        /**
         *  Time of step
         *  @type {date}
         */
        stepTimeNow: 0,

        /**
         *  Elapsed time since last step
         *  @type {number}
         */
        stepTimeElapsed: 0,
        
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
         *  @type {array}
         */
        pluginList: [],

        /**
         *  shorthand list of all plugins
         *  @type {number}
         */
        requestAnimationFrameId: undefined,

        /**
         *  Initialize canvas engine.
         */
        init: function() {
          Engine.createDomElement()
          Engine.createPluginList()
          Engine.callPlugins('init', [Engine])
        },

        /**
         *  Starts the engine by calling the loop.
         */
        start: function() {
          Engine.isRunning = true
          Engine.stepTimeElapsed = 0
          Engine.stepTimeNow = 0
          Engine.stepTimeThen = 0
          Engine.callPlugins('start')
          Engine.loop()
        },

        /**
         *  Stops the engine.
         */
        stop: function() {
          Engine.isRunning = false
          Engine.stepTimeElapsed = 0
          Engine.stepTimeNow = 0
          Engine.stepTimeThen = 0

          if (Engine.requestAnimationFrameId) {
            window.cancelAnimationFrame(
              Engine.requestAnimationFrameId);
          }

          Engine.callPlugins('stop')
        },

        /**
         *  Hanlder for every loop step.
         */
        stepFn: function() {

          Engine.stepTimeNow = new Date().getTime()

          if (Engine.stepTimeThen !== 0) {
            Engine.stepTimeElapsed 
              = Engine.stepTimeNow - Engine.stepTimeThen
          }

          if (Engine.autoClear) { 
            Engine.clear()
          }

          Engine.callPlugins('preStep', [
            Engine.context, 
            Engine.canvas.width, 
            Engine.canvas.height, 
            Engine.stepTimeElapsed])

          Engine.step.call(
            _public_,
            Engine.context, 
            Engine.canvas.width, 
            Engine.canvas.height, 
            Engine.stepTimeElapsed)

          Engine.callPlugins('postStep', [
            Engine.context, 
            Engine.canvas.width, 
            Engine.canvas.height, 
            Engine.stepTimeElapsed])

           Engine.stepTimeThen = Engine.stepTimeNow 
        },

        /**
         *  Clears the canvas context.
         */
        clear: function() {
          Engine.context.clearRect(
            0, 
            0, 
            Engine.canvas.width, 
            Engine.canvas.height)
        },

        /**
         *  Engine loop.
         */
        loop: function() {
          if (Engine.isRunning) {

            Engine.stepFn()

            Engine.requestAnimationFrameId 
              = window.requestAnimationFrame(Engine.loop)
          }
        },

        /**
         *  Initialize Canvas and attach to dom element.
         */
        createDomElement: function() {
          Engine.canvas = document.createElement('canvas')

          Engine.domElement.appendChild(Engine.canvas)

          Engine.context = Engine.canvas.getContext('2d')

          if (Engine.style) {
            Engine.setStyle(Engine.style)
          }

          Engine.resizeTo(Engine.width  || Engine.canvas.width,
                          Engine.height || Engine.canvas.height)
        },

        /**
         *  Remove all engine garbage so garbage collection can 
         *  clear all and Dom is clean.
         */
        destroy: function() {
          Engine.callPlugins('destroy')
          Engine.canvas.remove()
        },

        /**
         *  Set Canvas Style.
         *  @param {object} style - style
         */
        setStyle: function(style) {
          for (const property in style){
            Engine.canvas.style[property] = style[property]
          }
        },

        /**
         *  Resize to width and height.
         *  @param {number} width - width
         *  @param {number} height - height
         */
        resizeTo: function(width, height) {
          Engine.width = Engine.canvas.width = width
          Engine.height = Engine.canvas.height = height
        },

        /**
         *  Call function of all plugins.
         *  @param {string} fn - function name
         *  @param {array} params - array of all call arguments
         */
        callPlugins: function(fn, params) {
          Engine.pluginList.forEach((plugin) => {
            if (plugin[fn]) {
              plugin[fn].apply(undefined, params)
            }
          })
        },

        /**
         *  Create shorthand plugin list for faster access.
         */
        createPluginList: function() {
          for (const plugin in Engine.plugins) {
             if (Engine.plugins.hasOwnProperty(plugin) 
              && typeof Engine.plugins[plugin] != 'undefined'
              && typeof Engine.plugins[plugin].cEnginePlugin != 'undefined') {

              Engine.pluginList.push(Engine.plugins[plugin])
            
             }
          }       
        }
      }

      Object.assign(Engine, {

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
         *  canvas style
         *  @type {object}
         */
        style: undefined,

        /**
         *  object containing all plugins
         *  @type {object} 
         */
        plugins: {}

      }, config)

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
        stop: function() {
          Engine.stop()
          return _public_
        },

        /**
         *  Calls engine step one time or how 
         *  many time count param says.
         *  @param {number} [count=2] - how many steps
         *  @return {object} engine instance
         */
        step: function(count) {
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
        start: function() {
          Engine.start()
          return _public_
        },

        /**
         *  Clears Context of engine.
         *  @return {object} engine instance
         */
        clear: function() {
          Engine.clear()
          return _public_
        },

        /**
         *  Destoys engine.
         */
        destroy: function() {
          Engine.stop()
          Engine.destroy()
          Engine = undefined
        }
      }

      return _public_
    },

    /**
     *  Extend cEngine with plugin.
     *  @param {string} id - id of plugin, 
     *    eg 'filter' -> cEngine.filter
     *  @param {object} plugin - plugin
     *  @throws {Error} error
     */
    extend: (id, plugin) => {
      if (typeof id === 'undefined' 
        || typeof plugin === 'undefined') {

        throw new Error('id or plugin is undefined!')  

      } else if (id === '') {

        throw new Error('id is empty!')  

      } else if (cEngine[id]) {

        throw new Error(
          'skiped cEngine-plugin [' + id + ']. ' + 
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

}(typeof window !== 'undefined' ? window : this))
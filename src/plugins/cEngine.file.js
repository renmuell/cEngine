/*global cEngine */

import FileSaver from '../vendors/FileSaver'
import '../vendors/canvas-toBlob'

/**
 *  File - cEngine Plugin
 *
 *  Saving canvas as image or loading 
 *  image into the canvas.
 *
 *  USE
 *    cEngine.file.saveToFile() 
 *    cEngine.file.loadFile()   
 */
((cEngine) => {

  cEngine.extend('file', {

    create: () => {

      const file = {

        cEnginePlugin: {
          name: 'file',
          version: '0.0.1'
        },

        /**
         *  Engine instance
         *  @type {object}
         */
        engine: undefined,
        
        /**
         *  File input element
         *  @type {HTMLElement}
         */
        fileInput: undefined,

        init: (engine) => {

          file.engine = engine

          file.fileInput = document.createElement('input')
          file.fileInput.type="file"
          file.fileInput.style.visibility = 'hidden'
          file.fileInput.onchange = () => {

            const fr = new FileReader()
           
            fr.onload = () => {

              const img = new Image()

              img.onload = () => {
                file.engine.clear()
                file.engine.resizeTo(img.width, img.height)
                file.engine.canvas.getContext("2d").drawImage(img,0,0)
              }

              img.src = fr.result
            }

            fr.readAsDataURL(file.fileInput.files[0])
          }

          document.body.appendChild(file.fileInput)
        },

        destroy: () => {
          file.fileInput.remove()
        },

        /**
         *  Save canvas to file.
         *  @param {string} name - file name
         */
        saveToFile: (name) => {
          file.engine.canvas.toBlob((blob) => {
            FileSaver.saveAs(blob, name)
          })
        },
     
        /**
         *  Load file into canvas.
         */   
        loadFile: () => {
          file.fileInput.click()
        }
      }

      return file
    }    
  })

})(cEngine)

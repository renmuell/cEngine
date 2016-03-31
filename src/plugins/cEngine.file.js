/*global cEngine */

import FileSaver from '../vendors/FileSaver'

import '../vendors/canvas-toBlob'

(function(cEngine){

  cEngine.extend('file', {
    version: '0.0.1',
    create: function(){

      var file = {
        cEnginePlugin: true,
        engine: undefined,
        fileInput: undefined,
        init: function(engine){
          file.engine = engine;
          file.fileInput = document.createElement('input');
          file.fileInput.type="file";
          file.fileInput.style.visibility = 'hidden';
          document.body.appendChild(file.fileInput);

          file.fileInput.onclick = function () {
            this.value = null;
          };

          file.fileInput.onchange = function () {

            var fr = new FileReader();
            fr.onload = function(){
              var img = new Image();
              img.onload = function(){
                file.engine.clear();
                file.engine.resizeTo(img.width, img.height);
                file.engine.canvas.getContext("2d").drawImage(img,0,0);
              };
              img.src = fr.result;
            };

            fr.readAsDataURL(file.fileInput.files[0]);

          };
        },
        saveToFile: function(name){
          file.engine.canvas.toBlob(function(blob) {
            FileSaver.saveAs(blob, name);
          });
        },
        loadFile: function(){
          file.fileInput.click();
        }
      };

      return file;
    }    
  });

}(cEngine));

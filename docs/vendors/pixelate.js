//http://blog.acipo.com/js-canvas-pixelate/
var Pixelate = function (src, dst, opt) {

  var xBinSize = opt.pixelWidth || 8,
      yBinSize = opt.pixelHeight || 8;

  var xSize = src.width,
    ySize = src.height,
    srcPixels = src.data,
    dstPixels = dst.data,
    x, y, i;

  var pixelsPerBin = xBinSize * yBinSize,
    red, green, blue, alpha,
    nBinsX = Math.ceil(xSize / xBinSize),
    nBinsY = Math.ceil(ySize / yBinSize),
    xBinStart, xBinEnd, yBinStart, yBinEnd,
    xBin, yBin, pixelsInBin;

  for (xBin = 0; xBin < nBinsX; xBin += 1) {
    for (yBin = 0; yBin < nBinsY; yBin += 1) {

      // Initialize the color accumlators to 0
      red = 0;
      green = 0;
      blue = 0;
      alpha = 0;

      // Determine which pixels are included in this bin
      xBinStart = xBin * xBinSize;
      xBinEnd = xBinStart + xBinSize;
      yBinStart = yBin * yBinSize;
      yBinEnd = yBinStart + yBinSize;

      // Add all of the pixels to this bin!
      pixelsInBin = 0;
      for (x = xBinStart; x < xBinEnd; x += 1) {
        if( x >= xSize ){ continue; }
        for (y = yBinStart; y < yBinEnd; y += 1) {
          if( y >= ySize ){ continue; }
          i = (xSize * y + x) * 4;
          red += srcPixels[i + 0];
          green += srcPixels[i + 1];
          blue += srcPixels[i + 2];
          alpha += srcPixels[i + 3];
          pixelsInBin += 1;
        }
      }

      // Make sure the channels are between 0-255
      red = red / pixelsInBin;
      green = green / pixelsInBin;
      blue = blue / pixelsInBin;
      alphas = alpha / pixelsInBin;

      // Draw this bin
      for (x = xBinStart; x < xBinEnd; x += 1) {
        if( x >= xSize ){ continue; }
        for (y = yBinStart; y < yBinEnd; y += 1) {
          if( y >= ySize ){ continue; }
          i = (xSize * y + x) * 4;
          dstPixels[i + 0] = red;
          dstPixels[i + 1] = green;
          dstPixels[i + 2] = blue;
          dstPixels[i + 3] = alpha;
        }
      }
    }
  }

};
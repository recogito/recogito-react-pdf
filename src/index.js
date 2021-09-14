const PDFJS = require('pdfjs-dist/webpack');

const URL = 'compressed.tracemonkey-pldi-09.pdf';

window.onload = function() {
  
  PDFJS.getDocument(URL).promise.then(function(pdf) {
    const pageNumber = 1;

    pdf.getPage(pageNumber).then(function(page) {          
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      // Prepare canvas using PDF page dimensions
      const canvas = document.createElement('canvas');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      document.getElementById('app').appendChild(canvas);

      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport
      };

      page.render(renderContext).promise.then(function () {
        console.log('Page rendered');
      });
      
    });

  }, function(error) {
    // Error loading PDF
    console.error(error);
  });

}
import React, { useEffect, useRef, useState } from 'react';

const PDFJS = require('pdfjs-dist/webpack');

const PDFViewer = props => {
  
  const containerEl = useRef();

  const [ pdf, setPdf ] = useState();

  useEffect(() => {
    // Load document
    PDFJS.getDocument(props.url).promise.then(pdf => { 
      setPdf(pdf);
    }, error => {
      // Error loading PDF
      console.error(error);
    });
  }, []);

  useEffect(() => {

  }, [ props.page ]);

  /*
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
  */

  return (
    <div 
      ref={containerEl}
      className="pdf-viewer-container"></div>
  )

}

export default PDFViewer;
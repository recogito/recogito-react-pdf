import React, { useEffect, useRef, useState } from 'react';
import * as PDFJS from 'pdfjs-dist/webpack';
import { Recogito } from '@recogito/recogito-js';

import 'pdfjs-dist/web/pdf_viewer.css';
import '@recogito/recogito-js/dist/recogito.min.css';

const AnnotatablePage = props => {

  const containerEl = useRef();

  const [ recogito, setRecogito ] = useState();

  useEffect(() => {
    // Clean up previous Recogito instance, if any
    if (recogito)
      recogito.destroy();

    const prevCanvas = containerEl.current.querySelector('canvas');
    if (prevCanvas) {
      containerEl.current.removeChild(prevCanvas);
      containerEl.current.querySelector('.textLayer').innerHTML = '';
    }

    if (props.page) {
      const scale = 1.8;
      const viewport = props.page.getViewport({ scale });

      // Prepare canvas using PDF page dimensions
      const canvas = document.createElement('canvas');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      containerEl.current.appendChild(canvas);

      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport
      };

      props.page.render(renderContext).promise.then(function () {
        console.log('Page rendered');

        const r = new Recogito({ content: containerEl.current.querySelector('.textLayer'), mode: 'pre' });
        setRecogito(r)
      });

      props.page.getTextContent().then(textContent => {
        PDFJS.renderTextLayer({
          textContent: textContent,
          container: containerEl.current.querySelector('.textLayer'),
          viewport: viewport,
          textDivs: []
        });
      });
    }
  }, [ props.page ]);

  return (
    <div
      ref={containerEl} 
      className={props.debug ? 'page-container debug' : 'page-container'}>
      <div className="textLayer" />
    </div>
  )

}

export default AnnotatablePage;
import React, { useEffect, useRef, useState } from 'react';
import * as PDFJS from 'pdfjs-dist/webpack';
import { Recogito } from '@recogito/recogito-js';

import 'pdfjs-dist/web/pdf_viewer.css';
import '@recogito/recogito-js/dist/recogito.min.css';

const AnnotatablePage = props => {

  const containerEl = useRef();

  const [ recogito, setRecogito ] = useState();

  // Cleanup previous Recogito instance, canvas + text layer
  const destroyPreviousPage = () => {
    // Clean up previous Recogito instance, if any
    if (recogito)
      recogito.destroy();

    const canvas = containerEl.current.querySelector('canvas');
    if (canvas)
      containerEl.current.removeChild(canvas);

    const textLayer = containerEl.current.querySelector('.textLayer');
    textLayer.innerHTML = '';
  }

  // Render on page change
  useEffect(() => {
    destroyPreviousPage();

    if (props.page) {
      const scale = props.scale || 1.8;
      const viewport = props.page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      containerEl.current.appendChild(canvas);

      const renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport
      };

      props.page.render(renderContext).promise.then(function () {
        const r = new Recogito({ 
          content: containerEl.current.querySelector('.textLayer'), 
          mode: 'pre' 
        });

        setRecogito(r)
      });

      props.page.getTextContent().then(textContent => PDFJS.renderTextLayer({
        textContent: textContent,
        container: containerEl.current.querySelector('.textLayer'),
        viewport: viewport,
        textDivs: []
      }));
    }
  }, [ props.page ]);

  useEffect(() => {
    console.log('setting annotation mode to ' + props.annotationMode);
    recogito?.setMode(props.annotationMode);
  }, [ props.annotationMode ])

  return (
    <div
      ref={containerEl} 
      className={props.debug ? 'page-container debug' : 'page-container'}>
      <div className="textLayer" />
    </div>
  )

}

export default AnnotatablePage;
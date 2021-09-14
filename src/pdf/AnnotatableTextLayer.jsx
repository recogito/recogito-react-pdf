import React, { useEffect, useRef } from 'react';
import * as PDFJS from 'pdfjs-dist/webpack';
import { Recogito } from '@recogito/recogito-js';

import 'pdfjs-dist/web/pdf_viewer.css';
import '@recogito/recogito-js/dist/recogito.min.css';

const AnnotatableTextLayer = props => {

  const elem = useRef();

  useEffect(() => {
    if (props.page && elem.current && props.viewport) {
      props.page.getTextContent().then(textContent => {
        PDFJS.renderTextLayer({
          textContent: textContent,
          container: elem.current,
          viewport: props.viewport,
          textDivs: []
        }).promise.then(() => {

          const r = new Recogito({ content: elem.current, mode: 'pre' });

        });
      });
    }
  }, [ props.viewport ]);

  return (
    <div
      ref={elem} 
      className={props.debug ? 'textLayer debug' : 'textLayer'} />
  )

}

export default AnnotatableTextLayer;
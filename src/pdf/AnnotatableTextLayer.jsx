import React, { useEffect, useRef } from 'react';
import * as PDFJS from 'pdfjs-dist/webpack';

import 'pdfjs-dist/web/pdf_viewer.css';

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

          // TODO: init RecogitoJS
          
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
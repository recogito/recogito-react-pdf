import React, { useEffect, useRef, useState } from 'react';
import AnnotatableTextLayer from './AnnotatableTextLayer';

const AnnotatablePage = props => {

  const containerEl = useRef();

  const [ viewport, setViewport ] = useState();

  useEffect(() => {
    if (props.page) {
      const scale = 1.8;
      const viewport = props.page.getViewport({ scale });

      setViewport(viewport);

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
      });
    }
  }, [ props.page ]);

  return (
    <div ref={containerEl} className="page-container">
      <AnnotatableTextLayer page={props.page} viewport={viewport} />
    </div>
  )

}

export default AnnotatablePage;
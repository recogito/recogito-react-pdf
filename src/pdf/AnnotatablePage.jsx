import React, { useEffect, useRef, useState } from 'react';

const AnnotatablePage = props => {

  const containerEl = useRef();

  const [ recogito, setRecogito ] = useState();

  useEffect(() => {
    if (props.page) {
      const scale = 1.5;
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
      });
    }
  }, [ props.page ]);

  return (
    <div ref={containerEl} className="page-container"></div>
  )

}

export default AnnotatablePage;
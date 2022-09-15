import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { pdfjs, PDFViewer } from '../src';

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

const App = () => {

  const [ annotations, setAnnotations ] = useState();

  useEffect(() => {
    fetch('sample-annotations.json')
      .then(response => response.json())
      .then(setAnnotations);
  }, []);

  return (
    <PDFViewer 
      mode="scrolling"
      url="compressed.tracemonkey-pldi-09.pdf" 
      annotations={annotations} 
      onCreateAnnotation={a => console.log(JSON.stringify(a))} 
      onUpdateAnnotation={(a, b) => console.log(JSON.stringify(a, b))} 
      onDeleteAnnotation={a => console.log(JSON.stringify(a))} />
  )

}

window.onload = function() {

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
    
}


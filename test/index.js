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
      url="compressed.tracemonkey-pldi-09.pdf" 
      annotations={annotations} />
  )

}

window.onload = function() {

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
    
}


import React from 'react';
import ReactDOM from 'react-dom';
import PDFViewer from './pdf/PDFViewer';

const URL = 'compressed.tracemonkey-pldi-09.pdf';

window.onload = function() {

  ReactDOM.render(
    <PDFViewer url={URL} />,
    document.getElementById('app')
  );
    
}
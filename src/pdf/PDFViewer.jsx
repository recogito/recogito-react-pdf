import React, { useEffect, useState } from 'react';
import * as PDFJS from 'pdfjs-dist/webpack';

import AnnotatablePage from './AnnotatablePage';

const PDFViewer = props => {

  const [ pdf, setPdf ] = useState();

  const [ page, setPage ] = useState();

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
    if (pdf) {
      const pageNumber = 1;

      pdf.getPage(pageNumber).then(function(page) { 
        setPage(page);   
      });
    }
  }, [ pdf ]);

  return (
    <div className="pdf-viewer-container">
      <AnnotatablePage page={page} />
    </div>
  )

}

export default PDFViewer;
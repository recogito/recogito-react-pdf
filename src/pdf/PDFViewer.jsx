import React, { useEffect, useState } from 'react';
import * as PDFJS from 'pdfjs-dist/webpack';

import AnnotatablePage from './AnnotatablePage';

import './PDFViewer.css';

const PDFViewer = props => {

  const [ pdf, setPdf ] = useState();

  const [ page, setPage ] = useState();

  const [ debug, setDebug ] = useState(false);

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
      pdf.getPage(1).then(function(page) { 
        setPage(page);   
      });
    }
  }, [ pdf ]);

  const onToggleDebug = () => 
    setDebug(!debug);

  const onPreviousPage = () => {
    const { pageNumber } = page;

    const prevNum = Math.max(0, pageNumber - 1);

    if (prevNum !== pageNumber)
      pdf.getPage(prevNum).then(page => setPage(page));
  }

  const onNextPage = () => {
    const { numPages } = pdf;
    const { pageNumber } = page;

    const nextNum = Math.min(pageNumber + 1, numPages);

    if (nextNum !== pageNumber)
      pdf.getPage(nextNum).then(page => setPage(page));
  }

  return (
    <div>
      <header>
        <button onClick={onToggleDebug}>Toggle Text Layer</button>
        <button onClick={onPreviousPage}>Previous</button>
        <label>{page?.pageNumber} / {pdf?.numPages}</label>
        <button onClick={onNextPage}>Next</button>
      </header>
      <main>
        <div className="pdf-viewer-container">
          <AnnotatablePage page={page} debug={debug} />
        </div>
      </main>
    </div>
  )

}

export default PDFViewer;
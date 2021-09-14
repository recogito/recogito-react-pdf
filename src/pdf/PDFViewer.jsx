import React, { useEffect, useState } from 'react';
import * as PDFJS from 'pdfjs-dist/webpack';  
import { CgDebug, CgChevronLeft, CgChevronRight, CgArrowsExpandDownRight } from 'react-icons/cg';

import AnnotatablePage from './AnnotatablePage';

import './PDFViewer.css';

const PDFViewer = props => {

  const [ pdf, setPdf ] = useState();

  const [ page, setPage ] = useState();

  const [ debug, setDebug ] = useState(false);

  const [ annotationMode, setAnnotationMode ] = useState('ANNOTATION');

  // Load PDF on mount
  useEffect(() => {
    PDFJS.getDocument(props.url).promise
      .then(
        pdf => setPdf(pdf), 
        error => console.error(error)
      );
  }, []);

  // Render first page when PDF loaded
  useEffect(() => {
    if (pdf)
      pdf.getPage(1).then(setPage);
  }, [ pdf ]);

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

  const onToggleMode = () => {
    if (annotationMode === 'ANNOTATION')
      setAnnotationMode('RELATIONS')
    else 
      setAnnotationMode('ANNOTATION');
  }

  return (
    <div>
      <header>
        <button onClick={() => setDebug(!debug)}>
          <span className="inner">
            <CgDebug />
          </span>
        </button>

        <button onClick={onPreviousPage}>
          <span className="inner">
            <CgChevronLeft />
          </span>
        </button>

        <label>{page?.pageNumber} / {pdf?.numPages}</label>
        
        <button onClick={onNextPage}>
          <span className="inner">
            <CgChevronRight />
          </span>
        </button>

        <button className={annotationMode === 'RELATIONS' ? 'active' : null} onClick={onToggleMode}>
          <span className="inner">
            <CgArrowsExpandDownRight />
          </span>
        </button>
      </header>

      <main>
        <div className="pdf-viewer-container">
          <AnnotatablePage 
            page={page} 
            debug={debug} 
            annotationMode={annotationMode} />
        </div>
      </main>
    </div>
  )

}

export default PDFViewer;
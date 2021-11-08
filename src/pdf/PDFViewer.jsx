import React, { useEffect, useState } from 'react';
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf';
import { CgDebug, CgChevronLeft, CgChevronRight, CgArrowsExpandDownRight } from 'react-icons/cg';
import { RiImageEditFill } from 'react-icons/ri';

import Store from './AnnotationStore';
import AnnotatablePage from './AnnotatablePage';

import './PDFViewer.css';

const store = new Store();

/** 
 * Helper to insert the page index into the annotation target
 */
const extendTarget = (annotation, source, page) => {

  // HACK! This holds true for the time being, but is not
  // a very robust criterion...
  const isRelationAnnotation = Array.isArray(annotation.target);

  // Adds 'page' field to selector (unless it's a TextQuoteSelector)
  const extendSelector = selector => selector.type === 'TextQuoteSelector' ? 
    selector : { ...selector, page };

  if (isRelationAnnotation) {
    // Nothing to change, just dd source
    return {
      ...annotation,
      target: annotation.target.map(t => ({
        id: t.id, source
      }))
    };
  } else {
    return Array.isArray(annotation.target.selector) ? 
      {
        ...annotation,
        target: {
          source,
          selector: annotation.target.selector.map(extendSelector)
        }
      } : {
        ...annotation,
        target: {
          source,
          selector: extendSelector(annotation.target.selector)
        }
      }
  }
    
}

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
    if (pdf) {
      pdf.getPage(1).then(setPage);
    }
  }, [ pdf ]);

  useEffect(() => {
    store.setAnnotations(props.annotations || []);
  }, [ props.annotations ])

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

  const onToggleRelationsMode = () => {
    if (annotationMode === 'RELATIONS')
      setAnnotationMode('ANNOTATION');
    else
      setAnnotationMode('RELATIONS'); 
  }

  const onToggleImageMode = () => {
    if (annotationMode === 'IMAGE')
      setAnnotationMode('ANNOTATION');
    else
      setAnnotationMode('IMAGE');
  }

  const onCreateAnnotation = a => {
    // Insert page number in target
    const extended = extendTarget(a, props.url, page.pageNumber);

    // Store in memory
    store.createAnnotation(extended);

    // Trigger outside event handler, if any
    props.onCreateAnnotation && props.onCreateAnnotation(extended);
  }

  const onUpdateAnnotation = (a, p) => {
    const updated = extendTarget(a, props.url, page.pageNumber);
    const previous = extendTarget(p, props.url, page.pageNumber);

    store.updateAnnotation(updated, previous);

    props.onUpdateAnnotation && props.onUpdateAnnotation(updated, previous);
  }
    
  const onDeleteAnnotation = a => {
    const extended = extendTarget(a, props.url, page.pageNumber);
    store.deleteAnnotation(extended);
    props.onDeleteAnnotation && props.onDeleteAnnotation(extended);
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

        <button 
          className={annotationMode === 'RELATIONS' ? 'active' : null} 
          onClick={onToggleRelationsMode}>
          <span className="inner">
            <CgArrowsExpandDownRight />
          </span>
        </button>

        <button
          className={annotationMode === 'IMAGE' ? 'active' : null} 
          onClick={onToggleImageMode}>
          <span className="inner">
            <RiImageEditFill />
          </span>
        </button>
      </header>

      <main>
        <div className="pdf-viewer-container">
          <AnnotatablePage 
            page={page} 
            annotations={page ? store.getAnnotations(page.pageNumber) : []}
            config={props.config}
            debug={debug} 
            annotationMode={annotationMode} 
            onCreateAnnotation={onCreateAnnotation}
            onUpdateAnnotation={onUpdateAnnotation}
            onDeleteAnnotation={onDeleteAnnotation} />
        </div>
      </main>
    </div>
  )

}

export default PDFViewer;
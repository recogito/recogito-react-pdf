import React, { useEffect, useState } from 'react';
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf';
import Connections from '@recogito/recogito-connections';

import EndlessViewer from './endless/EndlessViewer';
import PaginatedViewer from './paginated/PaginatedViewer';
import Store from './AnnotationStore';

import 'pdfjs-dist/web/pdf_viewer.css';
import '@recogito/recogito-js/dist/recogito.min.css';
import '@recogito/annotorious/dist/annotorious.min.css';
import './PDFViewer.css';

const store = new Store();

const PDFViewer = props => {

  const [ pdf, setPdf ] = useState();

  const [ connections, setConnections ] = useState();

  // Load PDF on mount
  useEffect(() => {
    // Init after DOM load
    const conn = new Connections([], { 
      showLabels: true,
      vocabulary: props.config.relationVocabulary
    });

    setConnections(conn);

    PDFJS.getDocument(props.url).promise
      .then(
        pdf => setPdf(pdf), 
        error => console.error(error)
      );

    // Destroy connections layer on unmount
    return () => conn.destroy();
  }, []);

  useEffect(() => {
    store.setAnnotations(props.annotations || []);
  }, [ props.annotations ])

  const onCreateAnnotation = a => {
    store.createAnnotation(a);
    props.onCreateAnnotation && props.onCreateAnnotation(a);
  }

  const onUpdateAnnotation = (a, p) => {
    store.updateAnnotation(a, p);
    props.onUpdateAnnotation && props.onUpdateAnnotation(a, p);
  }
    
  const onDeleteAnnotation = a => {
    store.deleteAnnotation(a);
    props.onDeleteAnnotation && props.onDeleteAnnotation(a);
  }

  const onCancelSelected = a => {
    props.onCancelSelected && props.onCancelSelected(a);
  }

  return pdf ? 
    props.mode === 'scrolling' ? 
      <EndlessViewer
        {...props}
        pdf={pdf}
        store={store}
        connections={connections}
        onCreateAnnotation={onCreateAnnotation}
        onUpdateAnnotation={onUpdateAnnotation}
        onDeleteAnnotation={onDeleteAnnotation} 
        onCancelSelected={onCancelSelected} /> :
      
      <PaginatedViewer 
        {...props}
        pdf={pdf}
        store={store}
        connections={connections}
        onCreateAnnotation={onCreateAnnotation}
        onUpdateAnnotation={onUpdateAnnotation}
        onDeleteAnnotation={onDeleteAnnotation} 
        onCancelSelected={onCancelSelected} />
    
    : null;

}

export default PDFViewer;
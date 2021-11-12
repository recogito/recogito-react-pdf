# Recogito-PDF

Annotate a PDF document in React. Powered by [PDF.js](https://mozilla.github.io/pdf.js/),
[RecogitoJS](https://github.com/recogito/recogito-js) and [Annotorious](https://github.com/recogito/annotorious).

![A screenshot of the React PDF annotation component](https://github.com/recogito/recogito-pdf/raw/main/sceenshot.png)

## Using the Component

- Import the `PDFViewer` component and provide the `url` to the PDF file
- It's recommended to set a link to `pdf.worker.js` from PDF.js (copy included in folder `public`)

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { pdfjs, PDFViewer } from '@recogito/recogito-react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

window.onload = function() {

  // Recogito init config (optional)
  // see https://github.com/recogito/recogito-js/wiki/API-Reference
  const config = { /* ... */ };

  // Initial annotations in W3C Web Annotation format
  const annotations = [ /* ... */ ];

  // CRUD event handlers
  const onCreateAnnotation = function () { /* ... */ };
  const onUpdateAnnotation = function () { /* ... */ };
  const onDeleteAnnotation = function () { /* ... */ };

  // Viewer mode can be "paginated" or "scrolling"
  const mode = "paginated"; 

  ReactDOM.render(
    <PDFViewer
      url="compressed.tracemonkey-pldi-09.pdf" 
      mode={mode}
      config={config} 
      annotations={annotations} 
      onCreateAnnotation={onCreateAnnotation} 
      onUpdateAnnotation={onCreateAnnotation} 
      onDeleteAnnotation={onCreateAnnotation} />,
    document.getElementById('app')
  );
    
}
```

# Recogito-PDF

Annotate a PDF document in React. Powered by [PDF.js](https://mozilla.github.io/pdf.js/) and [RecogitoJS](https://github.com/recogito/recogito-js).

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

  ReactDOM.render(
    <PDFViewer url="compressed.tracemonkey-pldi-09.pdf" />,
    document.getElementById('app')
  );
    
}
```

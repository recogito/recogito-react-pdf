import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
import PDFViewer from './pdf/PDFViewer';

pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

export { 
  pdfjs, PDFViewer
}

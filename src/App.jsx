import React from 'react';
import PDFViewer from './pdf/PDFViewer';

const URL = 'compressed.tracemonkey-pldi-09.pdf';

const App = props => {
  
  return (
    <div>
      <PDFViewer url={URL} />
    </div>
  )

}

export default App;
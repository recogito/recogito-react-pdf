/** A minimal local annotation store **/
export default class AnnotationStore {

  constructor() {
    this._annotations = [];
  }

  setAnnotations(annotations) {
    this._annotations = annotations;
  }

  createAnnotation(annotation) {
    this._annotations.push(annotation);
  }

  updateAnnotation(updated, previous) {
    this._annotations = this._annotations.map(a => 
      a.id === previous.id ? updated : a);
  }

  deleteAnnotation(annotation) {
    this._annotations = this._annotations.filter(a => 
      a.id !== annotation.id);
  }

  getAnnotations(pageNumber) {
    const isOnPage = annotation => {
      const positionSelector = annotation.target.selector
        .find(({ type }) => type === 'TextPositionSelector'); 

      return positionSelector?.page == pageNumber;
    };

    return this._annotations.filter(isOnPage);
  }

}
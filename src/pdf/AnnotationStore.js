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
    // Text annotations on this page
    const isOnPage = annotation => {
      const positionSelector = annotation.target.selector ?
        annotation.target.selector.find(({ type }) => type === 'TextPositionSelector') : null; 

      return positionSelector?.page == pageNumber;
    };

    const annotationsOnPage = this._annotations.filter(isOnPage);

    // Relations linked to the given annotations
    const ids = new Set(annotationsOnPage.map(a => a.id));
    const linkedRelations = this._annotations
      .filter(a => !a.target.selector) // all relations
      .filter(a => {
        const from = a.target[0].id;
        const to = a.target[1].id;

        return ids.has(from) || ids.has(to);
      });

    return [...annotationsOnPage, ...linkedRelations ];
  }

}
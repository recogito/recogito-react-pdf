/** Inserts the page number into the annotation target **/
export const extendTarget = (annotation, source, page) => {

  // Not a very robust criterion... but holds for now
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

/** Splits annotations by type, text or image **/
export const splitByType = annotations => {
  let text = [];
  let image = [];

  annotations.forEach(a => {
    if (a.target.selector) {
      const selectors = Array.isArray(a.target.selector) ?
        a.target.selector : [ a.target.selector ];
      
      const hasImageSelector =
        selectors.find(s => s.type === 'FragmentSelector' || s.type === 'SvgSelector');

      if (hasImageSelector)
        image.push(a);
      else
        text.push(a);
    } else {
      // Relationship
      text.push(a);
    }
  });

  return { text, image };
}
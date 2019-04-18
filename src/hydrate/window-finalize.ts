import * as d from '../declarations';
import { collapseHtmlWhitepace } from '../compiler/html/collapse-html-whitespace';
import { optimizeStyles } from '../compiler/html/optimize-styles';
import { relocateMetaCharset } from '../compiler/html/relocate-meta-charset';
import { renderError } from './render-utils';
import { updateCanonicalLink } from '../compiler/html/canonical-link';


export async function finalizeWindow(win: Window, doc: Document, opts: d.HydrateOptions, results: d.HydrateResults) {
  optimizeStyles(doc, opts, results);

  if (typeof opts.title === 'string') {
    try {
      doc.title = opts.title;
    } catch (e) {}
  }

  if (opts.removeScripts) {
    removeScripts(doc.documentElement);
  }

  if (opts.collapseWhitespace) {
    try {
      collapseHtmlWhitepace(doc.documentElement);
    } catch (e) {}
  }

  if (typeof opts.canonicalLink === 'string') {
    try {
      updateCanonicalLink(doc, opts.canonicalLink);
    } catch (e) {}
  }

  try {
    relocateMetaCharset(doc);
  } catch (e) {}

  if (typeof opts.afterHydrate === 'function') {
    try {
      await opts.afterHydrate(win, opts);
    } catch (e) {
      renderError(results, e);
    }
  }

  if (opts.clientHydrateAnnotations) {
    doc.documentElement.classList.add('hydrated');
  }

  results.title = doc.title;
}


function removeScripts(elm: HTMLElement) {
  const children = elm.children;
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];
    removeScripts(child as any);

    if (child.nodeName === 'SCRIPT') {
      child.remove();
    }
  }
}

import * as d from '../../declarations';


export function parseCssCustomProperties(styleText: string) {
  const cssProps: d.CssCustomProperty[] = [];

  if (typeof styleText !== 'string') {
    return cssProps;
  }

  let startIndex: number;
  while ((startIndex = styleText.indexOf(CSS_DOC_START)) > -1) {
    styleText = styleText.substring(startIndex + CSS_DOC_START.length);

    const endIndex = styleText.indexOf(CSS_DOC_END);
    if (endIndex === -1) {
      break;
    }

    const comment = styleText.substring(0, endIndex);
    parseCssComment(cssProps, comment);

    styleText = styleText.substring(endIndex + CSS_DOC_END.length);
  }

  return cssProps;
}


function parseCssComment(cssProps: d.CssCustomProperty[], comment: string) {
  /**
   * @prop --max-width: Max width of the alert
   */

  const lines = comment.split(/\r?\n/);

  lines.forEach(ln => {
    let line = ln.trim();

    if (!line.startsWith(`*`)) {
      return;
    }

    line = line.substring(1).trim();

    if (!line.startsWith(CSS_PROP_KEYWORD)) {
      return;
    }

    line = line.substring(CSS_PROP_KEYWORD.length).trim();

    if (!line.startsWith(`--`)) {
      return;
    }

    const splt = line.split(`:`);
    const cssProp: d.CssCustomProperty = {
      name: splt[0].trim(),
      description: (splt.shift() && splt.join(`:`)).trim()
    };

    cssProps.push(cssProp);
  });

  return cssProps;
}

const CSS_DOC_START = `/**`;
const CSS_DOC_END = `*/`;
const CSS_PROP_KEYWORD = `@prop`;

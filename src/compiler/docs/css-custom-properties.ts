import * as d from '../../declarations';
import { MarkdownCssCustomProperties } from './markdown-css-properties';


export function parseCssCustomProperties(cssCustomProps: MarkdownCssCustomProperties, cmpMeta: d.ComponentMeta) {
  if (!cmpMeta.stylesMeta) {
    return;
  }

  Object.keys(cmpMeta.stylesMeta).forEach(modeName => {
    const styleMeta = cmpMeta.stylesMeta[modeName];
    parseCssCustomPropertiesStyle(cssCustomProps, styleMeta);
  });
}


export function parseCssCustomPropertiesStyle(cssCustomProps: MarkdownCssCustomProperties, styleMeta: d.StyleMeta) {
  if (typeof styleMeta.styleStr === 'string') {
    parseCssCustomPropertiesStyleText(cssCustomProps, styleMeta.styleStr);
  }

  if (styleMeta.externalStyles) {
    styleMeta.externalStyles.forEach(extStylePath => {
      const styleText = extStylePath.absolutePath;
      parseCssCustomPropertiesStyleText(cssCustomProps, styleText);
    });
  }
}


export function parseCssCustomPropertiesStyleText(cssCustomProps: MarkdownCssCustomProperties, styleText: string) {
  cssCustomProps;
  styleText;
}

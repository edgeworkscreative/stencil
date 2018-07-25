import * as d from '../../declarations';


export class MarkdownCssCustomProperties {
  private rows: Row[] = [];

  addRow(cssProp: d.CssCustomProperty) {
    this.rows.push(new Row(cssProp.name, cssProp.description));
  }

  toMarkdown() {
    const content: string[] = [];
    if (!this.rows.length) {
      return content;
    }

    content.push(`## CSS Custom Properties`);
    content.push(``);

    this.rows = this.rows.sort((a, b) => {
      if (a.propName < b.propName) return -1;
      if (a.propName > b.propName) return 1;
      return 0;
    });

    this.rows.forEach(row => {
      content.push(...row.toMarkdown());
    });

    return content;
  }
}


class Row {

  constructor(public propName: string, private description: string) {}

  toMarkdown() {
    const content: string[] = [];

    content.push(`#### ${this.propName}`);
    content.push(``);
    content.push(this.description);
    content.push(``);
    content.push(``);

    return content;
  }
}

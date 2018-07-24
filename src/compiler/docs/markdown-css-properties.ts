
export class MarkdownCssCustomProperties {
  private rows: Row[] = [];

  addRow(cssPropName: string, description: string) {
    this.rows.push(new Row(cssPropName, description));
  }

  toMarkdown() {
    const content: string[] = [];
    if (!this.rows.length) {
      return content;
    }

    content.push(`## CSS Custom Properties`);
    content.push(``);

    this.rows = this.rows.sort((a, b) => {
      if (a.cssPropName < b.cssPropName) return -1;
      if (a.cssPropName > b.cssPropName) return 1;
      return 0;
    });

    this.rows.forEach(row => {
      content.push(...row.toMarkdown());
    });

    return content;
  }
}


class Row {

  constructor(public cssPropName: string, private description: string) {}

  toMarkdown() {
    const content: string[] = [];

    content.push(`#### ${this.cssPropName}()`);
    content.push(``);
    content.push(this.description);
    content.push(``);
    content.push(``);

    return content;
  }
}

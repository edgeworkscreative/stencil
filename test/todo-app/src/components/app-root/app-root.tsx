import { Component, State, h } from '@stencil/core';


@Component({
  tag: 'app-root'
})
export class AppRoot {

  @State() list: TodoItem[] = [
    { text: 'my initial todo', checked: false },
    { text: 'Learn about Web Components', checked: true }
  ];

  private inputSubmiHandler = (e: CustomEvent) => {
    this.list = [...this.list, { text: e.detail, checked: false, }];
  }

  private itemCheckedHandler = (e: CustomEvent) => {
    const list = [...this.list];
    const item = list[e.detail];
    list[e.detail] = Object.assign({}, item, { checked: !item.checked });
    this.list = list;
  }

  private itemRemoveHandler = (e: CustomEvent) => {
    this.list = [...this.list.slice(0, e.detail), ...this.list.slice(e.detail + 1)];
  }

  private toggleAllHandler = (e: CustomEvent) => {
    this.list = this.list.map(item => {
      item.checked = !!(e.target as HTMLInputElement).checked;
      return item;
    });
  }

  render() {
    const allChecked = this.list.every(item => item.checked);
    return (
      <div>
        <header class="header">
          <h1>Todos Stencil</h1>
          <todo-input onInputSubmit={this.inputSubmiHandler}></todo-input>
        </header>
        <section class="main" hidden={this.list.length === 0}>
          <input
            id="toggle-all"
            onInput={this.toggleAllHandler}
            class="toggle-all"
            type="checkbox"
            checked={allChecked}/>
          <label htmlFor="toggle-all"/>
          <ul class="todo-list">
            {this.list.map((item, index) => (
              <todo-item
                onItemCheck={this.itemCheckedHandler}
                onItemRemove={this.itemRemoveHandler}
                checked={item.checked}
                text={item.text}
                index={index}
              />
            ))}
          </ul>
        </section>
      </div>
    );
  }
}

interface TodoItem {
  text: string;
  checked: boolean;
}

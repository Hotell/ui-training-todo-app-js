import { Button } from './button.component'
import { Todo } from './models'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-top: solid 1px #ddd;
      min-height: 30px;
      line-height: 30px;
    }
    .todo-title {
      flex-grow: 1;
      padding-left: 11px;
    }
  </style>
  <span class="todo-title"></span>
  <${Button.is} class="danger">remove</${Button.is}>
`

export interface RemoveTodoEvent extends CustomEvent {
  detail: {
    item: Todo
  }
}
export class Item extends HTMLElement {
  static is = 'my-item'
  static events = {
    removeItem: 'remove-item',
  }
  private _item: Todo
  get item() {
    return this._item
  }
  set item(val: Todo) {
    this._item = val
    this.itemElement.textContent = val.text
  }

  private removeButton: Button
  private itemElement: HTMLSpanElement
  constructor() {
    super()

    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))

    this.removeButton = shadowRoot.querySelector(Button.is) as Button
    this.itemElement = shadowRoot.querySelector('.todo-title') as HTMLSpanElement
  }
  connectedCallback() {
    this.removeButton.addEventListener('click', this.handleItemRemove.bind(this))
  }
  disconnectedCallback() {
    console.log('Item destroyed!')
  }
  private handleItemRemove(ev: Event) {
    const removeItemEventConfig = { detail: { item: this._item }, bubbles: true, composed: true }
    this.shadowRoot!.dispatchEvent(new CustomEvent(Item.events.removeItem, removeItemEventConfig))
  }
}

export default customElements.define(Item.is, Item)

import { Todo } from './models'

const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      display: flex
    }
    .remove-btn {
      margin-left: auto;
      border-radius: 5px;
      background-color: red;
      color: white;
    }
  </style>
  <span class="todo-title"></span>
  <button class="remove-btn">remove</button>
`

export interface RemoveTodoEvent extends CustomEvent {
  detail: {
    item: Item
  }
}
export class Item extends HTMLElement {
  static is = 'my-item'
  static events = {
    removeItem: 'remove-item',
  }
  private _item: Todo
  set item(val: Todo) {
    this._item = val
    this.itemElement.textContent = val.text
  }

  private removeButton: HTMLButtonElement
  private itemElement: HTMLSpanElement
  constructor() {
    super()

    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))

    this.removeButton = shadowRoot.querySelector('button') as HTMLButtonElement
    this.itemElement = shadowRoot.querySelector('.todo-title') as HTMLSpanElement
  }
  connectedCallback() {
    this.removeButton.addEventListener('click', this.handleItemRemove.bind(this))
  }
  disconnectedCallback() {
    console.log('Item destroyed!')
  }
  private handleItemRemove(ev: Event) {
    const removeItemEventConfig = { detail: { item: this }, bubbles: true, composed: true }
    this.shadowRoot!.dispatchEvent(new CustomEvent(Item.events.removeItem, removeItemEventConfig))
  }
}

export default customElements.define(Item.is, Item)

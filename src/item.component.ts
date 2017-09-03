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

export class Item extends HTMLElement {
  static is = 'my-item'
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
    this.removeButton.addEventListener('click', ev => {
      this.handleItemRemove(ev)
    })
  }
  private handleItemRemove(ev: Event) {
    const removeItemEventConfig = { detail: { item: this }, bubbles: true, composed: true }
    this.shadowRoot!.dispatchEvent(new CustomEvent('remove-item', removeItemEventConfig))

    this.remove()
  }
}

export default customElements.define(Item.is, Item)

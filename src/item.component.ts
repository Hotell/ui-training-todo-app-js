import { Button } from './button.component'
import { AddTodoEvent, Input } from './input.component'
import { Todo } from './models'

export interface ChangeTodoTitleEvent extends CustomEvent {
  detail: {
    oldTodo: Todo
    newTodo: Todo
  }
}
export interface RemoveTodoEvent extends CustomEvent {
  detail: {
    item: Todo
  }
}

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
  <my-input hidden></my-input>
  <${Button.is} class="danger">remove</${Button.is}>
`

export class Item extends HTMLElement {
  static is = 'my-item'
  static events = {
    removeItem: 'remove-item',
    changeTitle: 'change-title',
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
  private inputElement: Input
  constructor() {
    super()

    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))

    this.removeButton = shadowRoot.querySelector(Button.is) as Button
    this.inputElement = shadowRoot.querySelector(Input.is) as Input
    this.itemElement = shadowRoot.querySelector('.todo-title') as HTMLSpanElement
  }
  connectedCallback() {
    this.removeButton.addEventListener('click', this.handleItemRemove.bind(this))
    this.itemElement.addEventListener('click', this.editItem.bind(this))
    this.inputElement.addEventListener('blur', this.cancelEdit.bind(this))
    this.inputElement.addEventListener(Input.events.addTodo, this.handleChangeItemTitle.bind(this))
  }
  disconnectedCallback() {
    console.log('Item destroyed!')
  }
  private editItem(ev: Event) {
    this.itemElement.hidden = true
    this.inputElement.hidden = false
    this.inputElement.todoText = this.item.text
    this.inputElement.focus()
  }
  private cancelEdit(ev?: Event) {
    this.inputElement.hidden = true
    this.itemElement.hidden = false
    this.inputElement.todoText = ''
  }
  private handleItemRemove(ev: Event) {
    const removeItemEventConfig = { detail: { item: this._item }, bubbles: true, composed: true }
    this.shadowRoot!.dispatchEvent(new CustomEvent(Item.events.removeItem, removeItemEventConfig))
  }
  private handleChangeItemTitle(ev: AddTodoEvent) {
    const text = ev.detail.todoText
    const changedTodo = { text }
    this.cancelEdit()

    const changeTitleEventConfig = {
      detail: { oldTodo: this._item, newTodo: changedTodo },
      bubbles: true,
      composed: true,
    }
    this.shadowRoot!.dispatchEvent(new CustomEvent(Item.events.changeTitle, changeTitleEventConfig))
  }
}

export default customElements.define(Item.is, Item)

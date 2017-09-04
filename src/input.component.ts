import { Button } from './button.component'
import { Item } from './item.component'

export interface AddTodoEvent extends CustomEvent {
  detail: {
    todoText: string
  }
}

const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host(:not([hidden])){
      display: block;
    }
    :host form {
      display: flex;
      justify-content: space-between;
      flex-grow: 1;
    }

    :host-context(my-item) ${Button.is}{
      display: none
    }
    :host-context(my-item) {
      width: 100%;
    }

    input {
      padding: 4px 10px 4px;
      font-size: 16px;
      font-family: 'Lucida Grande', Verdana, sans-serif;
      line-height: 20px;
      border: solid 1px #dddddd;
      border-radius: 5px;
      flex-grow: 1;
    }
  </style>
  <form>
    <input type="text"/>
    <${Button.is} type="submit">Add</${Button.is}>
  </form>
`

const ESC_KEY = 27

export class Input extends HTMLElement {
  static is = 'my-input'
  static events = {
    addTodo: 'add-todo',
  }

  private _todoText = ''
  get todoText() {
    return this._todoText
  }
  set todoText(newVal: string) {
    this._todoText = newVal
    this.input.value = newVal
  }

  private form: HTMLFormElement
  private input: HTMLInputElement

  constructor() {
    super()

    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))

    this.form = shadowRoot.querySelector('form') as HTMLFormElement
    this.input = shadowRoot.querySelector('input') as HTMLInputElement
  }

  connectedCallback() {
    console.log('Input loaded')
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', String(0))
    }
    this.form.addEventListener('submit', ev => this.handleSubmit(ev))
    this.input.addEventListener('keyup', ev => {
      if (ev.which === ESC_KEY) {
        this.input.blur()
      }
    })
    this.addEventListener('focus', ev => {
      this.input.focus()
    })
  }

  private handleSubmit(ev: Event) {
    ev.preventDefault()

    const todoText = this.input.value
    const addTodoEventConfig = { detail: { todoText }, bubbles: true, composed: true }
    const addTodoEvent: AddTodoEvent = new CustomEvent(Input.events.addTodo, addTodoEventConfig)
    this.form.dispatchEvent(addTodoEvent)
    this.input.value = ''
  }
}

export default customElements.define(Input.is, Input)

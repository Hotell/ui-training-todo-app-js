const template = document.createElement('template')
template.innerHTML = `
  <style>
  .submit-btn {
    border-radius: 5px;
    background-color: green;
    color: white;
  }
  </style>
  <form>
    <input/>
    <button type="submit" class="submit-btn">Add</button>
  </form>
`

export interface AddTodoEvent extends CustomEvent {
  detail: {
    todoText: string
  }
}

export class Input extends HTMLElement {
  static is = 'my-input'
  static events = {
    addTodo: 'add-todo',
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
    this.form.addEventListener('submit', ev => this.handleSubmit(ev))
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

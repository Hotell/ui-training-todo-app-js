import { AddTodoEvent, Input } from './input.component'
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .remove-btn {
      margin-left: auto;
      border-radius: 5px;
      background-color: red;
      color: white;
    }
    ul {
      display: flex;
      flex-flow: column;
      padding: 0;
    }
    li {
      display: flex;
      list-style: none;
    }
  </style>
  <header>Todo App</header>
  <${Input.is}></${Input.is}>
  <ul></ul>
  <footer>&copy; 2017</footer>
`
export class App extends HTMLElement {
  static is = 'my-app'

  private todoList: HTMLUListElement
  private todoInputElement: Input

  constructor() {
    super()

    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))

    this.todoList = shadowRoot.querySelector('ul') as HTMLUListElement
    this.todoInputElement = shadowRoot.querySelector('my-input') as Input
  }

  connectedCallback() {
    console.log('App loaded!')

    this.todoInputElement.addEventListener(Input.events.addTodo, this.handleAddTodo.bind(this))
  }

  private createLi(text: string) {
    const li = document.createElement('li')
    li.textContent = text

    return li
  }

  private createButton(listItem: HTMLLIElement) {
    const btn = document.createElement('button')
    btn.classList.add('remove-btn')
    btn.textContent = 'X'
    btn.addEventListener('click', ev => {
      listItem.remove()
    })

    return btn
  }

  private addItemToList(text: string) {
    const newItem = this.createLi(text)
    const btn = this.createButton(newItem)

    newItem.appendChild(btn)
    this.todoList.appendChild(newItem)
  }

  private handleAddTodo(ev: CustomEvent) {
    const text = ev.detail.todoText
    this.addItemToList(text)
  }
}

export default customElements.define(App.is, App)

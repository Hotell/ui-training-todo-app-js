import { AddTodoEvent, Input } from './input.component'
import { Item } from './item.component'

const template = document.createElement('template')
template.innerHTML = `
  <style>    
    ul {
      display: flex;
      flex-flow: column;
      padding: 0;
    }
    li {
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
    this.todoList.addEventListener(Item.events.removeItem, this.handleRemoveTodo.bind(this))
  }

  private addItemToList(text: string) {
    const li = document.createElement('li')

    const todoItem = new Item()
    todoItem.item = { text }

    li.appendChild(todoItem)
    this.todoList.appendChild(li)
  }

  private handleRemoveTodo(ev: CustomEvent) {
    const todoItem = ev.detail.item as Item
    todoItem.parentNode!.removeChild(todoItem)
  }

  private handleAddTodo(ev: CustomEvent) {
    const text = ev.detail.todoText
    this.addItemToList(text)
  }
}

export default customElements.define(App.is, App)

import { AddTodoEvent, Input } from './input.component'
import { Item } from './item.component'
import { Todo } from './models'

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

  private todoItems: Array<Todo> = [
    { text: 'install NodeJS' },
    { text: 'create new app' },
    { text: 'serve app' },
    { text: 'develop app' },
    { text: 'deploy app' },
  ]

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

    this.todoItems.forEach(({ text }) => this.addItemToList(text))
  }

  private addItemToList(text: string) {
    const todoItem = new Item()
    todoItem.item = { text }

    const li = document.createElement('li')
    li.appendChild(todoItem)

    this.todoList.appendChild(li)
  }

  private handleRemoveTodo(ev: CustomEvent) {
    const todo = ev.detail.item as Todo
    const todoItemElements = Array.from(this.todoList.querySelectorAll(`li > ${Item.is}`)) as Array<Item>
    todoItemElements.forEach(todoItem => {
      if (todoItem.item === todo) {
        todoItem.parentNode!.removeChild(todoItem)
      }
    })
  }

  private handleAddTodo(ev: CustomEvent) {
    const text = ev.detail.todoText
    this.addItemToList(text)
  }
}

export default customElements.define(App.is, App)

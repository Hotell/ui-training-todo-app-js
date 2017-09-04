import { AddTodoEvent, Input } from './input.component'
import { Item } from './item.component'
import { Todo } from './models'

const template = document.createElement('template')
template.innerHTML = `
  <style>    
    :host {
      display: block;
      position: relative;
      width: 400px;
      padding: 30px 30px 15px;
      background: white;
      border: 1px solid;
      border-color: #dfdcdc #d9d6d6 #ccc;
      border-radius: 2px;
      -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      margin: 20px auto;
    }
    :host:before, :host:after {
      content: '';
      position: absolute;
      z-index: -1;
      height: 4px;
      background: white;
      border: 1px solid #ccc;
      border-radius: 2px;
    }
    :host:after {
      bottom: -3px;
      left: 0;
      right: 0;
      -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    :host:before {
      bottom: -5px;
      left: 2px;
      right: 2px;
      border-color: #c4c4c4;
      -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    }
    :host h1 {
      font-size: 52px;
      line-height: 52px;
      margin-bottom: 30px;
      font-weight: bold;
      text-align: center;
      letter-spacing: -0.8px;
    }
    ${Input.is} {
      margin-bottom: 20px;
    }
  </style>
  <h1>Todo App</h1>
  <${Input.is}></${Input.is}>
  <ul></ul>
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

    this.todoItems.forEach(todo => this.renderTodoItem(todo))
  }

  private renderTodoItem(todo: Todo) {
    const todoItem = new Item()
    todoItem.item = todo

    const li = document.createElement('li')
    li.appendChild(todoItem)

    this.todoList.appendChild(li)
  }

  private handleRemoveTodo(ev: CustomEvent) {
    const todo = ev.detail.item as Todo
    const todoItemElements = Array.from(this.todoList.querySelectorAll(`li > ${Item.is}`)) as Array<Item>

    todoItemElements.forEach((todoItem, idx) => {
      if (todoItem.item === todo) {
        this.todoList.removeChild(todoItem.parentNode!)
        this.todoItems.splice(idx, 1)
      }
    })
  }

  private handleAddTodo(ev: CustomEvent) {
    const text = ev.detail.todoText
    const newTodo = { text }
    this.todoItems.push(newTodo)

    this.renderTodoItem(newTodo)
  }
}

export default customElements.define(App.is, App)

const template = document.createElement('template')
template.innerHTML = `
  <style>
    .submit-btn {
      border-radius: 5px;
      background-color: green;
      color: white;
    }
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
  <form>
    <input/>
    <button type="submit" class="submit-btn">Add</button>
  </form>
  <ul></ul>
  <footer>&copy; 2017</footer>
`
class App extends HTMLElement {
  static is = 'my-app'

  private form: HTMLFormElement
  private input: HTMLInputElement
  private todoList: HTMLUListElement

  constructor() {
    super()

    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(template.content.cloneNode(true))

    this.form = shadowRoot.querySelector('form') as HTMLFormElement
    this.input = shadowRoot.querySelector('input') as HTMLInputElement
    this.todoList = shadowRoot.querySelector('ul') as HTMLUListElement
  }

  connectedCallback() {
    console.log('WORKS!')
    this.form.addEventListener('submit', ev => this.handleSubmit(ev))
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

  private handleSubmit(ev: Event) {
    ev.preventDefault()

    const newValue = this.input.value
    this.addItemToList(newValue)
    this.input.value = ''
  }
}

customElements.define(App.is, App)

export const form = document.querySelector('form') as HTMLFormElement
const input = document.querySelector('input') as HTMLInputElement
const todoList = document.querySelector('ul') as HTMLUListElement

const createLi = (text: string) => {
  const li = document.createElement('li')
  li.textContent = text

  return li
}

const createButton = (listItem: HTMLLIElement) => {
  const btn = document.createElement('button')
  btn.classList.add('remove-btn')
  btn.textContent = 'X'
  btn.addEventListener('click', ev => {
    listItem.remove()
  })

  return btn
}

const addItemToList = (text: string) => {
  const newItem = createLi(text)
  const btn = createButton(newItem)

  newItem.appendChild(btn)
  todoList.appendChild(newItem)
}

export const handleSubmit = (ev: Event) => {
  ev.preventDefault()
  const newValue = input.value
  addItemToList(newValue)
  input.value = ''
}

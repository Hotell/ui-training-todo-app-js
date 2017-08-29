export const form = document.querySelector('form')
const input = document.querySelector('input')
const todoList = document.querySelector('ul')

const createLi = text => {
  const li = document.createElement('li')
  li.textContent = text
  return li
}

const addItemToList = text => {
  const newItem = createLi(text)
  todoList.appendChild(newItem)
}

export const handleSubmit = ev => {
  ev.preventDefault()
  const newValue = input.value
  addItemToList(newValue)
  input.value = ''
}

form.addEventListener('submit', handleSubmit)

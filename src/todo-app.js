export const form = document.querySelector('form')
const input = document.querySelector('input')
const todoList = document.querySelector('ul')

const createLi = text => {
  const li = document.createElement('li')
  li.textContent = text
  return li
}

const createButton = listItem => {
  const btn = document.createElement('button')
  btn.classList.add('remove-btn')
  btn.textContent = 'X'
  btn.addEventListener('click', ev => {
    listItem.remove()
  })
  return btn
}

const addItemToList = text => {
  const newItem = createLi(text)
  const btn = createButton(newItem)

  newItem.appendChild(btn)
  todoList.appendChild(newItem)
}

export const handleSubmit = ev => {
  ev.preventDefault()
  const newValue = input.value
  addItemToList(newValue)
  input.value = ''
}

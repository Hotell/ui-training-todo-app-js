import { form, handleSubmit } from './todo-app'

const main = () => {
  form.addEventListener('submit', handleSubmit)
}

main()

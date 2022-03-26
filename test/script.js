const button = document.querySelector(".button")
const todoList = document.querySelector(".list")
const input = document.querySelector('.text-input')

function AddNewTodo() {
  const inputText = document.querySelector(".text-input")
  const newTodoText = inputText.value

  if (newTodoText == 0) return

  inputText.value = ''

  const newList = document.createElement('li')
  newList.className = 'todo'
  const text = document.createElement('p')
  text.className = 'text'
  text.innerText = newTodoText
  text.addEventListener('click', (e) => {
    let task = e.path[0]
    if (task.innerHTML.includes('<strike>')) {
      task.innerHTML = task.innerText
    } else if (e.path[0].tagName === 'STRIKE') {
      e.path[1].innerHTML = task.innerText
    } else {
      task.innerHTML = `<strike>${task.innerText}</strike>`
    }
  })

  const checkButton = document.createElement('button')
  checkButton.innerText = 'Done'
  checkButton.className = 'checkButton'
  checkButton.addEventListener('click', (e) => {
    let task = e.path[1].childNodes[1].innerHTML
    if (task.includes('<strike>')) {
      e.path[1].childNodes[1].innerHTML = e.path[1].childNodes[1].innerText
    } else {
      e.path[1].childNodes[1].innerHTML = `<strike>${task}</strike>`
    }
  })

  const deleteButton = document.createElement('button')
  deleteButton.innerText = 'Delete'
  deleteButton.className = 'deleteButton'
  deleteButton.addEventListener('click', (e) => {
    e.path[1].remove()
  })

  newList.append(checkButton)
  newList.append(text)
  newList.append(deleteButton)
  todoList.append(newList)
}


input.addEventListener('keypress', (e) => {
  // console.log(e)
  if (e.key === 'Enter') {
    AddNewTodo()
  }
})


button.addEventListener('click', () => {
  AddNewTodo()
})
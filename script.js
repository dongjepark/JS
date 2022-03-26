const inputText = document.querySelector('.text-input')
const btn = document.querySelector('.button')

const addNewTask = () => {
    const input = document.querySelector('.text-input')

    if (input.value === '') return

    const todoList = document.querySelector('.list')

    const newList = document.createElement('div')
    newList.className = 'todo'

    const checkButton = document.createElement('button')
    checkButton.className = 'checkButton'
    checkButton.innerText = '완료'
    checkButton.addEventListener('click', (e) => {
        const task = e.path[1].childNodes[1]

        if (task.innerHTML.includes('<strike>')) {
            task.innerHTML = task.innerText
        } else {
            task.innerHTML =
                `<strike>${task.innerText}</strike>`
        }
    })

    const textArea = document.createElement('p')
    textArea.className = 'text'
    textArea.innerText = input.value
    input.value = ''

    const deleteButton = document.createElement('button')
    deleteButton.className = 'deleteButton'
    deleteButton.innerText = '지우기'
    deleteButton.addEventListener('click', (e) => {
        e.path[1].remove()
    })

    newList.append(checkButton)
    newList.append(textArea)
    newList.append(deleteButton)

    todoList.append(newList)
}

btn.addEventListener('click', (e) => {
    addNewTask()
})

inputText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addNewTask()
    }
})
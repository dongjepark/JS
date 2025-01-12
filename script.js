/*
투두 앱 추가할 기능

1. 날짜, 시간도 내용이랑 같이 입력
2. 목록 안의 내용을 수정 가능
3. 1번을 표시할 수 있는 자그마한 달력
4. 중요도 체크

*/

//let : 변수에 재할당 가능 (변하는 값 저장할 때)
//const : 변수 재선언, 재할당 불가능 (변하지 않는 값 저장할 )

let todoData
let highestIdx
const inputText = document.querySelector('.text-input')
const btn = document.querySelector('.button')
const saveButton = document.querySelector('.save')

btn.addEventListener('click', (e) => {
    const newContent = getText()
    if (newContent === '') return

    addToDB(newContent)

    printTodo()

    saveItem()
})

inputText.addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') return

    const newContent = getText()

    addToDB(newContent)

    const todoList = document.querySelectorAll('.todo')

    printTodo()

    saveItem()
})

onStart()

function onStart() {
    todoData = JSON.parse(localStorage.getItem('todoData'))
    if (todoData === null) {
        localStorage.clear()
        todoData = []
    }

    highestIdx = localStorage.getItem('highestIdx')
    if (highestIdx === null) {
        highestIdx = 0
    }

    todoData.forEach((data) => {
        addNewTask(data)
    })
}

function addNewTask(newTodo) {
    if (newTodo.text === '') return

    const todoList = document.querySelector('.list')

    const newList = document.createElement('div')
    newList.className = 'todo'

    const checkButton = document.createElement('button')
    checkButton.className = 'checkButton'
    checkButton.innerText = '완료'
    checkButton.addEventListener('click', (e) => {
        const task = e.path[1].childNodes[1]
        task.classList.toggle('done')
        if (task.classList.contains('done')) {
            newTodo.done = true
        } else {
            newTodo.done = false
        }
        localStorage.setItem('todoData', JSON.stringify(todoData))
    })

    const textArea = document.createElement('p')
    textArea.className = 'text'
    textArea.innerText = newTodo.text
    if (newTodo.done === true) {
        textArea.classList.toggle('done')
    }
    textArea.addEventListener('click', (e) => {
        const task = e.path[0]
        console.log(task)
        task.classList.toggle('done')
        if (task.classList.contains('done')) {
            newTodo.done = true
        } else {
            newTodo.done = false
        }
        localStorage.setItem('todoData', JSON.stringify(todoData))
    })

    const deleteButton = document.createElement('button')
    deleteButton.className = 'deleteButton'
    deleteButton.innerText = '지우기'
    deleteButton.addEventListener('click', (e) => {
        e.path[1].remove()
        todoData = todoData.filter((data) => {
            return data.idx !== newTodo.idx
        })
        localStorage.setItem('todoData', JSON.stringify(todoData))
    })

    newList.append(checkButton)
    newList.append(textArea)
    // newList.append(editButton)
    newList.append(deleteButton)

    todoList.append(newList)
}

function addToDB(newContent) {
    if (newContent === '') return
    let newTodo = {
        idx: highestIdx++,
        text: newContent,
        done: false,
        important: 0
    }
    todoData.push(newTodo)
}

function printTodo() {
    const todoList = document.querySelectorAll('.todo')

    todoList.forEach((data) => {                            //forEach : 파이썬 for문과 비슷. todoList에 있는 모든 data에 대해 반복적으로 삭제
        data.remove()
    })

    todoData.forEach((data) => {                            //
        addNewTask(data)
    })
}

function getText() {
    const input = document.querySelector('.text-input')     //input : '.text-input'클래스 가진 객체로의 경로
    const inputText = input.value                           //inputText : input(경로)에 접근해서 그 값을 빼옴
    input.value = ''                                        //input.value = '' : 입력란 비워줌
    return inputText                                        //inputText를 리턴해줌 (getText()의 반환값)
}

//localStorage : 문자열만 저장 가능
function saveItem() {
    localStorage.setItem('todoData', JSON.stringify(todoData))  //.setItem : 'todoData' 위치의 값을 JSON 문자열로 변환환 todoData 값으로 설정
    localStorage.setItem('highestIdx', highestIdx)              //'highestIdx 위치의 값을 highestIdx로 설정
}

let index = 0
let currentTasks = []
let completedTasks = []

function initLocalStorage() {
    if (localStorage.getItem('index') != null) {
        if (localStorage.getItem('currentTasks') === '' && localStorage.getItem('completedTasks') === '') {localStorage.setItem('index', 0)}
        index = localStorage.getItem('index')
        if (localStorage.getItem('currentTasks') != '' && localStorage.getItem('currentTasks') != null) {
            for (i = 0; i < localStorage.getItem('currentTasks').split(',').length; i += 2) {
                currentTasks.push([localStorage.getItem('currentTasks').split(',')[i], localStorage.getItem('currentTasks').split(',')[i + 1]])
            }
            currentTasks.forEach(function(elem) {addCurTaskContent(elem[0], elem[1])})

        }
        if (localStorage.getItem('completedTasks') != '' && localStorage.getItem('completedTasks') != null) {
            for (i = 0; i < localStorage.getItem('completedTasks').split(',').length; i += 2) {
                completedTasks.push([localStorage.getItem('completedTasks').split(',')[i], localStorage.getItem('completedTasks').split(',')[i + 1]])
            }
            completedTasks.forEach(function(elem) {addCompTaskContent(elem[0], elem[1])})
        }
    }
}

function addCurTaskContent (taskId, text) {
    document.querySelector('#currentTasks').insertAdjacentHTML("afterend", `<div class="taskBox" id="${`taskBoxId${taskId}`}">
                                                                                <div class="task checker"><img src="./img/done.png" alt="" id="${`doneTask${taskId}`}" class="doneTaskBtn"></div> 
                                                                                <div class="task taskText" id="${`textTask${taskId}`}"> ${text} </div>
                                                                                <div class="task edit"><img src = "./img/edit.png",  id="${`editTask${taskId}`}" class="editTaskBtn"></div>
                                                                                <div class="task"><img src="./img/delete.png" alt="" id="${`deleteTask${taskId}`}" class="delTaskBtn"></div>
                                                                            </div>`)

    document.getElementById(`doneTask${taskId}`).addEventListener('click', () => {doneFn(taskId)})
    document.getElementById(`editTask${taskId}`).addEventListener('click', () => {editFn(taskId)})
    document.getElementById(`deleteTask${taskId}`).addEventListener('click', () => {deleteFn(taskId)})
}

function addFn() {
    if (document.getElementById('addText').value != '') {
        const taskId = index

        addCurTaskContent(taskId, document.getElementById('addText').value)

        currentTasks.push([taskId, document.getElementById('addText').value])
        index++
        localStorage.setItem('currentTasks', currentTasks)
        localStorage.setItem('index', index)

        document.getElementById('addText').value = ''
    }
}

function addCompTaskContent (taskId, text) {
    document.querySelector('#completedTasks').insertAdjacentHTML("afterend", `<div class="completedTaskBox" id="${`taskBoxId${taskId}`}"> <div></div> 
                                                                                    <div class="task taskText" id="${`doneTextTask${taskId}`}">${text}</div> <div></div>
                                                                                    <div class="task delete"><img src="./img/delete.png" alt="" id="${`deleteCompletedTask${taskId}`}" class="delTaskBtn"></div>
                                                                                </div>`)
    document.getElementById(`deleteCompletedTask${taskId}`).addEventListener('click', () => {deleteCompFn(taskId)})
}

function doneFn(taskId) {
    addCompTaskContent(taskId, document.getElementById(`textTask${taskId}`).textContent)

    document.getElementById(`taskBoxId${taskId}`).remove()

    //добавление элемента в массив completed тасков и удаление его из curent тасков
    currentTasks.forEach(function(elem, indx) {
        if (elem[0] == taskId) {
            completedTasks.push(elem)
            currentTasks.splice(indx, 1)
        }
    })

    localStorage.setItem('currentTasks', currentTasks)
    localStorage.setItem('completedTasks', completedTasks)
}

function deleteCompFn(taskId) {
    document.getElementById(`taskBoxId${taskId}`).remove()

    //удаление элемента из массива комплетед тасков
    completedTasks.forEach(function(elem, indx) {
        if (elem[0] == taskId) {completedTasks.splice(indx, 1)}
    })

    localStorage.setItem('completedTasks', completedTasks)
}

function editFn(taskId) {
    let newTaskText = prompt('Edit Task', document.getElementById(`textTask${taskId}`).textContent.trim())
    if (newTaskText != '' && newTaskText != null) {
        document.getElementById(`textTask${taskId}`).textContent = newTaskText

        //изменение элемента в массиве курент тасков
        currentTasks.forEach(function(elem, indx) {
            if (elem[0] == taskId) {elem[1] = newTaskText}
        })

        localStorage.setItem('currentTasks', currentTasks)
    }
}

function deleteFn(taskId) {
    document.getElementById(`taskBoxId${taskId}`).remove()

    //удаление элемента из массива курент тасков
    currentTasks.forEach(function(elem,indx) {
        if (elem[0] == taskId) {currentTasks.splice(indx, 1)}
    })

    localStorage.setItem('currentTasks', currentTasks)
}


document.querySelector('#addText').addEventListener('keydown', function(e) {
    if (e.keyCode === 13) { addFn()}
})

initLocalStorage()

document.querySelector('.addButton').onclick = () => {
    addFn()
}
let index = 0
let currentTasks = []
let completedTasks = []

function addFn() {
    if (document.getElementById('addText').value != '') {
        const taskId = index
        document.querySelector('#currentTasks').insertAdjacentHTML("afterend", `<div class="taskBox" id="${'taskBoxId' + taskId}">
                                                        <div class="task checker"><img src="./img/done.png" alt="" id="${'doneTask' + taskId}" class="doneTaskBtn"></div> 
                                                        <div class="task taskText" id="${'textTask' + taskId}"> ${document.getElementById('addText').value} </div>
                                                        <div class="task edit"><img src = "./img/edit.png",  id="${'editTask' + taskId}" class="editTaskBtn"></div>
                                                        <div class="task"><img src="./img/delete.png" alt="" id="${'deleteTask' + taskId}" class="delTaskBtn"></div>
                                                    </div>`)

        document.getElementById('doneTask' + taskId).addEventListener('click', () => {doneFn(taskId)})
        document.getElementById('editTask' + taskId).addEventListener('click', () => {editFn(taskId)})
        document.getElementById('deleteTask' + taskId).addEventListener('click', () => {deleteFn(taskId)})
        currentTasks.push([taskId, document.getElementById('addText').value])
        console.log('add current task', currentTasks)
        index++
        document.getElementById('addText').value = ''
    }
}

function doneFn(taskId) {
    document.querySelector('#completedTasks').insertAdjacentHTML("afterend", `<div class="completedTaskBox" id="${'taskBoxId' + taskId}"> <div></div> 
                                            <div class="task taskText" id="${'doneTextTask' + taskId}"> 
                                            ${document.getElementById('textTask' + taskId).textContent}</div> <div></div>
                                            <div class="task delete"><img src="./img/delete.png" alt="" id="${'deleteCompletedTask' + taskId}" class="delTaskBtn"></div>
                                        </div>`)
    document.getElementById(`taskBoxId${taskId}`).remove()

    //добавление элемента в массив completed тасков и удаление его из curent тасков
    for (i = 0; i < currentTasks.length; i++){
        if (currentTasks[i][0] == taskId) {
            completedTasks.push(currentTasks[i])
            currentTasks.splice(i, 1)
        }
    }   

    document.getElementById('deleteCompletedTask' + taskId).addEventListener('click', () => {deleteCompFn(taskId)})
}

function deleteCompFn(taskId) {
    document.getElementById('taskBoxId' + taskId).remove()

    //удаление элемента из массива комплетед тасков
    for (i = 0; i < completedTasks.length; i++){

        if (completedTasks[i][0] == taskId) {
            completedTasks.splice(i, 1)
        }
    }
}

function editFn(taskId) {
    let newTaskText = prompt('Edit Task', document.getElementById(`textTask${taskId}`).textContent.trim())
    console.log(newTaskText)
    if (newTaskText != '' && newTaskText != null) {
        document.getElementById('textTask' + taskId).textContent = newTaskText

        //изменение элемента в массиве курент тасков
        for (i = 0; i < currentTasks.length; i++){
            if (currentTasks[i][0] == taskId) {
                currentTasks[i][1] = newTaskText
            }
        }
    }
}

function deleteFn(taskId) {
    document.getElementById('taskBoxId' + taskId).remove()

    //удаление элемента из массива курент тасков
    for (i = 0; i < currentTasks.length; i++){
        if (currentTasks[i][0] == taskId) {
            currentTasks.splice(i, 1)
        }
    }
}

document.querySelector('.addButton').onclick = () => {
    addFn()
}
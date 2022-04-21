const currentTasks = [0]
const completedTasks = []

document.querySelector('.addButton').onclick = () => {

    if (document.getElementById('addText').value != '') {
        
        const index = []
        index.length = 0
        index.push(currentTasks[0])
        index.push(document.getElementById('addText').value)

        document.querySelector('#currentTasks').insertAdjacentHTML("afterend", `<div class="taskBox" id="${'taskBoxId' + index[0]}">
                                                        <div class="task checker"><img src="img/done.png" alt="" id="${'doneTask' + index[0]}" class="doneTaskBtn"></div> 
                                                        <div class="task taskText" id="${'textTask' + index[0]}"> ${document.getElementById('addText').value} </div>
                                                        <div class="task edit"><img src = "/img/edit.png",  id="${'editTask' + index[0]}" class="editTaskBtn"></div>
                                                        <div class="task"><img src="/img/delete.png" alt="" id="${'deleteTask' + index[0]}" class="delTaskBtn"></div>
                                                    </div>`)

        currentTasks.push(index)
        currentTasks[0] += 1
        console.log(currentTasks)
        document.getElementById('addText').value = ''

        // вешаем event listener на done таски
        document.addEventListener('click', function(e) {
            let doneId = 'doneTask' + index[0]
            if (e.target.id == doneId || e.target.closest("#doneId")) {
                //do something
                document.querySelector('#completedTasks').insertAdjacentHTML("afterend", `<div class="completedTaskBox" id="${'taskBoxId' + e.target.id.replace('doneTask', '')}"> <div></div> 
                                                        <div class="task taskText" id="${'doneTextTask' + e.target.id.replace('doneTask', '')}"> 
                                                        ${document.getElementById(`textTask${e.target.id.replace('doneTask', '')}`).textContent}</div><div></div>
                                                        <div class="task delete"><img src="/img/delete.png" alt="" id="${'deleteCompletedTask' + e.target.id.replace('doneTask', '')}" class="delTaskBtn"></div>
                                                    </div>`)
                document.getElementById(`taskBoxId${e.target.id.replace('doneTask', '')}`).remove()

                //добавление элемента в массив completed тасков и удаление его из curent тасков
                for (i = 1; i <= currentTasks.length - 1; i++){
                    if (currentTasks[i][0] == e.target.id.replace('doneTask', '')) {
                        completedTasks.push(currentTasks[i])
                        currentTasks.splice(i, 1)
                        console.log(completedTasks)
                        console.log(currentTasks)
                    }
                }   
                // вешаем event listener на delete completed таски
                document.addEventListener('click', function(c) {
                    let deleteId = 'deleteCompletedTask' + e.target.id.replace('doneTask', '')
                    if (c.target.id == deleteId || c.target.closest("#deleteId")) {
                        //do something
                        let deletingTask = 'taskBoxId' + c.target.id.replace('deleteCompletedTask', '')
                        document.getElementById(deletingTask).remove()

                        //удаление элемента из массива комплетед тасков
                        for (i = 0; i <= completedTasks.length - 1; i++){

                            if (completedTasks[i][0] == c.target.id.replace('deleteCompletedTask', '')) {
                                completedTasks.splice(i, 1)
                                console.log(completedTasks)
                            }
                        }
                    }
                })
            }
        })
        
        
        
        
        
        
        
        
        
        
        // вешаем event listener на edit таски
        document.addEventListener('click', function(e) {
            let editId = 'editTask' + index[0]
            let editedTextId = 'textTask' + index[0]
            if (e.target.id == editId || e.target.closest("#editId")) {
                //do something
                let newTaskText = prompt('Edit Task', document.getElementById(editedTextId).textContent)

                if (newTaskText != '' || newTaskText != null) {
                    document.getElementById(editedTextId).textContent = newTaskText

                    //изменение элемента в массиве курент тасков
                    for (i = 1; i <= currentTasks.length - 1; i++){
                        let editListId = e.target.id

                        if (currentTasks[i][0] == editListId.replace('editTask', '')) {
                            currentTasks[i][1] = newTaskText
                            console.log(currentTasks)
                        }
                    }
                }
           }
        })

        // вешаем event listener на delete таски
        document.addEventListener('click', function(e) {
            let deleteId = 'deleteTask' + index[0]
            let deletingTask = 'taskBoxId' + index[0]
            if (e.target.id == deleteId || e.target.closest("#deleteId")) {
                //do something
                document.getElementById(deletingTask).remove()

                //удаление элемента из массива курент тасков
                for (i = 1; i <= currentTasks.length - 1; i++){

                    if (currentTasks[i][0] == e.target.id.replace('deleteTask', '')) {
                        currentTasks.splice(i, 1)
                        console.log(currentTasks)
                    }
                }
           }
        })

}
}
    
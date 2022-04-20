const currentTasks = [0]

document.querySelector('.addButton').onclick = () => {

    if (document.getElementById('addText').value != '') {
        
        const index = []
        index.length = 0
        index.push(currentTasks[0])
        index.push(document.getElementById('addText').value)

        document.querySelector('#currentTasks').insertAdjacentHTML("afterend", `<div class="taskBox" id="${'taskBoxId' + index[0]}">
                                                        <div class="task checker"><img src="img/done.png" alt=""></div> 
                                                        <div class="task taskText" id="${'textTask' + index[0]}"> ${document.getElementById('addText').value} </div>
                                                        <div class="task edit"><img src = "/img/edit.png", class = "editTask" id="${'editTask' + index[0]}"></div>
                                                        <div class="task delete"><img src="/img/delete.png" alt="" id="${'deleteTask' + index[0]}"></div>
                                                    </div>`)

        currentTasks.push(index)
        currentTasks[0] += 1
        console.log(currentTasks)
        document.getElementById('addText').value = ''

        // вешаем event listener на edit таски
        document.addEventListener('click', function(e) {
            let editId = 'editTask' + index[0]
            let editedTextId = 'textTask' + index[0]
            if (e.target.id == editId || e.target.closest("#editId")){
                //do something
                let newTaskText = prompt('Edit Task')
                document.getElementById(editedTextId).textContent = newTaskText
           }
        })

        // вешаем event listener на delete таски
        document.addEventListener('click', function(e) {
            let deleteId = 'deleteTask' + index[0]
            let deletingTask = 'taskBoxId' + index[0]
            if (e.target.id == deleteId || e.target.closest("#deleteId")){
                //do something
                console.log(e.target.id)
                document.getElementById(deletingTask).remove()

                for (i = 1; i <= currentTasks.length - 1; i++){
                    let deleteListId = e.target.id
                    deleteListId = deleteListId.replace('deleteTask', '')
                    let a = currentTasks[i]

                    if (a[0] == deleteListId) {
                        currentTasks.splice(currentTasks.indexOf(deleteListId, 1))
                        currentTasks[0] -= 1
                        console.log(currentTasks)
                    }
                }

           }
        })

}
}
    
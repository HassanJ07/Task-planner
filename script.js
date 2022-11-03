//selectors
const toDoInput = document.querySelector('.todo-input')
const toDoButton = document.querySelector('.todo-button')
const toDoList = document.querySelector('.todo-list')
const description = document.querySelector('#description')
const dueDate = document.querySelector('#date')
const filterOption = document.querySelector(".filter-to-do")

//fonction
const addToDo = (event) =>{
     event.preventDefault()
     //TODODIV
    const toDiv = document.createElement('div')
    toDiv.classList.add("todo")
    //créer le li
    const newToDo = document.createElement('li')
    newToDo.innerText = "Description :"+description.value +" -Task : " +toDoInput.value +" due to the " + dueDate.value

    newToDo.classList.add("todo-item")
    toDiv.appendChild(newToDo)
    //AJOUTER AU LOCALSTORAGE
    saveLocalToDo(toDoInput.value)
    //BUTTON CHECK
    const completedButton =document.createElement('button')
    completedButton.innerHTML= '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    toDiv.appendChild(completedButton)
    //BUTTON DELETE
    const trashButton =document.createElement('button')
    trashButton.innerHTML= '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    toDiv.appendChild(trashButton)
    //AJOUTER NOTRE TO DO A NOTRE TODO-LIST
    toDoList.appendChild(toDiv)
    toDoInput.value = ""
}


const deleteCheck = (e) =>{
    const item = e.target
    //DELETE TODO
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement
        todo.classList.add("fall")
        removeLocalToDo(todo)
        todo.addEventListener("transitionned",function(){
            
            todo.remove()
        })
        // 
    }
    //CHECK MARK
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement
        todo.classList.toggle("completed")
    }
}
const filterToDo = (e) => {
    const toDos = toDoList.childNodes
    toDos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
            todo.style.display = "flex"
            break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex"
                } else{
                    todo.style.display ="none"
                }
            break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex"
                } else{
                    todo.style.display ="none"
                }
            break;    

        }
    })
}
const saveLocalToDo = (todo) =>{
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}
const getToDo = () =>{
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
 
    todos.forEach(function(todos){
        const toDiv = document.createElement('div')
    toDiv.classList.add("todo")
    //créer le li
    const newToDo = document.createElement('li')
    newToDo.innerText = "Description :"+description.value +" -Task : " +todos +" due to the " + dueDate.value

    newToDo.classList.add("todo-item")
    toDiv.appendChild(newToDo)

    //BUTTON CHECK
    const completedButton =document.createElement('button')
    completedButton.innerHTML= '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn")
    toDiv.appendChild(completedButton)
    //BUTTON DELETE
    const trashButton =document.createElement('button')
    trashButton.innerHTML= '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    toDiv.appendChild(trashButton)
    //AJOUTER NOTRE TO DO A NOTRE TODO-LIST
    toDoList.appendChild(toDiv)
    })
   }

   const removeLocalToDo = (todo) =>{
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const toDoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(toDoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))

   } 
//listeners
toDoButton.addEventListener('click',addToDo)
toDoList.addEventListener('click',deleteCheck)
filterOption.addEventListener('input',filterToDo)
document.addEventListener("DOMContentLoaded",getToDo())
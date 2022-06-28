// const LOCAL_STORAGE_LIST_KEY = 'task.lists'
// const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
// let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
// let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

// addNewList.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const listName = addTaskInput.value;

//     if (listName == null || listName === ''){
//         alert("please add a task list!");
//         return;
//     }

//         const list = createList(listName);
//         addTaskInput.value = '';
//         lists.push(list);
//         saveAndRender()
//     }
// );

// function createList(name) {
//     return {id: Date.now().toString(), name: name, tasks: [] };
// };

// function saveAndRender() {
//     save();
//     render();
// }

// function save() {
//     localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
// }

// function render(){
//     clearElement(listsContainer)
//     lists.forEach(list => {
//         const listElement = document.createElement('li');
//         listElement.dataset.listId = list.id;
//         listElement.classList.add("list-name");
//         listElement.innerText = list.name;
//         if(list.id === selectedListId) listElement.classList.add()
//         listsContainer.appendChild(listElement);
//     })
// };

// // function clearElement(element){
// //     while (element.firstChild){
// //         element.removeChild(element.firstChild)
// //     }
// // }

// render()




function addTaskList() {
    const listSection = document.querySelector("#taskListSection");
    const NewListForm = document.querySelector(".add-new-list");
    const addTaskInput = document.querySelector(".add-task-input");
    
    const inputValue = addTaskInput.value;

;

    if(inputValue == ""){
        alert("Please fill out the task");
        return; 
    }
        // creates list items of user input
        const taskListContainer = document.createElement("div");
        taskListContainer.classList.add("task-list-container");
        
        const taskListContent = document.createElement("ul");
        taskListContent.classList.add("task-list-content");

        taskListContainer.appendChild(taskListContent);

        const listName = document.createElement("input");
        listName.classList.add("list-name");
        listName.type = "text";
        listName.value = inputValue;
        listName.setAttribute("readonly", "readonly");

        taskListContent.appendChild(listName);

        const actionsContainer = document.createElement("div");
        actionsContainer.classList.add("remove-task-list");

        const editButton = document.createElement("button");
        editButton.className = "bi bi-pencil-square";

        const deleteButton = document.createElement("button");
        deleteButton.className = "bi bi-x-lg";
 
        actionsContainer.appendChild(editButton);
        actionsContainer.appendChild(deleteButton);

        taskListContainer.appendChild(actionsContainer);
        
        listSection.appendChild(taskListContainer);

    // clears input field after button is clicked
    addTaskInput.value = "";

        editButton.addEventListener('click', () =>{
            if (editButton.className == "bi bi-pencil-square"){
            listName.removeAttribute("readonly");
            listName.focus();
            editButton.className = "bi bi-save";
            }else{
                listName.setAttribute("readonly", "readonly");
                editButton.className = "bi bi-pencil-square";
            }
    });
        deleteButton.addEventListener('click', () =>{
            listSection.removeChild(taskListContainer);
        });


    };

function addTask() {
    const myTodoInput = document.querySelector(".todo-input");
    const ul = document.getElementById("task-box");

    const taskInputValue = myTodoInput.value;
    
        if(taskInputValue == ""){
            alert("Please fill out input");
            return;
        }

        // creates list items of user input
        const newTask = document.createElement("div");
        newTask.classList.add("task");

        const newLabel = document.createElement("label");
        newLabel.setAttribute("for", 'task-checkbox');
        newLabel.innerHTML = myTodoInput.value

        const newTaskInput = document.createElement("input");
        newTaskInput.type = "checkbox"
        newTaskInput.setAttribute("id", 'task-checkbox');
     

        newTask.appendChild(newTaskInput);
        newTask.appendChild(newLabel);
        ul.appendChild(newTask);

    // clears input field after button is clicked
    document.querySelector(".todo-input").value = "";
};

function tasksRemaining() {
    let tasksRemaining = document.getElementById("tasks-remaining");

}
const listsContainer = document.querySelector(".task-lists");
const addNewList = document.querySelector(".add-new-list");
const addTaskInput = document.querySelector(".add-task-input");

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

addNewList.addEventListener('submit', (e) => {
    e.preventDefault();
    const listName = addTaskInput.value;
    if (listName == null || listName === ''){
        alert("please add a task list!");
        return;
    }else{
        const list = createList(listName);
        addTaskInput.value = '';
        lists.push(list);
        saveAndRender()
    }
});

function createList(name) {
    return {id: Date.now().toString(), name: name, tasks: [] };
};

function saveAndRender() {
    save();
    render();
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}

function render(){
    clearElement(listsContainer)
    lists.forEach(list => {
        const listElement = document.createElement('li');
        listElement.dataset.listId = list.id;
        listElement.classList.add("list-name");
        listElement.innerText = list.name;
        if(list.id === selectedListId) listElement.classList.add()
        listsContainer.appendChild(listElement);
    })
};

function clearElement(element){
    while (element.firstChild){
        element.removeChild(element.firstChild)
    }
}

render()




// function addTaskList() {
//     let addTaskInput = document.querySelector(".add-task-input").value;
//     ul = document.querySelector(".task-list")

//     if (addTaskInput == "") {
//         alert("Please fill out the task")
//     } else {
//         // creates list items of user input
//         li = document.createElement("li");
//         txtNode = document.createTextNode(addTaskInput);

//         li.appendChild(txtNode);
//         ul.appendChild(li);
//     }
//     // clears input field after button is clicked
//     document.querySelector(".add-task-input").value = "";
// }

function addTask() {
    let myTasksInput = document.querySelector(".todo-input").value;
    ul = document.getElementById('task-box')
    
        if(myTasksInput == ""){
            alert("Please fill out input")
        }else{
        // creates list items of user input
        li = document.createElement("li");
        txtNode = document.createTextNode(myTasksInput);

        li.appendChild(txtNode);
        ul.appendChild(li);
    // clears input field after button is clicked
    document.querySelector(".todo-input").value = '';
}};

function tasksRemaining() {
    let tasksRemaining = document.getElementById("tasks-remaining");

}
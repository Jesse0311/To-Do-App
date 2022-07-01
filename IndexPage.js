const NewListForm = document.querySelector("#new-list-form");
const addListInput = document.querySelector(".add-list-input");
const listSection = document.querySelector("#taskListSection");
const newTaskForm = document.querySelector("#new-task-form");
const myTodoInput = document.querySelector(".todo-input");

listData = JSON.parse(localStorage.getItem('listData')) || [];
selectedListId = localStorage.getItem('selectedListId') || "";

listSection.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        selectedListId = e.target.dataset.listId;
        localStorage.setItem('listData', JSON.stringify(listData));
        localStorage.setItem('selectedListId', selectedListId);
        renderTasks();
    }
})

NewListForm.addEventListener('submit', e => {
    e.preventDefault();

    // Alert message if input field is blank
    if (addListInput.value == "") {
        alert("Please Add List Category");
        return;
    }
    renderTasks();

    const newListData = {
        id: Date.now().toString(),
        name: e.target.elements.listContent.value,
        tasks: []
    }

    localStorage.setItem('listData', JSON.stringify(listData));
    renderTasks();

    listData.push(newListData);

    localStorage.setItem('listData', JSON.stringify(listData));

    // clears input field after submit
    e.target.reset();
    renderTasks();
});
renderTasks();

function renderTasks() {
    // These are the variables needed to switch between lists
    const todoWrapper = document.querySelector(".todo-wrapper");
    const todoTitle = document.querySelector(".todo-title");
    const taskSection = document.querySelector(".tasks");

    addTaskList();

    // If there are no List Items selected, this if statement will hide the
    // Tasks Section until a List is created and/or selected
    const selectedList = listData.find(newListData => newListData.id === selectedListId);
    if (selectedListId == "") {
        todoWrapper.style.display = 'none';
    } else {
        todoWrapper.style.display = '';
        // Replaces Task title with the name of the selected List Item
        todoTitle.innerText = selectedList.name;
        taskCount(selectedList);
        addTask(selectedList);
    }
}

// This function counts how many tasks are not checked
function taskCount(selectedList) {
    const tasksRemaining = document.querySelector(".tasks-remaining");

    // This filter function checks if the boolean for completed tasks is true or false
    const completedTasks = selectedList.tasks.filter((newTaskData) => newTaskData.done === true);

    // Mathematical equation subtracting tasks length by completed tasks
    tasksRemaining.textContent = selectedList.tasks.length - completedTasks.length;
    if (selectedList.tasks.length - completedTasks.length !== 1) {
        tasksRemaining.textContent = selectedList.tasks.length - completedTasks.length + " Tasks" + " Remaining";
    } else {
        tasksRemaining.textContent = selectedList.tasks.length - completedTasks.length + " Task" + " Remaining";
    }
}
renderTasks();


// This function adds Lists to the My List Section
function addTaskList() {
    const listSection = document.querySelector("#taskListSection");
    const addListInput = document.querySelector(".add-list-input");

    listSection.innerHTML = '';

    // Loops through every list item in array
    listData.forEach(newListData => {

        // creates list items of user input
        const taskListContainer = document.createElement("div");
        taskListContainer.classList.add("task-list-container");

        const taskListContent = document.createElement("div");
        taskListContent.classList.add("task-list-content");

        const listName = document.createElement("input");
        listName.dataset.listId = newListData.id;
        listName.classList.add("list-name");
        listName.type = "text";
        // ListName input value is the [name] array item in the newListData array
        listName.value = newListData.name;
        listName.setAttribute("readonly", "readonly");


        // creates the div container for our edit and delete actions
        const actionsContainer = document.createElement("div");
        actionsContainer.classList.add("remove-task-list");

        // creates the edit button
        const editButton = document.createElement("button");
        editButton.className = "bi bi-pencil-square";

        // creates the delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = "bi bi-x-lg";

        // creates button to delete selected list
        const deleteSelected = document.createElement("button");
        deleteSelected.classList = "bi bi-x-lg";

        actionsContainer.appendChild(editButton);

        // This if statement replaces the delete button for unselected
        // lists with a delete button for a selected list once they have
        // been clicked on by the user
        if (selectedListId == newListData.id) {
            listName.classList.add("active-list");
            actionsContainer.appendChild(deleteSelected);
        } else {
            actionsContainer.appendChild(deleteButton)
        };
        taskListContainer.appendChild(taskListContent);
        taskListContent.appendChild(listName);
        taskListContainer.appendChild(actionsContainer);

        // appends the task lists created inside of the My Lists section
        listSection.appendChild(taskListContainer);



        // this code allows us to edit our List Items
        editButton.addEventListener('click', e => {
            listName.removeAttribute("readonly", "readonly");
            listName.focus();
            listName.style.cursor = "text";
            editButton.className = "bi bi-save";
            // once edit is clicked, changes are saved when user clicks
            // outside of the List or on the save button created
            listName.addEventListener('blur', e => {
                newListData.name = e.target.value;
                localStorage.setItem('listData', JSON.stringify(listData));
                renderTasks();
                listName.setAttribute("readonly", "readonly");
                editButton.className = "bi bi-pencil-square";
            });
        });
        // This code allows us to delete List Items
        deleteButton.addEventListener('click', () => {
            listData = listData.filter(thisList => thisList !== newListData);
            localStorage.setItem('listData', JSON.stringify(listData));
            renderTasks();
        });
        // This code allows us to delete the selected List Item. This delete
        // button will hide the Task Section when clicked
        deleteSelected.addEventListener('click', () => {
            listData = listData.filter(thisList => thisList !== newListData);
            listData = listData.filter(newListData => newListData.id !== selectedListId);
            selectedListId = "";
            localStorage.setItem('listData', JSON.stringify(listData));
            localStorage.setItem('selectedListId', selectedListId);
            renderTasks();
        });
    });
};

newTaskForm.addEventListener('submit', e => {
    e.preventDefault();

    // Alert message if input field is blank
    if (myTodoInput.value == "") {
        alert("Please Fill Out Input");
        return;
    }

    const newTaskData = {
        id: Date.now().toString(),
        name: e.target.elements.taskContent.value,
        done: false,
    };

    const selectedList = listData.find(newListData => newListData.id === selectedListId);
    selectedList.tasks.push(newTaskData);

    localStorage.setItem('listData', JSON.stringify(listData));
    localStorage.setItem('selectedListId', selectedListId);
    renderTasks();

    // clears input field after submit
    e.target.reset();
});
renderTasks();

// function to add a Task Item
function addTask(selectedList) {
    const taskSection = document.querySelector(".tasks");
    const clearCompleted = document.querySelector('.clear-completed');

    taskSection.innerHTML = '';

    // Loops through every task item in array
    selectedList.tasks.forEach(newTaskData => {


        // creates checkbox items of user input
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        const taskName = document.createElement("input");
        taskName.classList.add("task-name");
        taskName.type = "checkbox";
        taskName.checked = newTaskData.done;
        taskName.setAttribute("id", newTaskData.id)

        const newLabel = document.createElement("label");
        newLabel.setAttribute("for", newTaskData.id);
        newLabel.innerHTML = newTaskData.name;
        newLabel.setAttribute("readonly", "readonly");

        taskItem.appendChild(taskName);
        taskItem.appendChild(newLabel);

        taskSection.appendChild(taskItem);

        if (newTaskData.done) {
            taskItem.classList.add("done");
        }

        taskCount(selectedList);

        taskName.addEventListener('click', e => {
            newTaskData.done = e.target.checked;
            localStorage.setItem('listData', JSON.stringify(listData));
            localStorage.setItem('selectedListId', selectedListId);
            renderTasks();

            if (newTaskData.done) {
                taskItem.classList.add("done");
            } else {
                taskItem.classList.remove("done");
            }
        });

        clearCompleted.addEventListener('click', () => {
            selectedList.tasks = selectedList.tasks.filter((newTaskData) => newTaskData.done === false);
            localStorage.setItem('listData', JSON.stringify(listData));
            renderTasks();
        });
    });
};

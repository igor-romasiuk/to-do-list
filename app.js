// Selectors
const addButton = document.querySelector('.add-task-btn');
const taskInput = document.querySelector('.input-task');
const taskList = document.querySelector('.task-list');
const todayDateElement = document.querySelector('.today-date');
const newTask = document.querySelector('.new-task')
const filterOption = document.querySelector('.filter-todo')
const todoList = document.querySelector('.todo-list')

// Event listeners
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
todayDateElement.addEventListener('DOMContentLoaded', currentDate);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        //Create todo div
        const listItem = document.createElement('div');
        listItem.classList.add('new-task')
        //Create list
        const newTodo = document.createElement('li');
        newTodo.innerText = taskInput.value;
        newTodo.classList.add('todo-item')
        listItem.appendChild(newTodo);
        taskInput.value = "";
        //Create Completed Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = `<img src="./icons/complete-btn.png" alt="Complete">`;
        completedButton.classList.add('complete-btn')
        listItem.appendChild(completedButton);
        //Create trash button
        const deleteButton = document.createElement('buuton');
        deleteButton.innerHTML = `<img src="./icons/delete-btn.png" alt="Delete">`;
        deleteButton.classList.add('delete-btn');
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
        bindDeleteButton(listItem);
        bindCompleteButton(listItem);
    }
}

function bindDeleteButton(listItem) {
    const deleteButton = document.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
        listItem.remove();
    });
}

function bindCompleteButton(listItem) {
    const completeButton = listItem.querySelector('.complete-btn');
    completeButton.addEventListener('click', () => {
        listItem.classList.toggle('completed');
    });
}

function currentDate() {
    const todayDate = new Date();

    const daysOfWeek = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const formattedDate = daysOfWeek[todayDate.getDay()] + ', ' +
        months[todayDate.getMonth()] + ' ' +
        todayDate.getDate() + ' '

    todayDateElement.innerHTML = formattedDate;
}

function filterTodo() {
    const todos = newTask.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
          case "all":
            todo.style.display = "flex";
            break;
          case "completed":
            if (todo.classList.contains("completed")) {
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
            }
            break;
          case "uncompleted":
            if (!todo.classList.contains("completed")) {
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
            }
        }
    });
}

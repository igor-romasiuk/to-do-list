// Selectors
const addButton = document.querySelector('.add-task-btn');
const taskInput = document.querySelector('.input-task');
const taskList = document.querySelector('.task-list');
const todayDateElement = document.querySelector('.today-date');
const newTask = document.querySelector('.new-task');
const filterOption = document.querySelector('.filter-todo');
const todoList = document.querySelector('.todo-list');
const toggleSidebar = document.querySelector('.toggle-sidebar');
const sidebar = document.querySelector('.sidebar');

// Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
todayDateElement.addEventListener('DOMContentLoaded', currentDate);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener('click', filterTodo);
toggleSidebar.addEventListener('click', closeSidebar);

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
        saveLocalTodos(taskInput.value);
        newTodo.classList.add('todo-item')
        listItem.appendChild(newTodo);
        taskInput.value = "";
        //Create Completed Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = `<img src="./icons/complete-btn.png" alt="Complete">`;
        completedButton.classList.add('complete-btn')
        listItem.appendChild(completedButton);
        //Create trash button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<img src="./icons/delete-btn.png" alt="Delete">`;
        deleteButton.classList.add('delete-btn');
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    }
}

function deleteTodo(e) {
    const item = e.target;
    
    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);

        todo.addEventListener("transitionend", event => {
            todo.remove();
          });
    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
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

function filterTodo(e) {
    const todos = todoList.childNodes;

    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex"
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

function saveLocalTodos(todo, completed = false) {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push({text: todo, completed: completed});
    localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todoObj) {
        //Create todo div
        const listItem = document.createElement('div');
        listItem.classList.add('new-task')
        //Create list
        const newTodo = document.createElement('li');
        newTodo.innerText = todoObj.text;
        newTodo.classList.add('todo-item')
        if (todoObj.completed) {
            listItem.classList.add('completed');
        }
        listItem.appendChild(newTodo);
        taskInput.value = "";
        //Create Completed Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = `<img src="./icons/complete-btn.png" alt="Complete">`;
        completedButton.classList.add('complete-btn')
        listItem.appendChild(completedButton);
        //Create trash button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<img src="./icons/delete-btn.png" alt="Delete">`;
        deleteButton.classList.add('delete-btn');
        listItem.appendChild(completedButton);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    });
}

function closeSidebar() {
    sidebar.classList.toggle('close');
}

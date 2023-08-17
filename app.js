// Selectors
const addButton = document.querySelector('.add-task-btn');
const taskInput = document.querySelector('.input-task');
const taskList = document.querySelector('.task-list');
const todayDateElement = document.querySelector('.today-date');
const newTask = document.querySelector('.new-task')
const filterOption = document.querySelector('.filter-todo')

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
        const listItem = document.createElement('div');
        listItem.classList.add('new-task')
        listItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div class="container-btn">
                <button class="complete-btn"><img src="./icons/complete-btn.png" alt="Complete"></button>
                <button class="delete-btn"><img src="./icons/delete-btn.png" alt="Delete"></button>
            </div>
        `;
        taskList.appendChild(listItem);
        taskInput.value = '';
        bindDeleteButton(listItem);
        bindCompleteButton(listItem);
    }
}

function bindDeleteButton(listItem) {
    const deleteButton = document.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
        listItem.remove()
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

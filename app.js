// Selectors
const addButton = document.querySelector('.add-task-btn');
const taskInput = document.querySelector('.input-task');
const taskList = document.querySelector('.task-list');
const todayDateElement = document.querySelector('.today-date');
const taskDescription = document.querySelector('.new-task');
const taskCompleted = document.querySelector('.checkbox');

// Event listeners
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
todayDateElement.addEventListener('DOMContentLoaded', currentDate());

// Functions
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const listItem = document.createElement('div');
        listItem.classList.add('new-task')
        listItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div class="container-btn">
                <label class="custom-checkbox">
                    <input type="checkbox" class="complete-btn">
                    <span class="checkmark"></span>
                </label>
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
        console.log(todo);
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

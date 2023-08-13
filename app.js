// Selectors
const addButton = document.querySelector('.add-task-btn');
const taskInput = document.querySelector('.input-task');
const taskList = document.querySelector('.task-list');

// Event listeners
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
})

// Functions
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const listItem = document.createElement('div');
        listItem.classList.add('new-task')
        listItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <input type="checkbox" class="new-input-task">
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(listItem);
        taskInput.value = '';
        bindDeleteButton(listItem);
    }
}

function bindDeleteButton(listItem) {
    const deleteButton = document.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
        listItem.remove()
    });
}
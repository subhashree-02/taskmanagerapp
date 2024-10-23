const taskInput = document.getElementById('new-task');
const taskDescInput = document.getElementById('task-desc');
const taskDateInput = document.getElementById('task-date');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
document.addEventListener('DOMContentLoaded', loadTasks);
addTaskBtn.addEventListener('click', addTask);
function addTask() {
    const taskText = taskInput.value.trim();
    const taskDesc = taskDescInput.value.trim();
    const taskDate = taskDateInput.value;
    if (taskText === '') {
        alert('Please enter a task title');
        return;
    }
    const taskItem = createTaskElement(taskText, taskDesc, taskDate);
    taskList.appendChild(taskItem);
    saveTask({ title: taskText, description: taskDesc, date: taskDate });
    taskInput.value = '';
    taskDescInput.value = '';
    taskDateInput.value = '';
}
function createTaskElement(taskText, taskDesc, taskDate) {
    const li = document.createElement('li');
    li.innerHTML = `
        <strong>${taskText}</strong>
        <p class="task-details">${taskDesc}</p>
        <span class="task-date">${taskDate ? `Due: ${taskDate}` : ''}</span>
        <button class="delete-btn">Delete</button>
    `;
    li.addEventListener('click', function () {
        li.classList.toggle('completed');
    });
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        li.remove();
        removeTaskFromStorage(taskText);
    });
    return li;
}
function saveTask(task) {
    let tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
    let tasks = getTasksFromStorage();
    tasks.forEach(task => {
        const taskItem = createTaskElement(task.title, task.description, task.date);
        taskList.appendChild(taskItem);
    });
}
function getTasksFromStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}
function removeTaskFromStorage(taskText) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task.title !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

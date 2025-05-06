document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);

  saveTaskToLocalStorage(taskText);
  taskInput.value = '';
}

function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.textContent = taskText;

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    removeTaskFromLocalStorage(taskText);
  });

  li.appendChild(deleteBtn);
  return li;
}

function saveTaskToLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(taskText => {
    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);
  });
}

function removeTaskFromLocalStorage(taskToRemove) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task !== taskToRemove);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

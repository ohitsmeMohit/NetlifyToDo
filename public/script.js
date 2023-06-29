const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = taskInput.value.trim();
    if (text !== '') {
        addTask(text);
        taskInput.value = '';
    }
});

function addTask(text) {
    fetch('/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    })
        .then(() => getTasks())
        .catch((error) => console.error(error));
}

function toggleCompleted(index) {
    fetch(`/task/${index}`, {
        method: 'PUT',
    })
        .then(() => getTasks())
        .catch((error) => console.error(error));
}

function deleteTask(index) {
    fetch(`/task/${index}`, {
        method: 'DELETE',
    })
        .then(() => getTasks())
        .catch((error) => console.error(error));
}

function getTasks() {
    fetch('/tasks')
        .then((response) => response.json())
        .then((data) => {
            taskList.innerHTML = '';
            data.forEach((task, index) => {
                const li = document.createElement('li');
                li.textContent = task.text;
                if (task.completed) {
                    li.classList.add('completed');
                }
                li.addEventListener('click', () => toggleCompleted(index));
                li.addEventListener('dblclick', () => deleteTask(index));
                taskList.appendChild(li);
            });
        })
        .catch((error) => console.error(error));
}

getTasks();

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const taskList = document.getElementById('task-list');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const category = document.getElementById('category').value;
        const task = document.getElementById('task').value;
        const email = document.getElementById('email').value;
        const currentDate = new Date().toISOString();

        const taskItem = {
            category: category,
            task: task,
            email: email,
            date: currentDate
        };

        // Save task to local storage
        saveTask(taskItem);

        // Add task to the list
        addTaskToList(taskItem);

        // Clear form inputs
        form.reset();
    });

    function saveTask(task) {
        let tasks = [];
        if (localStorage.getItem('tasks')) {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTaskToList(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Category:</strong> ${task.category}<br>
            <strong>Task:</strong> ${task.task}<br>
            <strong>Email:</strong> ${task.email}<br>
            <strong>Date:</strong> ${task.date}<br>
        `;
        taskList.appendChild(li);
    }

    // Load tasks from local storage on page load
    function loadTasks() {
        if (localStorage.getItem('tasks')) {
            const tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.forEach(task => addTaskToList(task));
        }
    }
    
    loadTasks();
})
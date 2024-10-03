
function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";  

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
    } else {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
    }
    updateThemeIcon(savedTheme);  
}


function updateThemeIcon(currentTheme) {
    const themeIcon = document.getElementById('themeimg');

    if (currentTheme === "dark") {
        themeIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun-fill" viewBox="0 0 16 16">
                <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/>
                <path d="M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1 0-1H2.5A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707L12.243 4.465a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm-9.9 9.9a.5.5 0 0 1 0 .707L2.343 12.657a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.9 2.12a.5.5 0 0 1-.707 0L12.243 12.95a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.465 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 0 1 .707-.707l1.415 1.414a.5.5 0 0 1 0 .707z"/>
            </svg>
        `;
    } else {
        themeIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16">
                <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278z"/>
        `;
    }
}


function toggleThemeIcon() {
    const isDarkTheme = document.body.classList.contains('dark-theme');

    document.body.classList.toggle("dark-theme", !isDarkTheme);
    document.body.classList.toggle("light-theme", isDarkTheme);

    const newTheme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);

    updateThemeIcon(newTheme);  
}

document.addEventListener('DOMContentLoaded', function () {
    
    applySavedTheme();


    document.getElementById('theme-toggle').addEventListener('click', toggleThemeIcon);
});

document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");

    if (taskForm) {
        taskForm.addEventListener("submit", function (event) {
            event.preventDefault();  

            const listName = document.querySelector('input[placeholder="Enter the name of list"]').value;
            const taskName = document.querySelector('input[placeholder="Enter the name of the task"]').value;
            const dueDate = document.querySelector('input[type="date"]').value;
            const priorityLevel = document.querySelector('input[placeholder="Enter the priority level"]').value;
            const purpose = document.querySelector('textarea[placeholder="Enter Purpose"]').value;

            const newTask = {
                listName: listName,
                taskName: taskName,
                dueDate: dueDate,
                priorityLevel: priorityLevel,
                purpose: purpose
            };

            let taskList = JSON.parse(localStorage.getItem("taskList")) || [];

            taskList.push(newTask);

            localStorage.setItem("taskList", JSON.stringify(taskList));

            taskForm.reset();

            alert("New task list created successfully!");
            window.location.href = "My List.html";  
        });
    }
});

function displayTasks() {
    const taskListElement = document.getElementById("taskList");

    if (!taskListElement) {
        console.log("Task List element not found on this page.");
        return;
    }

    const tasks = JSON.parse(localStorage.getItem("taskList")) || [];
    
    taskListElement.innerHTML = "";

    if (tasks.length === 0) {
        taskListElement.innerHTML = "<li>No tasks.</li>";
        return;
    }

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div>
                <input type="checkbox" data-index="${index}" onchange="handleTaskCompletion(event)">
                <strong>List Name:</strong> ${task.listName || "No list name"} <br />
                <strong>Task:</strong> ${task.taskName || "No task name"} <br />
                <strong>Due Date:</strong> ${task.dueDate || "No due date"} <br />
                <strong>Priority:</strong> ${task.priorityLevel || "No priority"} <br />
                <strong>Purpose:</strong> ${task.purpose || "No purpose"} <br />
            </div>
        `;
        taskListElement.appendChild(listItem);
    });
}

function handleTaskCompletion(e) {
    const taskIndex = e.target.getAttribute("data-index");
    let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    const completedTask = taskList.splice(taskIndex, 1)[0];
    completedTasks.push(completedTask);

    localStorage.setItem("taskList", JSON.stringify(taskList));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

    displayTasks();
    displayCompletedTasks();
}

function displayCompletedTasks() {
    const completedTasksElement = document.getElementById("completedTaskList");

    if (!completedTasksElement) {
        console.log("Completed Task List element not found on this page.");
        return;
    }

    const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    console.log("Displaying Completed Tasks:", completedTasks);

    if (completedTasks.length === 0) {
        completedTasksElement.innerHTML = "<li>No completed tasks.</li>";
        return;
    }

    completedTasksElement.innerHTML = "";

    completedTasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div>
                <strong>List Name:</strong> ${task.listName || "No list name"} <br />
                <strong>Task:</strong> ${task.taskName || "No task name"} <br />
                <strong>Due Date:</strong> ${task.dueDate || "No due date"} <br />
                <strong>Priority:</strong> ${task.priorityLevel || "No priority"} <br />
                <strong>Purpose:</strong> ${task.purpose || "No purpose"} <br />
                <button onclick="deleteCompletedTask(${index})">Delete</button>
            </div>
        `;
        completedTasksElement.appendChild(listItem);
    });
}

function deleteCompletedTask(taskIndex) {
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    completedTasks.splice(taskIndex, 1);

    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

    displayCompletedTasks();
}


document.addEventListener("DOMContentLoaded", function () {
    displayTasks();
    displayCompletedTasks();
});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div class="actions">

                <button onclick="toggleTask(${index})">
                    ${task.completed ? "↩ Undo" : "✔ Complete"}
                </button>

                <button onclick="editTask(${index})">
                    ✏ Edit
                </button>

                <button onclick="deleteTask(${index})">
                    ❌ Delete
                </button>

            </div>
        `;

        list.appendChild(li);

    });

    document.getElementById("counter").innerHTML =
        `Total Tasks : ${tasks.length}`;

    saveTasks();
}

function addTask() {

    const input = document.getElementById("taskInput");

    if (input.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: input.value,
        completed: false
    });

    input.value = "";

    displayTasks();
}

function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    displayTasks();
}

function editTask(index) {

    const updatedTask = prompt("Edit your task", tasks[index].text);

    if (updatedTask !== null && updatedTask.trim() !== "") {
        tasks[index].text = updatedTask;
        displayTasks();
    }
}

function deleteTask(index) {

    if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        displayTasks();
    }
}

displayTasks();
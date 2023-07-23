function addInputField(containerId) {
    const container = document.getElementById(containerId);

    const newInput =
        containerId === "subtasks"
            ? document.createElement("textarea")
            : document.createElement("input");
    newInput.type = "text";
    const className = containerId === "subtasks" ? "subtask" : "tag";
    newInput.classList.add(className);
    newInput.name = containerId + "[]";

    container.appendChild(newInput);
}

var tasks = [];
var count = 0;
function submitTask(event) {
    event.preventDefault();
    const form = document.getElementById("taskForm");

    const formData = new FormData(form);
    const taskObject = {};
    for (let [key, value] of formData.entries()) {
        if (taskObject[key]) {
            if (!Array.isArray(taskObject[key])) {
                taskObject[key] = [taskObject[key]];
            }
            taskObject[key].push(value);
        } else {
            taskObject[key] = value;
        }
    }

    taskObject.id = count;
    count++;

    const newTask = addTask(taskObject);
    const tasksContainer = document.querySelector(".tasks-container");
    tasksContainer.appendChild(newTask);

    tasks.push(taskObject);
    console.log(tasks);
    form.reset();
    window.history.back();
}

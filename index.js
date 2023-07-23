import addTask from "./functions/addTask.js";

var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const options = document.querySelectorAll(".option");
const button = document.querySelector(".sort-by-button");
const sortbyIcon = document.querySelector(".sort-by-icon");
const crossIcon = document.querySelector(".cross-icon");

var sortby = "";

options.forEach((option) => {
    option.addEventListener("click", () => {
        var active = document.querySelector(".active");
        if (!option.classList.contains("active")) {
            button.textContent = option.textContent;
            sortby = option.textContent;

            sortTasks(sortby, tasks);

            option.classList.add("active");
            if (active) active.classList.remove("active");

            sortbyIcon.style.display = "none";
            crossIcon.style.display = "block";

            console.log(sortby);
        }
        menu.classList.toggle("show-menu");
    });
});

crossIcon.addEventListener("click", () => {
    button.textContent = "Sort by";
    sortby = "";

    sortTasks(sortby, tasks);

    sortbyIcon.style.display = "block";
    crossIcon.style.display = "none";
    console.log(sortby);
});

const menu = document.querySelector(".drop-down-menu");
button.addEventListener("click", () => {
    menu.classList.toggle("show-menu");

    menu.addEventListener("blur", () => {
        menu.classList.toggle("show-menu");
    });
});

function sortById(tasks) {
    return tasks.sort((task1, task2) => task1.id - task2.id);
}

function sortByDueDate(tasks) {
    return tasks.sort(
        (task1, task2) => new Date(task1.dueDate) - new Date(task2.dueDate)
    );
}

function sortByPriority(tasks) {
    const priorityOrder = {
        low: 1,
        medium: 2,
        high: 3,
    };

    return tasks.sort(
        (task1, task2) =>
            priorityOrder[task1.priority] - priorityOrder[task2.priority]
    );
}

function sortTasks(sortby, tasks) {
    if (sortby === "Due date") {
        sortByDueDate(tasks);
    } else if (sortby === "Priority") {
        sortByPriority(tasks);
    } else {
        sortById(tasks);
    }
    renderTasks(tasks);
}

const taskContainer = document.getElementById("taskContainer");

function renderTasks(tasks) {
    taskContainer.innerHTML = "";

    tasks.forEach((task) => {
        const taskElement = addTask(task);
        taskContainer.appendChild(taskElement);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const intialTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    setInterval(() => {
        const updatedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        if (JSON.stringify(updatedTasks) !== JSON.stringify(intialTasks)) {
            renderTasks(updatedTasks);
            intialTasks = updatedTasks;
        }
    }, 2000);
});

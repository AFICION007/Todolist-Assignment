var tasks = [];

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

            sortTasks(sortby);

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

    sortTasks(sortby);

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

function sortTasks(sortby) {
    if (sortby === "Due date") {
        sortByDueDate(tasks);
    } else if (sortby === "Priority") {
        sortByPriority(tasks);
    } else {
        sortById(tasks);
    }
}

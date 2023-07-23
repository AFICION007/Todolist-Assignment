const addTask = ({
    id,
    task,
    is_completed,
    category,
    due_date,
    priority,
    subtasks,
    tags,
}) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const taskDueDate = document.createElement("span");
    taskDueDate.classList.add("task-due-date");
    taskDueDate.textContent = `Due by: ${due_date}`;
    taskDiv.appendChild(taskDueDate);

    const taskContent = document.createElement("textarea");
    taskContent.classList.add("task-content");
    taskContent.disabled = true;
    taskContent.textContent = task;
    taskDiv.appendChild(taskContent);

    const catContainer = document.createElement("div");
    catContainer.classList.add("cat-container");
    taskDiv.appendChild(catContainer);

    const taskPriority = document.createElement("span");
    taskPriority.classList.add("task-priority");
    taskPriority.textContent = `${priority} Priority`;
    catContainer.appendChild(taskPriority);

    const taskCategory = document.createElement("span");
    taskCategory.classList.add("task-category");
    taskCategory.textContent = `Category: ${category}`;
    catContainer.appendChild(taskCategory);

    const taskSubtasks = document.createElement("div");
    taskSubtasks.classList.add("task-subtasks");
    taskDiv.appendChild(taskSubtasks);

    const subtasksHeading = document.createElement("span");
    subtasksHeading.classList.add("subtasks-heading");
    subtasksHeading.textContent = "Subtasks:";
    taskSubtasks.appendChild(subtasksHeading);

    const subtasksList = document.createElement("ul");
    subtasksList.classList.add("subtasks-list");
    taskSubtasks.appendChild(subtasksList);

    if (Array.isArray(subtasks)) {
        subtasks.forEach((subtask) => {
            const subtaskInput = document.createElement("input");
            subtaskInput.classList.add("subtask");
            subtaskInput.placeholder = subtask;
            subtaskInput.disabled = true;
            subtasksList.appendChild(subtaskInput);
        });
    } else {
        const subtaskInput = document.createElement("input");
        subtaskInput.classList.add("subtask");
        subtaskInput.placeholder = subtasks;
        subtaskInput.disabled = true;
        subtasksList.appendChild(subtaskInput);
    }

    const taskTags = document.createElement("div");
    taskTags.classList.add("task-tags");
    taskDiv.appendChild(taskTags);

    const tagsHeading = document.createElement("span");
    tagsHeading.classList.add("tags-heading");
    tagsHeading.textContent = "Tags:";
    taskTags.appendChild(tagsHeading);

    const tagsList = document.createElement("ul");
    tagsList.classList.add("tags-list");
    taskTags.appendChild(tagsList);

    if (Array.isArray(tags)) {
        tags.forEach((tag) => {
            const tagListItem = document.createElement("li");
            tagListItem.classList.add("tag");
            tagListItem.textContent = tag;
            tagsList.appendChild(tagListItem);
        });
    } else {
        const tagListItem = document.createElement("li");
        tagListItem.classList.add("tag");
        tagListItem.textContent = tags;
        tagsList.appendChild(tagListItem);
    }

    return taskDiv;
};

var checkBacklogs = false;
function setCheckBacklogs() {
    if (checkBacklogs) {
        return false;
    }
    return true;
}

var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasks);

function filterTasks({ from, to, category, priority }, tasks) {
    return tasks.filter((task) => {
        let meetsCriteria = true;

        if (from && new Date(task.due_date) < new Date(from)) {
            meetsCriteria = false;
        }
        if (to && new Date(task.due_date) > new Date(to)) {
            meetsCriteria = false;
        }

        if (category != "none" && task.category !== category) {
            meetsCriteria = false;
        }
        if (priority != "none" && task.priority !== priority) {
            meetsCriteria = false;
        }

        return meetsCriteria;
    });
}

function backlogTasks(tasks) {
    return tasks.filter((task) => {
        let meetsCriteria = true;
        var todaysDate = new Date();

        if (task.is_completed) {
            meetsCriteria = false;
        }

        if (new Date(task.due_date) > todaysDate) {
            meetsCriteria = false;
        }

        return meetsCriteria;
    });
}

const tasksContainer = document.querySelector(".tasks-container");
function renderTasks(tasks) {
    tasksContainer.innerHTML = "";

    // console.log(JSON.parse(localStorage.getItem("filter-object")));
    console.log(checkBacklogs);
    if (checkBacklogs) {
        tasks = backlogTasks(tasks);
    }

    const { from, to, category, priority } = JSON.parse(
        localStorage.getItem("filter-object")
    ) || { from: "", to: "", category: "none", priority: "none" };
    if (
        !(
            from === "" &&
            to === "" &&
            category === "none" &&
            priority === "none"
        )
    ) {
        tasks = filterTasks({ from, to, category, priority }, tasks);
    }

    tasks.forEach((task) => {
        const taskElement = addTask(task);
        tasksContainer.appendChild(taskElement);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderTasks(tasks);
});

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

    options.forEach((option) => {
        if (option.classList.contains("active")) {
            option.classList.remove("active");
        }
    });

    sortTasks(sortby, tasks);

    sortbyIcon.style.display = "block";
    crossIcon.style.display = "none";

    if (menu.classList.contains("show-menu")) {
        menu.classList.remove("show-menu");
    }

    console.log(sortby);
});

const menu = document.querySelector(".drop-down-menu");
button.addEventListener("click", () => {
    menu.classList.toggle("show-menu");

    menu.addEventListener("blur", () => {
        menu.classList.remove("show-menu");
    });
});

function sortById(tasks) {
    return tasks.sort((task1, task2) => task1.id - task2.id);
}

function sortByDueDate(tasks) {
    return tasks.sort(
        (task1, task2) => new Date(task1.due_date) - new Date(task2.due_date)
    );
}

function sortByPriority(tasks) {
    const priorityOrder = {
        Low: 1,
        Medium: 2,
        High: 3,
    };

    return tasks.sort(
        (task1, task2) =>
            priorityOrder[task1.priority] - priorityOrder[task2.priority]
    );
}

function sortTasks(sortby, tasks) {
    if (sortby === "Due date") {
        tasks = sortByDueDate(tasks);
    } else if (sortby === "Priority") {
        tasks = sortByPriority(tasks);
    } else {
        tasks = sortById(tasks);
    }
    renderTasks(tasks);
}

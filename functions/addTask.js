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

    const subtaskInput = document.createElement("input");
    subtaskInput.classList.add("subtask");
    if (Array.isArray(subtasks)) {
        subtasks.forEach((subtask) => {
            subtaskInput.placeholder = subtask;
        });
    } else {
        subtaskInput.placeholder = subtasks;
    }
    subtaskInput.disabled = true;
    subtasksList.appendChild(subtaskInput);

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

    const tagListItem = document.createElement("li");
    tagListItem.classList.add("tag");
    if (Array.isArray(tags)) {
        tags.forEach((tag) => {
            tagListItem.textContent = tag;
        });
    } else {
        tagListItem.textContent = tags;
    }
    tagsList.appendChild(tagListItem);

    return taskDiv;
};

export default addTask;

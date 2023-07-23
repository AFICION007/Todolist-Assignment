const categoryOptionsList = document.querySelectorAll(".category-option");
var categorySelected = "none";

categoryOptionsList.forEach((option) => {
    option.addEventListener("click", (event) => {
        var active = document.querySelector(".category-active");
        if (option != active) {
            categorySelected = option.textContent;
            active.classList.remove("category-active");
            option.classList.add("category-active");
        }

        console.log(categorySelected);
    });
});

const priorityOptionsList = document.querySelectorAll(".priority-option");
var prioritySelected = "none";

priorityOptionsList.forEach((option) => {
    option.addEventListener("click", (event) => {
        var active = document.querySelector(".priority-active");
        if (option != active) {
            prioritySelected = option.textContent;
            active.classList.remove("priority-active");
            option.classList.add("priority-active");
        }

        console.log(prioritySelected);
    });
});

function addFilter(event) {
    event.preventDefault();
    const from = document.querySelector("#from");
    const to = document.querySelector("#to");

    const filterObject = {
        from: from.value,
        to: to.value,
        category: categorySelected,
        priority: prioritySelected,
    };

    console.log(filterObject);

    from.value = "";
    to.value = "";

    categoryOptionsList.forEach((option) => {
        if (option.textContent === categorySelected) {
            option.classList.remove("category-active");
            var none = document.querySelector("#category-none");
            none.classList.add("category-active");
        }
    });
    categorySelected = "none";

    priorityOptionsList.forEach((option) => {
        if (option.textContent === prioritySelected) {
            option.classList.remove("priority-active");
            var none = document.querySelector("#priority-none");
            none.classList.add("priority-active");
        }
    });
    prioritySelected = "none";

    window.history.back();
}

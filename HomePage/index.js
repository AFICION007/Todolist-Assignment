const options = document.querySelectorAll(".option");
const button = document.querySelector(".sort-by-button");
const sortbyIcon = document.querySelector(".sort-by-icon");
const crossIcon = document.querySelector(".cross-icon");

options.forEach((option) => {
    var active = document.querySelector(".active");
    option.addEventListener("click", () => {
        if (option != active) {
            button.textContent = option.textContent;
            option.classList.add("active");
            if (active) active.classList.remove("active");

            sortbyIcon.style.display = "none";
            crossIcon.style.display = "block";

            menu.classList.toggle("show-menu");
        }
    });
});

crossIcon.addEventListener("click", () => {
    button.textContent = "Sort by";
    sortbyIcon.style.display = "block";
    crossIcon.style.display = "none";
});

const menu = document.querySelector(".drop-down-menu");
button.addEventListener("click", () => {
    menu.classList.toggle("show-menu");

    menu.addEventListener("blur", () => {
        menu.classList.toggle("show-menu");
    });
});

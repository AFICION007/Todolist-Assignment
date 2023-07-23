var tasks = [
    {
        id: 1,
        task: "Buy groceries",
        is_completed: false,
        category: "Shopping",
        due_date: "2023-07-30",
        priority: "Medium",
        subtasks: [
            "Make a shopping list",
            "Go to the supermarket",
            "Pay for groceries",
        ],
        tags: ["Shopping", "Food"],
    },

    {
        id: 2,
        task: "Finish project report",
        is_completed: false,
        category: "Work",
        due_date: "2023-08-15",
        priority: "High",
        subtasks: [
            "Research data",
            "Write content",
            "Create graphs",
            "Proofread",
        ],
        tags: ["Work", "Project", "Reports"],
    },

    {
        id: 3,
        task: "Call mom on her birthday",
        is_completed: false,
        category: "Personal",
        due_date: "2023-09-10",
        priority: "Low",
        subtasks: [
            "Find a nice gift",
            "Set a reminder",
            "Prepare for a longer conversation",
        ],
        tags: ["Family", "Birthdays"],
    },

    {
        id: 4,
        task: "Plan weekend getaway",
        is_completed: false,
        category: "Personal",
        due_date: "2023-08-05",
        priority: "High",
        subtasks: [
            "Research destinations",
            "Book accommodation",
            "Pack essentials",
        ],
        tags: ["Travel", "Relaxation"],
    },

    {
        id: 5,
        task: "Attend team meeting",
        is_completed: false,
        category: "Work",
        due_date: "2023-07-28",
        priority: "Medium",
        subtasks: [
            "Review meeting agenda",
            "Prepare talking points",
            "Take meeting notes",
        ],
        tags: ["Work", "Meeting"],
    },
];

localStorage.setItem("tasks", JSON.stringify(tasks));

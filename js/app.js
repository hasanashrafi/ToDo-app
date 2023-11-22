const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-btn");
const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const deleteAll = document.getElementById("delete-all");

//create array of tasks => get todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos);

const saveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
};
//generate random id for todos
const generateId = () => {
    return Math.round(Math.random() * Math.random() * Math.pow(10, 15)).toString();
};

//create alert message
const showAlert = (message, type) => {
    alertMessage.innerHTML = "";
    const alert = document.createElement("p");
    alert.innerText = message;
    alert.classList.add("alert");
    alert.classList.add(`alert-${type}`);
    alertMessage.append(alert);
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
};
const displayTodos = () => {
    todosBody.innerHTML = "";
    if (!todos.length) {
        todosBody.innerHTML = "<tr><td colspan='4'>No Task Found</td></tr>"
        return
    };
    todos.forEach(todo => {
        todosBody.innerHTML += `
        <tr>
            <td>${todo.task}</td>
            <td>${todo.date || "No Date"}</td>
            <td>${todo.completed ? "Completed" : "Pending"}</td>
            <td>
                <button>Edit</button>
                <button>Do</button>
                <button>Delete</button>
            </td>
        </tr>
        `;
    });

};



//add task to the table
const addTask = () => {
    const task = taskInput.value
    const date = dateInput.value
    const todo = {
        id: generateId(),
        completed: false,
        task,
        date,
    };
    //show success or error alert in html
    if (task) {
        todos.push(todo);
        saveToLs();
        displayTodos();
        taskInput.value = ""
        dateInput.value = ""
        console.log(todos);
        showAlert("Todo Added Successfully", "success");
    } else {
        showAlert("Please Enter Todo", "error");
    }

};
//delete all todos from body and localStorage
const deleteAllTasks = () => {
    if (todos.length) {
        todos = [];
        saveToLs();
        displayTodos();
        showAlert("All Tasks Cleared Successfully", "success");
    }
}

//eventListeners
document.addEventListener("DOMContentLoaded", displayTodos);
addButton.addEventListener("click", addTask);
deleteAll.addEventListener("click", deleteAllTasks);

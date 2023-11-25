const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-btn");
const editButton = document.getElementById("edit-btn");
const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const deleteAll = document.getElementById("delete-all");
const filterButtons = document.querySelectorAll(".filter-todos")

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
const displayTodos = (data) => {
    const todoList = data || todos;
    todosBody.innerHTML = "";

    if (!todoList.length) {
        todosBody.innerHTML = "<tr><td colspan='4'>No Task Found</td></tr>"
        return
    };
    todoList.forEach(todo => {
        todosBody.innerHTML += `
        <tr>
            <td>${todo.task}</td>
            <td>${todo.date || "No Date"}</td>
            <td>${todo.completed ? "Completed" : "Pending"}</td>
            <td>
                <button onclick="editTask('${todo.id}')">Edit</button>
                <button onclick="completeTask('${todo.id}')">
                ${todo.completed ? "Undo" : "Do"}
                </button>
                <button onclick="deleteTask('${todo.id}')">Delete</button>
            </td>
        </tr>
        `
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
    } else {
        showAlert("No Tasks To Clear", "error")
    }
};
const deleteTask = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    todos = newTodos;
    saveToLs()
    displayTodos()
    showAlert("Todo deleted successfully", "success")

};

const completeTask = (id) => {
    const todo = todos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    saveToLs();
    displayTodos();
    showAlert("Todo status successfully", "success")
};

const editTask = (id) => {
    const todo = todos.find(todo => todo.id === id);
    taskInput.value = todo.task;
    dateInput.value = todo.date;
    addButton.style.display = 'none';
    editButton.style.display = 'inline-block';
    editButton.dataset.id = id;
};

const applyEdit = (event) => {
    const id = event.target.dataset.id;
    const todo = todos.find(todo => todo.id === id);
    todo.task = taskInput.value
    todo.date = dateInput.value
    taskInput.value = ""
    dateInput.value = ""
    addButton.style.display = 'inline-block';
    editButton.style.display = 'none';
    saveToLs();
    displayTodos();
    showAlert("Todo Edited successfully", "success")
}
const filterTasks = (event) => {
    let filterTodos = null;
    const filter = event.target.dataset.filter
    switch (filter) {
        case "pending":
            filterTodos = todos.filter((todo) => todo.completed === false)
            break;
        case "completed":
            filterTodos = todos.filter((todo) => todo.completed === true)
            break;

        default:
            filterTodos = todos
            break;
    }
    displayTodos(filterTodos)

}
//eventListeners
window.addEventListener("DOMContentLoaded", () => displayTodos());
addButton.addEventListener("click", addTask);
deleteAll.addEventListener("click", deleteAllTasks);
editButton.addEventListener("click", applyEdit)
filterButtons.forEach(button => {
    button.addEventListener("click", filterTasks)
})














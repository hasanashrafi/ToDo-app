const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-btn");
const alertMessage = document.getElementById("alert-message")

//create array of tasks
const todos = [];

const generateId = () => {
    return Math.round(Math.random() * Math.random() * Math.pow(10, 15)).toString();

}

//create alert message
const showAlert = (message, type) => {
    alertMessage.innerHTML = "";
    const alert = document.createElement("p")
    alert.innerText = message
    alert.classList.add("alert");
    alert.classList.add(`alert-${type}`);
    alertMessage.append(alert);

    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
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
        taskInput.value = ""
        dateInput.value = ""
        console.log(todos);
        showAlert("Todo Added Successfully", "success")
    } else {
        showAlert("Please Enter Todo", "error")
    }

};









addButton.addEventListener("click", addTask);


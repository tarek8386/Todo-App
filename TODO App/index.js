// At first find every element from html file

const container = document.querySelector(".container");
const form = document.querySelector(".form");
const inputTodo = document.querySelector("#inputTodo");
const addButton = document.querySelector("#addButton");
const todoLists = document.querySelector("#list");
const message = document.querySelector("#message");

//create todo
const createTodo = (todoId, todoValues) => {
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("list-style");
    todoElement.innerHTML = `
    <span>${todoValues}</span>
    <span> <button class="btn" id="deleteButton"> <i class="fa-solid fa-delete-left"></i></button> </span>
    `;
    todoLists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click",deleteTodo);

};

//deletetodo
const deleteTodo = (e) => {
  const selectTodo = e.target.parentElement.parentElement.parentElement;
  todoLists.removeChild(selectTodo);
  showMessage("todo is Deleted", "danger");

  //delete from local storage
  let todos = todoFromLocalStorage();
  todos = todos.filter((todo) => todo.todoId !== selectTodo.id);
  localStorage.setItem("myTodo", JSON.stringify(todos));
}
//ADD/delete message show section
const showMessage = (text, status) => {
    message.textContent = text;
    message.classList.add(`bg-${status}`);

    setTimeout(() => {
        message.textContent = ""
        message.classList.remove(`bg-${status}`);
    }, 1000)

}

//get todo from local storage

const todoFromLocalStorage = () => {
    return localStorage.getItem("myTodo") ? JSON.parse(localStorage.getItem("myTodo")) : [];
};

//add todo
const addTodo = (e) => {
    e.preventDefault();
    const todoValues = inputTodo.value;

    //add unique id for new todo list
    const todoId = Date.now().toString();
    createTodo(todoId, todoValues);
    showMessage("todo is added successfully", "success");

    //add todo to the localstorage

    const todos = todoFromLocalStorage();
    todos.push({todoId,todoValues});
    localStorage.setItem("myTodo", JSON.stringify(todos));

    inputTodo.value ="";
};

//loadExistingTodo

const loadExistingTodo=()=>{
    const todos = todoFromLocalStorage();
    todos.map((todo)=>createTodo(todo.todoId,todo.todoValues))
};

//now adding listener
form.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadExistingTodo);





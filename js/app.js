const taskInput = document.querySelector("#task");
const addTask = document.querySelector("#addbtn");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector("#clr");

loadEventListeners();

function loadEventListeners() {
  addTask.addEventListener("click", addatask);
  clearBtn.addEventListener("click", removeAllTask);
  document.addEventListener("DOMContentLoaded", getTasks);
}

// Add Tasks

function addatask(e) {
  const li = document.createElement("li");

  li.className = "collection-item";

  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement("a");

  link.className = "delete-item";

  link.innerHTML = '<i class="x">x</i>';

  link.addEventListener("click", removeTask);

  li.appendChild(link);
  taskList.appendChild(li);

  if (taskInput.value === "") {
    alert("Add Somthing");
    li.style.display = "none";
  }

  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = "";

  e.preventDefault();
}

// Store task in Ls

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");

    li.className = "collection-item";

    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");

    link.setAttribute('data-task', task)

    link.className = "delete-item";

    link.innerHTML = `<i class="x">x</i>`;

    li.appendChild(link);

    taskList.appendChild(li);
  });
}

// Remove Tasks

function removeTask(e) {

  console.log(e.target)
  // if (confirm("Are You Sure?")) {
  //   e.target.parentElement.parentElement.remove();

  //   removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  // }
}

// Remove From Local Storage

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    console.log(taskItem.textContent, task);
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
    console.log(task);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove All Tasks

function removeAllTask() {
  if (confirm("Are You Sure?")) {
    taskList.innerHTML = "";
  }

  clearTasksFromLS();
}

function clearTasksFromLS() {
  localStorage.clear();
}

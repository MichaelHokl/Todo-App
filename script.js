"use strict";
let tasks = [];
const taskList = document.querySelector(".task-list");

//----LocalStorage----//
const saveTasks = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasks = function () {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTask();
  }
};

// ----ADDING A TASK TO THE ARRAY----//
const addtask = function () {
  const input = document.querySelector("input");
  const newTask = input.value.trim();
  if (newTask !== "") {
    tasks.push({ id: Date.now(), text: newTask, completed: false });
    renderTask();
    saveTasks();
  }
  input.value = "";
};

// ----RENDERING TASKS TO THE UI----//
const renderTask = function () {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const liElement = document.createElement("li");

    // Create HTML with conditional classes and button visibility
    liElement.innerHTML = `<div>
      <div class="task-checkbox">
        <input type="checkbox" class="checkbox" data-id="${task.id}" ${
      task.completed ? "checked" : ""
    } />
        <p class="task ${task.completed ? "completed" : ""}">${task.text}</p>
      </div>
      <div class="btn-div">
        <button class="edit-btn" data-id="${task.id}">Edit</button>
        <button class="delete-btn" data-id="${task.id}">Delete</button>
      </div>
    </div>`;

    // Apply completed-div class for styling
    if (task.completed) {
      liElement.classList.add("completed-div");
    }

    // Hide buttons if task is completed
    const editBtn = liElement.querySelector(".edit-btn");
    const deleteBtn = liElement.querySelector(".delete-btn");

    if (task.completed) {
      editBtn.style.visibility = "hidden";
      deleteBtn.style.visibility = "hidden";
    } else {
      editBtn.style.visibility = "visible";
      deleteBtn.style.visibility = "visible";
    }

    taskList.appendChild(liElement);
  });
};

// ----EDIT BUTTON, SAVE BUTTON & TASK COMPLETED----//
document.querySelector(".task-list").addEventListener("click", (e) => {
  //variables//
  const taskP = e.target.closest("li");
  const task = taskP.querySelector(".task");
  const id = Number(e.target.dataset.id);
  const range = document.createRange();
  const textNode = task.firstChild;
  task.dataset.originalText = task.textContent;

  //delete logic//
  if (e.target.classList.contains("delete-btn")) {
    tasks = tasks.filter((task) => task.id !== id);
    renderTask();
    saveTasks();
  }
  //editing logic//
  else if (e.target.classList.contains("edit-btn")) {
    if (e.target.textContent === "Edit") {
      task.contentEditable = "true";
      e.target.textContent = "Save";
      task.focus();

      //cursor to end of text//
      range.setStart(textNode, textNode.length);
      range.collapse(true);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);

      //Enter and escape logic//

      //enter logic//
      task.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const taskToUpdate = tasks.find((task) => task.id === id);
          taskToUpdate.text = task.textContent;
          task.contentEditable = "false";
          e.target.textContent = "Edit";
          renderTask();
          saveTasks();
        }
        //esc cancel edit logic//
        else if (e.key === "Escape") {
          task.textContent = task.dataset.originalText;
          task.contentEditable = "false";
          e.target.textContent = "Edit";
          renderTask();
        }
      });

      //Save button logic//
    } else if (e.target.textContent === "Save") {
      const taskToUpdate = tasks.find((task) => task.id === id);
      taskToUpdate.text = task.textContent;
      task.contentEditable = "false";
      e.target.textContent = "Edit";
    }

    //Line through done task//
  } else if (e.target.matches(".checkbox")) {
    const editBtn = taskP.querySelector(".edit-btn");
    const deleteBtn = taskP.querySelector(".delete-btn");
    const taskToStrikeThrough = tasks.find((task) => task.id === id);
    taskToStrikeThrough.completed = !taskToStrikeThrough.completed;
    task.classList.toggle("completed");
    taskP.classList.toggle("completed-div");
    saveTasks();

    //Hiding and making buttons visible
    if (taskToStrikeThrough.completed) {
      editBtn.style.visibility = "hidden";
      deleteBtn.style.visibility = "hidden";
    } else {
      editBtn.style.visibility = "visible";
      deleteBtn.style.visibility = "visible";
    }
  }
});

//Adding task
document.querySelector("#submit-btn").onclick = (e) => {
  e.preventDefault();
  addtask();
};

const backgroundIMG = [
  "./pictures/img1.jpg",
  "./pictures/img2.jpg",
  "./pictures/img3.jpg",
  "./pictures/img4.jpg",
  "./pictures/img5.jpg",
  "./pictures/img6.jpg",
];
const backgroundColor = function () {
  const random = Math.floor(Math.random() * backgroundIMG.length);
  const body = document.body;
  body.style.backgroundImage = `url('${backgroundIMG[random]}')`;
  body.style.backgroundSize = "cover";
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundPosition = "center center";
};

document.querySelector(".change-bg").addEventListener("click", backgroundColor);

loadTasks();

"use strict";
let tasks = [];

const addTask = () => {
  const input = document.querySelector(".task-input");
  const text = input.value.trim();
  const taskList = document.querySelector(".task-list");

  if (text) {
    tasks.push({ text, completed: false });
    input.value = "";
  }

  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskLi = document.createElement("li");
    taskLi.innerHTML = `
    <div class="task-item">
    <div class="task">
          <input type="checkbox" class="checkbox" ${
            task.completed ? "checked" : ""
          }/>
          <p class="task-p">${task.text}</p>
        </div>
        <div class="icons">
          <span class="edit-btn">✏️</span>
          <span class="delete-btn">🗑️</span>
        </div>
      </div>`;

    taskList.appendChild(taskLi);

    const deleteButton = taskLi.querySelector(".delete-btn");
    const editBtn = taskLi.querySelector(".edit-btn");
    const taskP = taskLi.querySelector(".task-p");
    const saveBtn = document.createElement("span");
    const checkbox = taskLi.querySelector(".checkbox");
    const taskDiv = taskLi.querySelector(".task-item");

    saveBtn.textContent = "💾";
    saveBtn.className = "save-btn";

    deleteButton.addEventListener("click", () => {
      tasks.splice(i, 1);
      addTask();
    });

    editBtn.addEventListener("click", () => {
      taskP.contentEditable = "true";
      taskP.focus();
      editBtn.style.display = "none";
      deleteButton.replaceWith(saveBtn);
      taskP.focus();
      document.execCommand("selectAll", false, null);
      document.getSelection().collapseToEnd();

      saveBtn.addEventListener("click", () => {
        taskP.contentEditable = "false";
        tasks[i].text = taskP.textContent.trim();
        editBtn.style.display = "inline";
        saveBtn.replaceWith(deleteButton);
      });
    });

    taskP.addEventListener("blur", () => {
      taskP.contentEditable = "false";
      tasks[i].text = taskP.textContent.trim();
      editBtn.style.display = "inline";
      saveBtn.replaceWith(deleteButton);
    });

    taskP.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        taskP.blur();
        editBtn.style.display = "inline";
        saveBtn.replaceWith(deleteButton);
      }
    });

    if (task.completed) {
      taskP.classList.add("completed");
    }

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      if (checkbox.checked) {
        taskP.classList.add("completed");
        taskDiv.classList.add("completed-div");
      } else {
        taskP.classList.remove("completed");
        taskDiv.classList.remove("completed-div");
      }
    });
  }
};

document.getElementById("submit-btn").addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});

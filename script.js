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
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <span class="edit-btn">✏️</span>
          <span class="delete-btn">🗑️</span>
        </div>
      </div>`;

    // Append to list first
    taskList.appendChild(taskLi);

    // Use querySelector inside taskLi to target the correct button
    taskLi.querySelector(".delete-btn").addEventListener("click", () => {
      tasks.splice(i, 1); // Remove from array
      addTask(); // Re-render the list
    });
  }
};

document.getElementById("submit-btn").addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});

// ===== STEP 1: Select HTML elements =====
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
const taskCounter = document.getElementById("taskCounter");
const clearBtn = document.getElementById("clearBtn");
const emptyMsg = document.getElementById("emptyMsg");

// ===== STEP 2: Array that stores all tasks =====
// Each task looks like: { text: "Buy milk", completed: false }
let tasks = [];

// ===== BONUS: localStorage (save and load tasks) =====
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
}

// ===== STEP 3 (A + E): Add a task, with validation =====
function addTask() {
  // E. Remove unnecessary spaces before and after the text
  const taskText = taskInput.value.trim();

  // E. Prevent empty tasks and show a message
  if (taskText === "") {
    errorMsg.classList.remove("hidden");
    alert("Please enter a task before adding.");
    taskInput.focus();
    return;
  }

  errorMsg.classList.add("hidden");

  // A. Add the new task to the array
  tasks.push({ text: taskText, completed: false });

  taskInput.value = "";
  taskInput.focus();

  saveTasks();
  renderTasks();
}

// ===== STEP 4 (B + C + D): Display tasks on the page =====
function renderTasks() {
  // Clear the list first, then rebuild it (no page refresh needed)
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    // Create the list item
    const li = document.createElement("li");
    li.classList.add("task-item");

    // C. Apply the "completed" class if the task is done
    if (task.completed) {
      li.classList.add("completed");
    }

    // C. Checkbox to mark as completed
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      toggleTask(index);
    });

    // Task text (textContent is safe against HTML injection)
    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = task.text;

    // D. Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      deleteTask(index);
    });

    // Put everything together and add to the list
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateUI();
}

// ===== STEP 5 (C): Mark a task as completed / not completed =====
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// ===== STEP 6 (D): Delete a single task =====
function deleteTask(index) {
  tasks.splice(index, 1); // remove 1 item at this position
  saveTasks();
  renderTasks();
}

// ===== STEP 7 (BONUS): Counter and "no tasks" message =====
function updateUI() {
  taskCounter.textContent = "Total tasks: " + tasks.length;

  if (tasks.length === 0) {
    emptyMsg.classList.remove("hidden");
  } else {
    emptyMsg.classList.add("hidden");
  }
}

// ===== STEP 8 (BONUS): Clear all tasks =====
function clearAllTasks() {
  if (tasks.length === 0) {
    return;
  }
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}

// ===== STEP 9: Event listeners =====
addBtn.addEventListener("click", addTask);

// Allow pressing Enter to add a task
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Hide the error message as soon as the user starts typing
taskInput.addEventListener("input", function () {
  errorMsg.classList.add("hidden");
});

clearBtn.addEventListener("click", clearAllTasks);

// ===== STEP 10: Run when the page loads =====
loadTasks();
renderTasks();

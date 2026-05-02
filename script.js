let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

/* SAVE */
function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ADD TASK */
function addTask() {
let input = document.getElementById("taskInput");
let text = input.value.trim();

if (text === "") return;

tasks.push({
id: Date.now(),
text: text,
completed: false
});

input.value = "";
saveTasks();
renderTasks();
}

/* DELETE */
function deleteTask(id) {
tasks = tasks.filter(t => t.id !== id);
saveTasks();
renderTasks();
}

/* TOGGLE COMPLETE */
function toggleTask(id) {
tasks = tasks.map(t => {
if (t.id === id) {
t.completed = !t.completed;
}
return t;
});

saveTasks();
renderTasks();
}

/* EDIT TASK */
function editTask(id) {
let newText = prompt("Edit task:");
if (!newText) return;

tasks = tasks.map(t => {
if (t.id === id) {
t.text = newText;
}
return t;
});

saveTasks();
renderTasks();
}

/* FILTER */
function setFilter(filter) {
currentFilter = filter;
renderTasks();
}

/* SEARCH */
function searchTask() {
renderTasks();
}

/* RENDER */
function renderTasks() {
let list = document.getElementById("taskList");
let searchValue = document.getElementById("searchInput").value.toLowerCase();

list.innerHTML = "";

let filtered = tasks.filter(task => {


let matchFilter =
  currentFilter === "all" ||
  (currentFilter === "active" && !task.completed) ||
  (currentFilter === "completed" && task.completed);

let matchSearch = task.text.toLowerCase().includes(searchValue);

return matchFilter && matchSearch;


});

filtered.forEach(task => {
let div = document.createElement("div");
div.className = "task" + (task.completed ? " completed" : "");

```
div.innerHTML = `
  <span onclick="toggleTask(${task.id})">${task.text}</span>
  <div class="actions">
    <button onclick="editTask(${task.id})">✏️</button>
    <button onclick="deleteTask(${task.id})">❌</button>
  </div>
`;

list.appendChild(div);


});

updateCounter();
}

/* COUNTER */
function updateCounter() {
let total = tasks.length;
let done = tasks.filter(t => t.completed).length;

document.getElementById("counter").innerText =
`${done} / ${total} tasks completed`;
}

/* INIT */
renderTasks();

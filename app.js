console.log("app.js is running");

const STORAGE_KEY = "todos.v1";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const countEl = document.getElementById("count");
const clearBtn = document.getElementById("clear-completed");

let todos = load();
let newlyAddedId = null;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  todos.push({ id, text: trimmed, done: false });
  newlyAddedId = id;
  save();
  render();
}

function toggleTodo(id) {
  const t = todos.find((t) => t.id === id);
  if (!t) return;
  t.done = !t.done;
  save();
  render();
}

function deleteTodo(id) {
  const li = list.querySelector(`[data-id="${CSS.escape(id)}"]`);
  if (!li || reducedMotion.matches) {
    todos = todos.filter((t) => t.id !== id);
    save();
    render();
    return;
  }
  li.classList.add("todo-item--leaving");
  li.addEventListener(
    "animationend",
    () => {
      todos = todos.filter((t) => t.id !== id);
      save();
      render();
    },
    { once: true }
  );
}

function clearCompleted() {
  todos = todos.filter((t) => !t.done);
  save();
  render();
}

function render() {
  list.innerHTML = "";

  if (todos.length === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "No todos yet. Add one above.";
    list.appendChild(li);
  } else {
    for (const t of todos) {
      const li = document.createElement("li");
      li.className = "todo-item" + (t.done ? " done" : "");
      li.dataset.id = t.id;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = t.done;
      checkbox.addEventListener("change", () => toggleTodo(t.id));

      const span = document.createElement("span");
      span.className = "text";
      span.textContent = t.text;

      const del = document.createElement("button");
      del.type = "button";
      del.className = "delete";
      del.setAttribute("aria-label", "Delete todo");
      del.textContent = "×";
      del.addEventListener("click", () => deleteTodo(t.id));

      if (t.id === newlyAddedId) {
        li.classList.add("todo-item--new");
      }

      li.append(checkbox, span, del);
      list.appendChild(li);
    }
  }
  newlyAddedId = null;

  const remaining = todos.filter((t) => !t.done).length;
  countEl.textContent = `${remaining} item${remaining === 1 ? "" : "s"} left`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo(input.value);
  input.value = "";
  input.focus();
});

clearBtn.addEventListener("click", clearCompleted);

render();

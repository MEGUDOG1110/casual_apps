type FilterType = "all" | "open" | "done";

type Task = {
  id: number;
  text: string;
  done: boolean;
};

const initialTasks: Task[] = [
  { id: 1, text: "請求メールを送る", done: false },
  { id: 2, text: "会議メモを整理する", done: true },
  { id: 3, text: "来月の見積項目を確認する", done: false },
];

const state = {
  filter: "all" as FilterType,
  nextId: 4,
  tasks: [...initialTasks],
};

const form = document.getElementById("task-form") as HTMLFormElement;
const input = document.getElementById("task-input") as HTMLInputElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const summary = document.getElementById("summary") as HTMLParagraphElement;
const filterButtons = Array.from(document.querySelectorAll("[data-filter]")) as HTMLButtonElement[];

function getFilteredTasks() {
  if (state.filter === "open") {
    return state.tasks.filter((task) => !task.done);
  }

  if (state.filter === "done") {
    return state.tasks.filter((task) => task.done);
  }

  return state.tasks;
}

function renderSummary() {
  const openCount = state.tasks.filter((task) => !task.done).length;
  const doneCount = state.tasks.length - openCount;
  summary.textContent = `未完了 ${openCount}件 / 完了 ${doneCount}件 / 合計 ${state.tasks.length}件`;
}

function renderFilters() {
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === state.filter);
  });
}

function renderTasks() {
  const filteredTasks = getFilteredTasks();
  taskList.replaceChildren();

  if (filteredTasks.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-state";
    emptyItem.textContent = "表示する項目がありません。";
    taskList.appendChild(emptyItem);
    return;
  }

  filteredTasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-item${task.done ? " is-done" : ""}`;

    const toggle = document.createElement("input");
    toggle.className = "task-toggle";
    toggle.type = "checkbox";
    toggle.checked = task.done;
    toggle.addEventListener("change", () => {
      task.done = toggle.checked;
      render();
    });

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const remove = document.createElement("button");
    remove.className = "task-remove";
    remove.type = "button";
    remove.textContent = "削除";
    remove.addEventListener("click", () => {
      state.tasks = state.tasks.filter((currentTask) => currentTask.id !== task.id);
      render();
    });

    item.append(toggle, text, remove);
    taskList.appendChild(item);
  });
}

function render() {
  renderSummary();
  renderFilters();
  renderTasks();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    input.focus();
    return;
  }

  state.tasks.unshift({
    id: state.nextId,
    text,
    done: false,
  });
  state.nextId += 1;
  input.value = "";
  render();
  input.focus();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter as FilterType;
    render();
  });
});

render();

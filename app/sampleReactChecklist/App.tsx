import { useMemo, useState } from "react";

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

export function App() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(4);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const filteredTasks = useMemo(() => {
    if (filter === "open") {
      return tasks.filter((task) => !task.done);
    }

    if (filter === "done") {
      return tasks.filter((task) => task.done);
    }

    return tasks;
  }, [filter, tasks]);

  const openCount = tasks.filter((task) => !task.done).length;
  const doneCount = tasks.length - openCount;

  function addTask() {
    const text = inputText.trim();

    if (!text) {
      return;
    }

    setTasks((currentTasks) => [{ id: nextId, text, done: false }, ...currentTasks]);
    setNextId((currentId) => currentId + 1);
    setInputText("");
  }

  function toggleTask(taskId: number) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task)),
    );
  }

  function removeTask(taskId: number) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-6 text-slate-900">
      <section className="flex items-start justify-between gap-4 border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(20,32,19,0.08)]">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
            React Sample / TailwindCSS
          </p>
          <h1 className="text-3xl font-bold">Simple Checklist</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            同じ題材を TailwindCSS をそのまま JSX
            に書く形で組んだ比較用サンプルです。状態更新は書きやすく、
            画面追加も速い一方で、見た目の語彙は別途そろえないと散りやすくなります。
          </p>
        </div>
        <div className="rounded-full bg-sky-50 px-3 py-2 text-xs font-bold text-sky-700">
          Vite + React + TailwindCSS
        </div>
      </section>

      <section className="mt-5 border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(20,32,19,0.08)]">
        <form
          className="flex flex-col gap-3 md:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            addTask();
          }}
        >
          <input
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            placeholder="例: 見積書を送る"
          />
          <button
            type="submit"
            className="rounded-2xl bg-sky-700 px-5 py-3 font-semibold text-white"
          >
            追加
          </button>
        </form>

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["all", "すべて"],
                ["open", "未完了"],
                ["done", "完了"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                  filter === value
                    ? "border-sky-700 bg-sky-50 text-sky-700"
                    : "border-slate-200 text-slate-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="m-0 text-sm text-slate-500">
            未完了 {openCount}件 / 完了 {doneCount}件 / 合計 {tasks.length}件
          </p>
        </div>

        <ul className="mt-5 grid gap-3 p-0">
          {filteredTasks.length === 0 ? (
            <li className="list-none rounded-2xl border border-dashed border-slate-200 p-5 text-center text-slate-500">
              表示する項目がありません。
            </li>
          ) : (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                className={`list-none rounded-2xl border p-4 ${
                  task.done ? "border-slate-200 bg-slate-50" : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className="h-5 w-5"
                  />
                  <span
                    className={`flex-1 leading-7 ${task.done ? "text-slate-500 line-through" : ""}`}
                  >
                    {task.text}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeTask(task.id)}
                    className="text-sm font-bold text-rose-700"
                  >
                    削除
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
}

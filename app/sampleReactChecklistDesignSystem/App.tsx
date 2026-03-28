import { useMemo, useState } from "react";
import { css, cx } from "../../styled-system/css";
import { Button, Chip, Panel, TaskRow, TextInput } from "../../panda/components";

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

const pageClass = css({
  minHeight: "100vh",
  maxWidth: "1040px",
  marginInline: "auto",
  paddingInline: { base: "4", md: "6" },
  paddingBlock: "6",
  color: "text",
  background: "linear-gradient(180deg, var(--colors-pageStart) 0%, var(--colors-pageEnd) 100%)",
});

const heroLayoutClass = css({
  display: "flex",
  flexDirection: { base: "column", md: "row" },
  gap: "5",
  justifyContent: "space-between",
  alignItems: "flex-start",
});

const titleClass = css({
  margin: 0,
  fontSize: "title",
  lineHeight: 1.1,
});

const eyebrowClass = css({
  margin: "0 0 10px",
  color: "accent",
  fontSize: "xs",
  fontWeight: "800",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
});

const copyClass = css({
  maxWidth: "720px",
  marginTop: "3.5",
  color: "textMuted",
  fontSize: "body",
  lineHeight: 1.8,
});

const badgeClass = css({
  alignSelf: "flex-start",
  borderRadius: "pill",
  backgroundColor: "accentSoft",
  color: "accent",
  paddingInline: "3.5",
  paddingBlock: "2.5",
  fontSize: "xs",
  fontWeight: "800",
});

const formRowClass = css({
  display: "flex",
  flexDirection: { base: "column", md: "row" },
  gap: "3",
});

const toolbarClass = css({
  display: "flex",
  flexDirection: { base: "column", md: "row" },
  gap: "4",
  alignItems: { base: "stretch", md: "center" },
  justifyContent: "space-between",
  marginTop: "5",
});

const chipGroupClass = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "2",
});

const metaClass = css({
  margin: 0,
  color: "textMuted",
  fontSize: "sm",
});

const listClass = css({
  display: "grid",
  gap: "3",
  marginTop: "5",
  padding: 0,
});

const emptyClass = css({
  listStyle: "none",
  borderWidth: "1px",
  borderStyle: "dashed",
  borderColor: "border",
  borderRadius: "control",
  padding: "5",
  color: "textMuted",
  textAlign: "center",
});

const taskBodyClass = css({
  display: "flex",
  flexDirection: { base: "column", md: "row" },
  gap: "3",
  alignItems: { base: "stretch", md: "center" },
});

const checkboxClass = css({
  width: "20px",
  height: "20px",
});

const taskTextClass = css({
  flex: "1 1 auto",
  lineHeight: 1.7,
});

const taskTextDoneClass = css({
  color: "textMuted",
  textDecoration: "line-through",
});

const filterOptions: ReadonlyArray<readonly [FilterType, string]> = [
  ["all", "すべて"],
  ["open", "未完了"],
  ["done", "完了"],
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
    <main className={pageClass}>
      <Panel className={heroLayoutClass}>
        <div>
          <p className={eyebrowClass}>React Sample / PandaCSS</p>
          <h1 className={titleClass}>Simple Checklist</h1>
          <p className={copyClass}>
            同じ題材を PandaCSS の token と recipe で組んだ比較用サンプルです。AI
            に継続追加させる時も、 見た目の語彙を config 側へ集約できます。
          </p>
        </div>
        <div className={badgeClass}>Vite + React + PandaCSS</div>
      </Panel>

      <Panel>
        <form
          className={formRowClass}
          onSubmit={(event) => {
            event.preventDefault();
            addTask();
          }}
        >
          <TextInput
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            placeholder="例: 見積書を送る"
          />
          <Button type="submit">追加</Button>
        </form>

        <div className={toolbarClass}>
          <div className={chipGroupClass}>
            {filterOptions.map(([value, label]) => (
              <Chip
                key={value}
                type="button"
                active={filter === value}
                onClick={() => setFilter(value)}
              >
                {label}
              </Chip>
            ))}
          </div>
          <p className={metaClass}>
            未完了 {openCount}件 / 完了 {doneCount}件 / 合計 {tasks.length}件
          </p>
        </div>

        <ul className={listClass}>
          {filteredTasks.length === 0 ? (
            <li className={emptyClass}>表示する項目がありません。</li>
          ) : (
            filteredTasks.map((task) => (
              <TaskRow key={task.id} done={task.done}>
                <div className={taskBodyClass}>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className={checkboxClass}
                  />
                  <span className={cx(taskTextClass, task.done && taskTextDoneClass)}>
                    {task.text}
                  </span>
                  <Button
                    type="button"
                    visual="ghostDanger"
                    size="sm"
                    onClick={() => removeTask(task.id)}
                  >
                    削除
                  </Button>
                </div>
              </TaskRow>
            ))
          )}
        </ul>
      </Panel>
    </main>
  );
}

declare const React: typeof import("react");
declare const ReactDOM: {
  createRoot(container: Element | DocumentFragment): {
    render(children: React.ReactNode): void;
  };
};

const featureItems = [
  "index.html で外部 CDN とローカル資産を定義する",
  "main.tsx に画面と状態管理をまとめる",
  "style.css で見た目を調整し、build 時に単一 HTML へ埋め込む",
];

function App() {
  const [name, setName] = React.useState("New Utility App");

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Template</p>
        <div className="hero-row">
          <div>
            <h1>{name}</h1>
            <p className="hero-copy">
              この雛形は CDN の React と readable-inline
              を前提にしています。ソースは分割したまま保ち、配布時は読みやすい単一 HTML
              にまとめます。
            </p>
          </div>
          <span className="hero-badge">readable-inline</span>
        </div>
      </section>

      <section className="panel-card">
        <label className="field-label" htmlFor="app-name">
          アプリ名
        </label>
        <div className="field-row">
          <input
            id="app-name"
            className="text-input"
            value={name}
            onChange={(event) => setName(event.target.value || "New Utility App")}
          />
        </div>

        <div className="guide-grid">
          {featureItems.map((item, index) => (
            <article className="guide-item" key={item}>
              <p className="guide-step">STEP {index + 1}</p>
              <p className="guide-text">{item}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const container = document.getElementById("root");

if (!container) {
  throw new Error("#root が見つかりません");
}

ReactDOM.createRoot(container).render(<App />);

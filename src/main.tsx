import { createRoot } from "react-dom/client";
import apps from "./apps.json";
import "./styles.css";

function AppLauncher() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fff7,_#dbeee4_52%,_#c7ddd0)] px-6 py-10 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="rounded-[2rem] border border-white/60 bg-white/70 p-8 shadow-[0_30px_90px_rgba(16,124,65,0.12)] backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#107C41]">
            Casual Apps
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            業務向けの単一HTMLアプリ配布ワークスペース
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
            各アプリは app
            配下で独立して実装し、ビルド後はブラウザで直接開ける単一HTMLとして共有できます。
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {apps.map((app) => (
            <article
              key={app.id}
              className="group rounded-[1.75rem] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-transform duration-200 hover:-translate-y-1"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#107C41]">
                app/{app.id}
              </p>
              <h2 className="mt-4 text-2xl font-bold text-slate-950">{app.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{app.description}</p>
              <div className="mt-6 flex gap-3">
                <a
                  className="inline-flex items-center rounded-full bg-[#107C41] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0c6434]"
                  href={`./app/${app.id}/index.html`}
                >
                  アプリを開く
                </a>
                <span className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-500">
                  dist/app/{app.id}/index.html
                </span>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<AppLauncher />);

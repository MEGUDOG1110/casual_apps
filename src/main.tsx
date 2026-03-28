
import { createRoot } from "react-dom/client";
import apps from "./apps.json";
import "./styles.css";


function getContrastText(bg: string) {
  // 簡易: 明度で白/黒を切替（MD3推奨値に近い）
  if (!bg) return '#fff';
  const hex = bg.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // YIQ式
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 160 ? '#23272b' : '#fff';
}

function AppLauncher() {
  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-[var(--md3-bg)] p-8">
      {/* サイドバー */}
      <aside
        className="hidden md:flex flex-col w-[280px] rounded-[28px] bg-[var(--md3-sidebar)] shadow-[var(--md3-shadow)] mr-8 p-0 py-8 overflow-hidden border border-[var(--md3-sidebar-outline)]"
        style={{ height: 'calc(100vh - 64px)' }}
      >
        {/* サイドバー上部: アプリ一覧 */}
        <div className="flex items-center gap-3 px-7 pt-8 pb-4">
          <span className="material-symbols-outlined flex items-center justify-center rounded-2xl text-2xl" style={{ background: '#107C41', color: '#fff', width: 40, height: 40, display: 'flex' }}>apps</span>
          <span className="text-base font-bold tracking-wide" style={{ color: '#80e27e' }}>アプリ一覧</span>
        </div>
        <nav className="flex-1 overflow-y-auto px-2">
          <ul className="space-y-1">
            {apps.map((app) => (
              <li key={app.id}>
                <a
                  href={`#app-${app.id}`}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-[var(--md3-surface-variant)] transition-colors"
                  style={{ color: app.color }}
                >
                  <span className="material-symbols-outlined text-lg" style={{ color: app.color }}>{app.icon}</span>
                  <span className="text-[var(--md3-on-surface)]" style={{ color: 'inherit' }}>{app.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* サイドバー下部: README的なドキュメント */}
        <div className="mt-auto px-7 pb-7 pt-4 border-t border-[var(--md3-sidebar-outline)] bg-[var(--md3-surface-variant)] mb-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-base text-[var(--md3-info)]">info</span>
            <span className="text-xs font-semibold text-[var(--md3-info)]">ご案内</span>
          </div>
          <p className="text-xs text-[var(--md3-on-surface-variant)] leading-relaxed">
            各アプリは単一HTMLで配布・利用できます。<br />
            サーバー不要・インストール不要。<br />
            右側のリストから起動してください。
          </p>
        </div>
      </aside>

      {/* メインエリア */}
      <main className="w-[640px] max-w-full py-0">
        {/* ヘッダー */}
        <header className="rounded-[28px] bg-[var(--md3-surface)] px-10 pb-8 pt-8 shadow-[var(--md3-shadow)] mb-8 border border-[var(--md3-card-outline)]">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--md3-on-surface)] mb-2">業務ツール ランチャー</h1>
          <p className="text-sm text-[var(--md3-on-surface-variant)]">よく使う業務アプリをまとめて管理・起動できます。</p>
        </header>

        {/* アプリ一覧リスト */}
        <section className="flex flex-col gap-7">
          {apps.map((app) => {
            const btnTextColor = getContrastText(app.color);
            return (
              <article
                key={app.id}
                id={`app-${app.id}`}
                className="group flex flex-row items-center rounded-[20px] bg-[var(--md3-card)] shadow-[var(--md3-shadow)] px-7 py-5 gap-6 transition-shadow duration-200 hover:shadow-[0_2px_6px_2px_rgba(0,0,0,0.18),0_1px_2px_0_rgba(0,0,0,0.30)] border border-[var(--md3-card-outline)]"
              >
                <span
                  className="material-symbols-outlined flex items-center justify-center rounded-2xl text-3xl shrink-0"
                  style={{ background: app.color, color: btnTextColor, width: 56, height: 56, display: 'flex' }}
                >
                  {app.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="truncate text-lg font-semibold text-[var(--md3-on-surface)]">{app.title}</h2>
                  <p className="mt-1 text-sm text-[var(--md3-on-surface-variant)] truncate">{app.description}</p>
                  <p className="mt-1 text-xs text-[var(--md3-outline)]">app/{app.id}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <a
                    className="inline-flex items-center gap-1.5 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors hover:opacity-90"
                    style={{ background: app.color, color: btnTextColor, height: 40, minHeight: 40, lineHeight: 'normal' }}
                    href={`./app/${app.id}/index.html`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="アプリを別タブで開く"
                  >
                    <span style={{ fontSize: 16, fontWeight: 600, height: 16, lineHeight: '16px', display: 'flex', alignItems: 'center' }}>開く</span>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, height: 16, width: 16, lineHeight: '16px', display: 'flex', alignItems: 'center', color: btnTextColor }}>open_in_new</span>
                  </a>
                  <span className="rounded-full border border-[var(--md3-badge-outline)] px-4 py-1 text-xs text-[var(--md3-on-surface-variant)] bg-[var(--md3-badge-bg)]">dist/app/{app.id}</span>
                </div>
              </article>
            );
          })}
        </section>

        {/* フッター */}
        <footer className="pt-10 pb-4 text-center text-xs text-[var(--md3-on-surface-variant)]">
          <p>ファイルを直接開くだけで使えます — サーバー不要・インストール不要</p>
        </footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<AppLauncher />);

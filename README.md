# casual_apps

app 配下に小規模アプリを置き、ビルド後に単一HTMLとして共有するワークスペースです。

ビルド基盤は Vite+ です。複数アプリのビルドもローカルの Vite+ CLI を Node から起動するため、OS に依存しません。

## 開発

- `vp install` または `npm install`
- `npm run dev`
- `npm run check`

## ビルド

- 全体ビルド: `npm run build`
- 単一アプリ: `npm run build:app -- excelToJson`
- ルート単体確認: `npm exec vp -- build`
- 配布用の単一HTMLは build 時に整形する

## 配置ルール

- 各アプリは `app/{appName}` 配下に置く
- ビルド後の出力先は `dist/app/{appName}/index.html`
- ルート導線は `dist/index.html`

## app 構成の指針

- まずは `_template` と同じく `app/{appName}` 直下に `index.html`, `style.css`, `main.tsx` を置く
- 基本方針は CDN の React を使った readable-inline 構成とし、ソースは分割のまま配布時に単一HTMLへまとめる
- 1ファイルが長くなってから、必要な分だけ `src/` や `style/` へ分割する
- readable-inline は `index.html` の相対参照をそのまま解決するので、参照先は直下でもサブディレクトリでもよい
- readable-inline でも `text/babel` + `data-presets="typescript,react"` を使えば `main.tsx` を分割ソースのまま扱える

### 最小構成

```text
app/
  myApp/
    index.html
    main.tsx
    style.css
```

### 分割構成の例

```text
app/
  myApp/
    index.html
    src/
      main.ts
      copy.ts
    style/
      style.css
```

### React テンプレート構成

```text
app/
  myReactApp/
    index.html
    main.tsx
    style.css
```

### テンプレートの使い方

- 迷ったら `_template` を複製して始める
- `_template` は CDN の React + Babel と readable-inline を前提にした 3 ファイル構成
- React が不要とはっきり言える小さな画面では、readable-inline のまま `main.ts` だけで組んでもよい
- import 分割や依存追加が増え、readable-inline では窮屈になってから Vite + React へ上げる

## 方式の選び方

| 方式            | 向いているケース                                                                                                | 配布形態                       | サンプル                                        |
| --------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------ | ----------------------------------------------- |
| readable-inline | まず迷わず始める標準構成。CDN の React を使う 3 ファイル構成でも、React を使わない軽量な `main.ts` 構成でもよい | 外部参照を残した単一HTMLを配布 | `app/excelToJson`, `app/sampleVanillaChecklist` |
| Vite + React    | import 分割や依存追加が増え、readable-inline では管理しづらくなった                                             | バンドル済みの単一HTMLを配布   | `app/sampleReactChecklist`                      |

- どの方式でも、配布用の単一HTMLは build 後に整形する
- 実運用の判断は「readable-inline で始める」か「Vite + React に上げる」かの 2 択で考える
- React が不要な小さな画面は、readable-inline 側で `main.ts` を使う軽量版として扱う

### Vite + React でのスタイル選択

- まず速く画面を増やしたいなら TailwindCSS を使う
- AI との対話で似た業務UIを継続的に量産し、見た目の揺れを抑えたいなら PandaCSS を検討する
- PandaCSS を選ぶのは、色・余白・角丸・タイポをデザイントークンで固定し、recipe ベースで部品を増やしていく時だけでよい
- 単発の小さい app や、readable-inline 側の軽量画面では TailwindCSS や PandaCSS を無理に持ち込まず、素の CSS を優先する

### PandaCSS を選ぶ時の最小設計

- まず固定するのは `colors`, `spacing`, `radii`, `fontSizes`, `shadows` の 5 系統で十分
- 業務UIでは、`surface`, `surfaceMuted`, `text`, `textMuted`, `accent`, `danger`, `border` のような用途名でトークンを切る
- recipe は `button`, `input`, `filterChip`, `panel`, `taskRow` くらいの小さい単位から始める
- バリエーションは `tone`, `size`, `state` に寄せ、1 コンポーネントに責務を詰め込みすぎない
- AI に UI を足させる時は、自由に色や余白を書かせず、既存トークンと recipe の組み合わせだけで表現させる

### 比較サンプル

- [app/sampleReactChecklist](app/sampleReactChecklist) は TailwindCSS をそのまま JSX に書く版
- [app/sampleReactChecklistDesignSystem](app/sampleReactChecklistDesignSystem) は PandaCSS の token と recipe を実際に使う版
- 後者のように見た目の語彙を config 側へ寄せておくと、AI での増築でも UI をそろえやすい

### 共有コンポーネント (`panda/components/`)

PandaCSS を使う app では、recipe を直接呼ぶ代わりに `panda/components/` の薄い React ラッパーを使う。

```tsx
import { Button, Chip, Panel, TaskRow, TextInput } from "../../panda/components";

<Panel>...</Panel>
<Button visual="accent">送信</Button>
<TextInput placeholder="入力" />
<Chip active={isActive}>ラベル</Chip>
<TaskRow done={task.done}>...</TaskRow>
```

- AI が新しい app や画面を作る時も、`className={recipe()}` ではなくコンポーネントを使わせることで命名揺れを防ぐ
- `Panel` は `as` prop で要素を変えられる（デフォルトは `section`）
- recipe のバリエーションはそのまま props で渡す（`visual`, `size`, `active`, `done` など）
- 追加の `className` は props 経由で合成される

## 制約

- 配布物はブラウザで直接開ける単一HTMLを前提とする
- 標準では外部 CDN や実行時 fetch に依存しないが、app 要件に応じて明示的に使ってよい
- TypeScript は `6.x.x` 以上を利用想定

## Vite+ メモ

- `vp dev` と `vp preview` を package.json scripts から使う
- `npm run build` と `npm run build:app` は内部的に `vp build` を呼ぶ
- ルートと app ごとの切り替えは `APP_NAME` 環境変数で行う
- Vite 設定は `vite-plus` の `defineConfig` を使う
- build スクリプトは `process.execPath` と `node_modules/vite-plus/bin/vp` を使う

## readable-inline モード

- `build-mode=readable-inline` メタタグがある app は、`index.html` から参照したローカルの `style.css` と `main.ts` / `main.tsx` を単一HTMLへインライン化する
- 参照先は app 直下でもサブディレクトリでもよい
- 外部 CDN や Google Fonts などの外部参照はそのまま残し、ローカル参照だけをインライン化する
- 可読な配布HTMLを優先したい app に使う

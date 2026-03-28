# casual_apps Copilot Instructions

- このワークスペースの app 実装は、まず readable-inline を検討し、import 分割や依存追加が増えた時だけ Vite + React を選ぶ。
- readable-inline の小さい app では、TailwindCSS や PandaCSS を持ち込まず、素の CSS を優先する。
- Vite + React で短期間に画面を増やす時は TailwindCSS を使ってよい。
- Vite + React で似た業務UIを継続的に増やす時は、PandaCSS もしくは PandaCSS を想定したトークン設計を優先する。
- デザインの共通化が目的なら、色・余白・角丸・文字サイズ・影をデザイントークンとして固定し、値を各コンポーネントへ直接書き散らさない。
- 新しい UI を追加する時は、既存のトークン名や部品語彙を再利用し、自由な命名や場当たり的な値の追加を避ける。
- AI に UI 実装を依頼する時は、まず既存の token と recipe 相当の語彙を探し、見つからない時だけ最小限の追加を行う。
- フォーム、ボタン、カード、フィルター、一覧行のような繰り返し要素は、共通クラスまたは共通コンポーネントに寄せる。
- PandaCSS を使う app では、recipe を直接呼ばず `panda/components/` の共有コンポーネント（Button, TextInput, Chip, Panel, TaskRow）を使う。
- 単一HTML配布前提を壊さないこと。新しい依存や実行時 fetch が必要なら、その理由を明示する。

import { useEffect, useMemo, useRef, useState } from "react";
import { css, cx } from "../../styled-system/css";

const EXCEL_GREEN = "#107C41";
const REQUIRE_ALL_HEADER_COLUMNS = true;

const USAGE_STEPS = [
  "Excelのセル範囲をコピー、CSV/TSVファイルを「CSV/TSV読込」で選択、または直接入力",
  "左側のテキストエリアに貼り付け（Ctrl+V）、またはファイルから自動入力",
  "区切り文字（タブ/カンマ）を切り替えて正しく認識されているか確認",
  "自動的にJSON形式（システム間でデータを受け渡すための書式）に変換されます",
  "「コピー」ボタンでJSONをコピー",
  "出力形式（コンパクト/整形）はお好みで切り替え",
];

/* ---------- styles ---------- */

const pageStyle = css({
  minH: "100vh",
  p: "6",
  transition: "colors",
  bg: "#fafafa",
  _dark: { bg: "#1a1a1a" },
});

const containerStyle = css({ mx: "auto", maxW: "7xl" });

const headerBarStyle = css({
  mb: "4",
  borderRadius: "lg",
  borderWidth: "1px",
  borderColor: "gray.200",
  p: "5",
  shadow: "sm",
  transition: "colors",
  bg: "white",
  _dark: { borderColor: "gray.700", bg: "#2b2b2b" },
});

const headerFlexStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "4",
});

const logoBoxStyle = css({ display: "flex", alignItems: "center", gap: "3" });

const logoIconStyle = css({
  display: "flex",
  h: "10",
  w: "10",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "lg",
  bg: EXCEL_GREEN,
});

const titleStyle = css({
  fontSize: "lg",
  fontWeight: "semibold",
  color: "gray.900",
  _dark: { color: "gray.100" },
});

const subtitleStyle = css({
  mt: "0.5",
  fontSize: "xs",
  color: "gray.500",
  _dark: { color: "gray.400" },
});

const iconBtnStyle = css({
  display: "flex",
  h: "8",
  w: "8",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "md",
  transition: "colors",
  cursor: "pointer",
  color: "gray.600",
  _hover: { bg: "gray.100", color: "gray.900" },
  _dark: { color: "gray.400", _hover: { bg: "gray.700", color: "gray.100" } },
});

const iconTextStyle = css({
  color: "inherit",
});

const mainCardStyle = css({
  borderRadius: "lg",
  overflow: "hidden",
  borderWidth: "1px",
  borderColor: "gray.200",
  shadow: "sm",
  transition: "colors",
  bg: "white",
  _dark: { borderColor: "gray.700", bg: "#2b2b2b" },
});

const gridBaseStyle = css({
  display: "grid",
  transition: "all",
  transitionDuration: "300ms",
});

const gridInputActive = css({ md: { gridTemplateColumns: "2fr 1fr" } });
const gridOutputActive = css({ md: { gridTemplateColumns: "1fr 2fr" } });

const sectionHeaderStyle = css({
  mb: "3",
  pb: "3",
  minH: "9",
  borderBottomWidth: "1px",
  borderColor: "gray.200",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "3",
  _dark: { borderColor: "gray.700" },
});

const inputSectionStyle = css({ p: "6" });

const outputSectionStyle = css({
  p: "6",
  transition: "colors",
});

const labelStyle = css({
  fontSize: "sm",
  fontWeight: "semibold",
  color: "gray.900",
  _dark: { color: "gray.100" },
});

const stepBadgeStyle = css({
  display: "flex",
  h: "6",
  w: "6",
  minW: "6",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "md",
  bg: EXCEL_GREEN,
  fontSize: "xs",
  fontWeight: "bold",
  color: "white",
});

const clearBtnStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "1.5",
  borderRadius: "md",
  px: "3",
  py: "1",
  fontSize: "xs",
  fontWeight: "medium",
  transition: "colors",
  cursor: "pointer",
  bg: "gray.200",
  color: "gray.700",
  _hover: { bg: "gray.300", color: "gray.900" },
  _dark: { bg: "gray.600", color: "gray.300", _hover: { bg: "gray.500", color: "gray.100" } },
});

const editorBoxStyle = css({
  display: "flex",
  w: "full",
  overflow: "hidden",
  borderWidth: "1px",
  borderRadius: "md",
  transition: "colors",
  h: "64",
  borderColor: "gray.300",
  bg: "white",
  _focusWithin: { borderColor: EXCEL_GREEN, shadow: "0 0 0 2px rgba(16,124,65,0.15)" },
  _dark: { borderColor: "gray.600", bg: "#1e1e1e" },
});

const lineGutterStyle = css({
  w: "10",
  lineHeight: "24px",
  overflow: "hidden",
  borderRightWidth: "1px",
  py: "3",
  px: "2",
  textAlign: "right",
  fontFamily: "mono",
  fontSize: "2xs",
  userSelect: "none",
  borderColor: "gray.200",
  bg: "gray.50",
  color: "gray.400",
  _dark: { borderColor: "gray.700", bg: "#252525", color: "gray.500" },
});

const lineActiveStyle = css({
  color: "gray.600",
  fontWeight: "medium",
  _dark: { color: "gray.300" },
});

const textareaStyle = css({
  h: "full",
  flex: "1",
  resize: "none",
  bg: "transparent",
  p: "3",
  fontFamily: "mono",
  fontSize: "sm",
  lineHeight: "24px",
  outline: "none",
  color: "gray.900",
  _placeholder: { color: "gray.400" },
  _dark: { color: "gray.100", _placeholder: { color: "gray.500" } },
});

const noticeRowStyle = css({
  mt: "3",
  display: "flex",
  alignItems: "center",
  gap: "2",
  px: "3",
  py: "2",
  borderRadius: "md",
});

const noticeIconStyle = css({
  fontSize: "md",
  lineHeight: "1",
  alignSelf: "center",
  flexShrink: 0,
});

const noticeTextStyle = css({ fontSize: "xs", fontWeight: "medium" });

const copyBtnStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "1.5",
  borderRadius: "md",
  px: "3",
  py: "1",
  fontSize: "xs",
  fontWeight: "medium",
  transition: "colors",
  cursor: "pointer",
  bg: EXCEL_GREEN,
  color: "white",
  _hover: { opacity: 0.9 },
});

const copyBtnDisabledStyle = css({ cursor: "not-allowed", opacity: 0.4 });

const toggleGroupStyle = css({
  display: "inline-flex",
  borderRadius: "md",
  overflow: "hidden",
  fontSize: "xs",
  fontWeight: "medium",
  bg: "gray.100",
  _dark: { bg: "gray.700" },
});

const toggleBtnBase = css({
  px: "3",
  py: "1",
  cursor: "pointer",
  transition: "colors",
  userSelect: "none",
  borderRadius: "md",
  color: "gray.500",
  _dark: { color: "gray.400" },
});

const toggleBtnActive = css({
  bg: EXCEL_GREEN,
  color: "white",
  shadow: "sm",
  _dark: { color: "white" },
});

const controlRowStyle = css({
  mb: "2",
  display: "flex",
  alignItems: "center",
  gap: "3",
  flexWrap: "wrap",
  minH: "7",
});

const popoverStyle = css({
  w: "full",
  maxW: "3xl",
  borderRadius: "lg",
  border: "1px solid",
  borderColor: "gray.200",
  p: "6",
  shadow: "lg",
  transition: "colors",
  bg: "white",
  _dark: { bg: "#2b2b2b", borderColor: "gray.700" },
});

const popoverGridStyle = css({
  display: "grid",
  gap: "4",
  fontSize: "sm",
  color: "gray.700",
  _dark: { color: "gray.300" },
  md: { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" },
});

const stepCardStyle = css({
  display: "flex",
  alignItems: "flex-start",
  gap: "3",
  borderRadius: "md",
  p: "3",
  bg: "gray.50",
  _dark: { bg: "rgba(255,255,255,0.05)" },
});

const dividerStyle = css({
  "& > * + *": { borderLeftWidth: "1px", borderColor: "gray.100" },
  _dark: { "& > * + *": { borderColor: "gray.700" } },
});

/* ---------- helpers ---------- */

const normalizeLineBreaks = (text: string) => text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

const createLineNumbers = (text: string) => {
  const n = normalizeLineBreaks(text);
  const count = n === "" ? 1 : n.split("\n").length;
  return Array.from({ length: count }, (_, i) => i + 1);
};

const getCaretLineNumber = (text: string, caretIndex: number | null) => {
  const n = normalizeLineBreaks(text);
  const safe = Number.isFinite(caretIndex) ? Math.max(0, Math.min(caretIndex ?? 0, n.length)) : 0;
  return n.slice(0, safe).split("\n").length;
};

const formatJson = (rows: Array<Record<string, string>>, fmt: string) =>
  fmt === "pretty" ? JSON.stringify(rows, null, 2) : JSON.stringify(rows);

/* ---------- TSV parser ---------- */

const parseTsvRows = (rawText: string, delimiter: string = "\t") => {
  const text = normalizeLineBreaks(rawText);
  const rows: string[][] = [];
  let row: string[] = [];
  let val = "";
  let inQ = false;

  const pushVal = () => {
    row.push(val);
    val = "";
  };
  const pushRow = () => {
    pushVal();
    rows.push(row);
    row = [];
  };

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          val += '"';
          i++;
        } else {
          inQ = false;
        }
      } else {
        val += c;
      }
      continue;
    }
    if (c === '"') {
      if (val.trim() === "") {
        val = "";
        inQ = true;
      } else {
        val += c;
      }
      continue;
    }
    if (c === delimiter) {
      pushVal();
      continue;
    }
    if (c === "\n") {
      pushRow();
      continue;
    }
    val += c;
  }
  if (inQ) return { rows: [] as string[][], error: "引用符が閉じられていません" };
  if (val !== "" || row.length > 0) pushRow();
  return { rows, error: "" };
};

const validateTable = (rows: string[][]) => {
  const norm = rows
    .map((r) => r.map((v) => v.trimEnd()))
    .filter((r) => r.some((v) => v.trim() !== ""));

  if (norm.length < 2)
    return {
      headers: [] as string[],
      dataRows: [] as string[][],
      error: "最低2行(ヘッダー+データ)が必要です",
    };

  const headers = norm[0].map((h) => h.trim());
  if (headers.every((h) => h === ""))
    return { headers: [], dataRows: [] as string[][], error: "ヘッダーが見つかりません" };
  if (headers.some((h) => h === ""))
    return { headers: [], dataRows: [] as string[][], error: "空のヘッダー名があります" };

  const dupes = headers.filter((h, i) => headers.indexOf(h) !== i);
  if (dupes.length > 0)
    return {
      headers: [],
      dataRows: [] as string[][],
      error: `ヘッダー名が重複しています: ${[...new Set(dupes)].join(", ")}`,
    };

  const data = norm.slice(1);
  const over = data.findIndex((r) => r.length > headers.length);
  if (over !== -1)
    return {
      headers: [],
      dataRows: [] as string[][],
      error: `${over + 2}行目の列数がヘッダーより多いです`,
    };

  if (REQUIRE_ALL_HEADER_COLUMNS) {
    const under = data.findIndex((r) => r.length < headers.length);
    if (under !== -1)
      return {
        headers: [],
        dataRows: [] as string[][],
        error: `${under + 2}行目で値が不足しています: ${headers.slice(data[under].length).join(", ")}`,
      };
  }

  const emptyIdx = data.findIndex((r) => headers.some((_, ci) => (r[ci] ?? "").trim() === ""));
  if (emptyIdx !== -1) {
    const names = headers.filter((_, ci) => (data[emptyIdx][ci] ?? "").trim() === "");
    return {
      headers: [],
      dataRows: [] as string[][],
      error: `${emptyIdx + 2}行目で値が空です: ${names.join(", ")}`,
    };
  }

  return { headers, dataRows: data, error: "" };
};

const parseExcelText = (rawText: string, delimiter: string = "\t") => {
  try {
    if (!rawText.trim()) return { rows: [] as Record<string, string>[], error: "" };
    const parsed = parseTsvRows(rawText, delimiter);
    if (parsed.error) return { rows: [], error: parsed.error };
    const v = validateTable(parsed.rows);
    if (v.error) return { rows: [], error: v.error };
    const rows = v.dataRows.map((r) =>
      v.headers.reduce<Record<string, string>>((o, h, i) => {
        o[h] = (r[i] ?? "").trim();
        return o;
      }, {}),
    );
    return { rows, error: "" };
  } catch {
    return { rows: [], error: "変換中にエラーが発生しました" };
  }
};

const copyToClipboard = async (text: string) => {
  if (!text) throw new Error("コピー対象がありません");
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.top = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(ta);
  if (!ok) throw new Error("コピーに失敗しました");
};

/* ---------- sub-components ---------- */

type NoticeProps = {
  icon: string;
  message: string;
  containerClass: string;
  iconClass: string;
  textClass: string;
  role?: "alert" | "status";
  ariaLive?: "assertive" | "polite";
};

const NoticeRow = ({
  icon,
  message,
  containerClass,
  iconClass,
  textClass,
  role,
  ariaLive,
}: NoticeProps) => {
  if (!message) return null;
  return (
    <div className={cx(noticeRowStyle, containerClass)} role={role} aria-live={ariaLive}>
      <span className={cx("material-symbols-outlined", noticeIconStyle, iconClass)}>{icon}</span>
      <p className={cx(noticeTextStyle, textClass)}>{message}</p>
    </div>
  );
};

/* ---------- main component ---------- */

export const App = () => {
  const [inputText, setInputText] = useState("");
  const [formatType, setFormatType] = useState("compact");
  const [delimiter, setDelimiter] = useState<"\t" | ",">("\t");
  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    try {
      return (localStorage.getItem("etj-theme") as "light" | "dark" | "system") ?? "system";
    } catch {
      return "system";
    }
  });
  const [activeArea, setActiveArea] = useState("input");
  const [inputActiveLine, setInputActiveLine] = useState(1);
  const [outputActiveLine, setOutputActiveLine] = useState(1);
  const [copyMessage, setCopyMessage] = useState("");

  const outputRef = useRef<HTMLTextAreaElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputGutterRef = useRef<HTMLPreElement | null>(null);
  const outputGutterRef = useRef<HTMLPreElement | null>(null);

  const parseResult = useMemo(() => parseExcelText(inputText, delimiter), [inputText, delimiter]);
  const outputText = useMemo(
    () => (parseResult.rows.length === 0 ? "" : formatJson(parseResult.rows, formatType)),
    [parseResult.rows, formatType],
  );
  const hasOutput = outputText.length > 0;

  const inputLines = useMemo(() => createLineNumbers(inputText), [inputText]);
  const outputLines = useMemo(() => createLineNumbers(outputText), [outputText]);
  const visInputLine = Math.min(inputActiveLine, inputLines.length);
  const visOutputLine = Math.min(outputActiveLine, outputLines.length);

  const cycleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : prev === "dark" ? "system" : "light";
      try {
        localStorage.setItem("etj-theme", next);
      } catch {
        /* noop */
      }
      return next;
    });
  };

  // sync .dark class with resolved darkMode
  useEffect(() => {
    const apply = () =>
      document.documentElement.classList.toggle(
        "dark",
        theme === "dark" ||
          (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches),
      );
    apply();
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  const syncScroll = (ta: HTMLTextAreaElement | null, gutter: HTMLPreElement | null) => {
    if (ta && gutter) gutter.scrollTop = ta.scrollTop;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    setInputActiveLine(getCaretLineNumber(e.target.value, e.target.selectionStart));
    setCopyMessage("");
  };

  const handleCaret =
    (setter: (n: number) => void, text: string) => (e: React.SyntheticEvent<HTMLTextAreaElement>) =>
      setter(getCaretLineNumber(text, e.currentTarget.selectionStart));

  const handleOutputClick = () => {
    if (!outputRef.current) return;
    setOutputActiveLine(getCaretLineNumber(outputText, outputRef.current.selectionStart));
  };

  const handleClear = () => {
    setInputText("");
    setInputActiveLine(1);
    setOutputActiveLine(1);
    setCopyMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    inputRef.current?.focus();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      setInputText(text);
      setCopyMessage("");
      setInputActiveLine(1);
      if (file.name.endsWith(".csv")) setDelimiter(",");
      else setDelimiter("\t");
    };
    reader.readAsText(file);
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard(outputText);
      setCopyMessage("JSONをコピーしました");
    } catch (error) {
      setCopyMessage(error instanceof Error ? error.message : "コピーに失敗しました");
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && hasOutput) {
      e.preventDefault();
      outputRef.current?.focus();
    }
  };

  /* -- line number gutter -- */
  const renderGutter = (
    lines: number[],
    activeLine: number,
    ref: React.RefObject<HTMLPreElement | null>,
    prefix: string,
  ) => (
    <pre ref={ref} aria-hidden="true" className={lineGutterStyle}>
      {lines.map((n) => (
        <div
          key={`${prefix}-${n}`}
          className={cx(css({ h: "6" }), n === activeLine && lineActiveStyle)}
        >
          {n}
        </div>
      ))}
    </pre>
  );

  return (
    <div>
      <div className={pageStyle}>
        <div className={containerStyle}>
          {/* header */}
          <div className={headerBarStyle}>
            <div className={headerFlexStyle}>
              <div className={logoBoxStyle}>
                <div className={logoIconStyle}>
                  <span
                    className={cx(
                      "material-symbols-outlined",
                      css({ fontSize: "3xl", color: "white" }),
                    )}
                  >
                    table_chart
                  </span>
                </div>
                <div>
                  <h1 className={titleStyle}>Excel → JSON 変換ツール</h1>
                  <p className={subtitleStyle}>表データを貼り付けるだけでJSONに変換</p>
                </div>
              </div>

              <div className={css({ display: "flex", alignItems: "center", gap: "2" })}>
                <button
                  popoverTarget="usage-popover"
                  popoverTargetAction="toggle"
                  className={iconBtnStyle}
                  title="使い方を表示"
                  aria-label="使い方を表示"
                >
                  <span className={cx("material-symbols-outlined", iconTextStyle)}>help</span>
                </button>
                <button
                  onClick={cycleTheme}
                  className={iconBtnStyle}
                  title={
                    theme === "light"
                      ? "ダークモードに切替"
                      : theme === "dark"
                        ? "システム設定に切替"
                        : "ライトモードに切替"
                  }
                  aria-label="テーマ切替"
                >
                  <span className={cx("material-symbols-outlined", iconTextStyle)}>
                    {theme === "light" ? "light_mode" : theme === "dark" ? "dark_mode" : "routine"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* main card */}
          <div className={mainCardStyle}>
            <div
              className={cx(
                gridBaseStyle,
                dividerStyle,
                activeArea === "input" ? gridInputActive : gridOutputActive,
              )}
            >
              {/* input section */}
              <section
                className={inputSectionStyle}
                onClick={() => setActiveArea("input")}
                aria-labelledby="input-label"
              >
                <div className={sectionHeaderStyle}>
                  <div className={css({ display: "flex", alignItems: "center", gap: "2" })}>
                    <div className={stepBadgeStyle}>1</div>
                    <label id="input-label" htmlFor="excel-input" className={labelStyle}>
                      データ入力
                    </label>
                  </div>
                  <button
                    onClick={handleClear}
                    disabled={!inputText}
                    className={cx(clearBtnStyle, !inputText && copyBtnDisabledStyle)}
                    title="入力をクリア"
                  >
                    <span
                      className={cx(
                        "material-symbols-outlined",
                        css({ fontSize: "sm", color: "inherit" }),
                      )}
                    >
                      close
                    </span>
                    クリア
                  </button>
                </div>

                <div className={controlRowStyle}>
                  <div className={css({ display: "flex", alignItems: "center", gap: "1.5" })}>
                    <span
                      className={css({
                        fontSize: "xs",
                        fontWeight: "medium",
                        color: "gray.500",
                        _dark: { color: "gray.400" },
                      })}
                    >
                      区切り文字
                    </span>
                    <div className={toggleGroupStyle}>
                      {(["\t", ","] as const).map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDelimiter(d)}
                          className={cx(toggleBtnBase, delimiter === d && toggleBtnActive)}
                        >
                          {d === "\t" ? "タブ" : "カンマ"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={clearBtnStyle}
                    title="CSV/TSVファイルを読み込む"
                  >
                    <span
                      className={cx(
                        "material-symbols-outlined",
                        css({ fontSize: "sm", color: "inherit" }),
                      )}
                    >
                      upload_file
                    </span>
                    CSV/TSV読込
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".tsv,.csv,.txt,.tab"
                    onChange={handleFileInput}
                    className={css({ display: "none" })}
                  />
                </div>

                <div className={editorBoxStyle}>
                  {renderGutter(inputLines, visInputLine, inputGutterRef, "in")}
                  <textarea
                    id="excel-input"
                    ref={inputRef}
                    value={inputText}
                    onChange={handleInputChange}
                    onScroll={(e) => syncScroll(e.currentTarget, inputGutterRef.current)}
                    onClick={handleCaret(setInputActiveLine, inputText)}
                    onKeyUp={handleCaret(setInputActiveLine, inputText)}
                    onKeyDown={handleInputKeyDown}
                    onSelect={handleCaret(setInputActiveLine, inputText)}
                    wrap="off"
                    aria-describedby="input-help input-error"
                    placeholder={
                      delimiter === "\t"
                        ? "houmen\tkeyword\tfreeword\n01\t知床半島\t知床\n02\tねぶた祭\tねぶた祭\n03\t草津温泉\t草津温泉"
                        : "houmen,keyword,freeword\n01,知床半島,知床\n02,ねぶた祭,ねぶた祭\n03,草津温泉,草津温泉"
                    }
                    className={textareaStyle}
                  />
                </div>

                <NoticeRow
                  icon="info"
                  message="タブ区切り・カンマ区切りどちらにも対応 / Ctrl+Enter で出力欄へ移動"
                  containerClass={css({ bg: "gray.50", _dark: { bg: "rgba(255,255,255,0.05)" } })}
                  iconClass={css({ color: EXCEL_GREEN })}
                  textClass={css({ color: "gray.500", _dark: { color: "gray.400" } })}
                />

                <div id="input-help" hidden>
                  Excelからコピーした表データ、またはCSVとTSVのテキストファイルを読み込める入力欄です
                </div>
                <div id="input-error">
                  <NoticeRow
                    icon="error"
                    message={parseResult.error}
                    containerClass={css({ bg: "red.50", _dark: { bg: "rgba(127, 29, 29, 0.15)" } })}
                    iconClass={css({ color: "red.500", _dark: { color: "red.400" } })}
                    textClass={css({ color: "red.600", _dark: { color: "red.300" } })}
                    role="alert"
                    ariaLive="assertive"
                  />
                </div>
              </section>

              {/* output section */}
              <section
                className={outputSectionStyle}
                onClick={() => setActiveArea("output")}
                aria-labelledby="output-label"
              >
                <div className={sectionHeaderStyle}>
                  <div className={css({ display: "flex", alignItems: "center", gap: "2" })}>
                    <div className={stepBadgeStyle}>2</div>
                    <label id="output-label" htmlFor="json-output" className={labelStyle}>
                      JSON出力
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={!hasOutput}
                    className={cx(copyBtnStyle, !hasOutput && copyBtnDisabledStyle)}
                    title="JSONをコピー"
                  >
                    <span
                      className={cx(
                        "material-symbols-outlined",
                        css({ fontSize: "sm", color: "inherit" }),
                      )}
                    >
                      content_copy
                    </span>
                    コピー
                  </button>
                </div>

                <div className={controlRowStyle}>
                  <div className={css({ display: "flex", alignItems: "center", gap: "1.5" })}>
                    <span
                      className={css({
                        fontSize: "xs",
                        fontWeight: "medium",
                        color: "gray.500",
                        _dark: { color: "gray.400" },
                      })}
                    >
                      出力形式
                    </span>
                    <div className={toggleGroupStyle}>
                      {(["compact", "pretty"] as const).map((fmt) => (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => setFormatType(fmt)}
                          className={cx(toggleBtnBase, formatType === fmt && toggleBtnActive)}
                        >
                          {fmt === "compact" ? "コンパクト" : "整形"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={editorBoxStyle}>
                  {renderGutter(outputLines, visOutputLine, outputGutterRef, "out")}
                  <textarea
                    id="json-output"
                    ref={outputRef}
                    value={outputText}
                    readOnly
                    onClick={handleOutputClick}
                    onScroll={(e) => syncScroll(e.currentTarget, outputGutterRef.current)}
                    onKeyUp={handleCaret(setOutputActiveLine, outputText)}
                    onSelect={handleCaret(setOutputActiveLine, outputText)}
                    wrap="off"
                    aria-describedby="output-help copy-status"
                    placeholder="変換されたJSONがここに表示されます"
                    className={textareaStyle}
                  />
                </div>

                <NoticeRow
                  icon={copyMessage === "JSONをコピーしました" ? "task_alt" : "info"}
                  message={copyMessage}
                  containerClass={css({ bg: "gray.50", _dark: { bg: "rgba(255,255,255,0.05)" } })}
                  iconClass={css({
                    color: copyMessage === "JSONをコピーしました" ? EXCEL_GREEN : "gray.400",
                    _dark: {
                      color: copyMessage === "JSONをコピーしました" ? EXCEL_GREEN : "gray.500",
                    },
                  })}
                  textClass={css({ color: "gray.500", _dark: { color: "gray.400" } })}
                  role="status"
                  ariaLive="polite"
                />

                <div id="output-help" hidden>
                  変換されたJSONの出力欄です
                </div>
                <div id="copy-status" hidden>
                  コピー結果が通知されます
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* usage popover */}
      <div
        id="usage-popover"
        popover="auto"
        role="dialog"
        aria-modal="true"
        aria-label="使い方"
        className={cx("usage-popover", popoverStyle)}
      >
        <div
          className={css({
            mb: "4",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          })}
        >
          <h2
            className={css({
              display: "flex",
              alignItems: "center",
              gap: "2",
              fontSize: "md",
              fontWeight: "semibold",
              color: "gray.900",
              _dark: { color: "gray.100" },
            })}
          >
            <span className={cx("material-symbols-outlined", css({ color: EXCEL_GREEN }))}>
              help
            </span>
            使い方
          </h2>
          <button
            popoverTarget="usage-popover"
            popoverTargetAction="hide"
            className={iconBtnStyle}
            title="閉じる"
            aria-label="使い方を閉じる"
          >
            <span className={cx("material-symbols-outlined", iconTextStyle)}>close</span>
          </button>
        </div>

        <div className={popoverGridStyle}>
          {USAGE_STEPS.map((text, i) => (
            <div key={i} className={stepCardStyle}>
              <span className={stepBadgeStyle}>{i + 1}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import fs from "node:fs/promises";
import prettier from "prettier";

const PRETTIER_OPTIONS = {
  parser: "html",
  htmlWhitespaceSensitivity: "ignore",
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
};

export async function formatHtmlSource(source) {
  return prettier.format(source, PRETTIER_OPTIONS);
}

export async function formatHtmlFile(filePath) {
  const source = await fs.readFile(filePath, "utf8");
  const formatted = await formatHtmlSource(source);
  await fs.writeFile(filePath, formatted, "utf8");
}

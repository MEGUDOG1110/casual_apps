import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { formatHtmlSource } from "./format-generated-html.mjs";

const BUILD_MODE_MARKER = '<meta name="build-mode" content="readable-inline" />';

function isExternalAssetPath(assetPath) {
  return /^(?:[a-z]+:)?\/\//i.test(assetPath) || assetPath.startsWith("data:");
}

function getScriptType(attributes) {
  return attributes.match(/type="([^"]+)"/)?.[1] ?? "";
}

function getTsJsxMode(attributes, filePath) {
  const lowerPath = filePath.toLowerCase();
  const hasTsPreset = /data-presets="[^"]*typescript[^"]*"/.test(attributes);

  if (lowerPath.endsWith(".tsx") || hasTsPreset) {
    return ts.JsxEmit.Preserve;
  }

  if (lowerPath.endsWith(".ts")) {
    return ts.JsxEmit.None;
  }

  return null;
}

function transpileScriptSource(source, filePath) {
  return ts
    .transpileModule(source, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ES2022,
        jsx: ts.JsxEmit.React,
        newLine: ts.NewLineKind.LineFeed,
        removeComments: false,
        strict: true,
      },
      fileName: filePath,
    })
    .outputText.trim();
}

function transpileInlineScriptSource(source, filePath, attributes) {
  const jsxMode = getTsJsxMode(attributes, filePath);

  if (jsxMode === null) {
    return source.trim();
  }

  return ts
    .transpileModule(source, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.None,
        jsx: jsxMode,
        newLine: ts.NewLineKind.LineFeed,
        removeComments: false,
        strict: true,
      },
      fileName: filePath,
    })
    .outputText.trim();
}

function inlineLocalStylesheets(html, appDir) {
  return html.replace(
    /<link\s+([^>]*?)rel="stylesheet"([^>]*?)href="([^"]+)"([^>]*?)\/?>(?:<\/link>)?/g,
    (fullMatch, beforeRel, beforeHref, href) => {
      if (isExternalAssetPath(href)) {
        return fullMatch;
      }

      const cssPath = path.resolve(appDir, href);
      const css = fs.readFileSync(cssPath, "utf8");
      return `<style>\n${css}\n</style>`;
    },
  );
}

function inlineLocalScripts(html, appDir) {
  return html.replace(
    /<script([^>]*?)src="([^"]+)"([^>]*)><\/script>/g,
    (fullMatch, beforeSrc, src, afterSrc) => {
      if (isExternalAssetPath(src)) {
        return fullMatch;
      }

      const scriptPath = path.resolve(appDir, src);
      const source = fs.readFileSync(scriptPath, "utf8");
      const rawAttributes = `${beforeSrc} ${afterSrc}`.replace(/\s+/g, " ").trim();
      const type = getScriptType(rawAttributes);
      const scriptBody =
        type === "module"
          ? transpileScriptSource(source, scriptPath)
          : transpileInlineScriptSource(source, scriptPath, rawAttributes);
      const attributeBlock = rawAttributes ? ` ${rawAttributes}` : "";

      return `<script${attributeBlock}>\n${scriptBody}\n</script>`;
    },
  );
}

function getAppDir(rootDir, appName) {
  return path.resolve(rootDir, "app", appName);
}

export function isReadableInlineApp(rootDir, appName) {
  const htmlPath = path.resolve(getAppDir(rootDir, appName), "index.html");

  if (!fs.existsSync(htmlPath)) {
    return false;
  }

  const html = fs.readFileSync(htmlPath, "utf8");
  return html.includes(BUILD_MODE_MARKER);
}

export async function buildReadableInlineApp(rootDir, appName) {
  const appDir = getAppDir(rootDir, appName);
  const htmlPath = path.resolve(appDir, "index.html");
  const outDir = path.resolve(rootDir, "dist", "app", appName);
  const outFile = path.resolve(outDir, "index.html");

  const html = fs.readFileSync(htmlPath, "utf8");
  const finalHtml = inlineLocalScripts(inlineLocalStylesheets(html, appDir), appDir);

  const formattedHtml = await formatHtmlSource(finalHtml);

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, formattedHtml, "utf8");
}

import { spawnSync } from "node:child_process";
import path from "node:path";
import { formatHtmlFile } from "./format-generated-html.mjs";

function getBuiltHtmlPath(rootDir, env) {
  const appName = env.APP_NAME;

  return appName
    ? path.resolve(rootDir, "dist", "app", appName, "index.html")
    : path.resolve(rootDir, "dist", "index.html");
}

export async function runVpBuild(rootDir, env) {
  const vpCliPath = path.resolve(rootDir, "node_modules", "vite-plus", "bin", "vp");
  const result = spawnSync(process.execPath, [vpCliPath, "build"], {
    cwd: rootDir,
    env,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  await formatHtmlFile(getBuiltHtmlPath(rootDir, env));
}

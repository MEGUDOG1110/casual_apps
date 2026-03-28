import { buildReadableInlineApp, isReadableInlineApp } from "./build-readable-html-app.mjs";
import { runVpBuild } from "./run-vp-build.mjs";

export async function buildAppTarget(rootDir, appName) {
  if (appName && isReadableInlineApp(rootDir, appName)) {
    await buildReadableInlineApp(rootDir, appName);
    return;
  }

  const env = { ...process.env };

  if (appName) {
    env.APP_NAME = appName;
  } else {
    delete env.APP_NAME;
  }

  await runVpBuild(rootDir, env);
}

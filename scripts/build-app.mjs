import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildAppTarget } from "./build-app-target.mjs";

const appName = process.argv[2];
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

if (!appName) {
  console.error("Usage: npm run build:app -- <appName>");
  process.exit(1);
}

await buildAppTarget(rootDir, appName);

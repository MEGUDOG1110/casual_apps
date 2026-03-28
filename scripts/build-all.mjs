import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildAppTarget } from "./build-app-target.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.resolve(rootDir, "app");

await buildAppTarget(rootDir);

if (fs.existsSync(appDir)) {
  const appNames = fs
    .readdirSync(appDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => entry.name)
    .sort();

  for (const appName of appNames) {
    await buildAppTarget(rootDir, appName);
  }
}

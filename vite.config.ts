import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(rootDir, "app");

function getConfigRoot() {
  const requestedAppName = process.env.APP_NAME;
  return requestedAppName ? path.resolve(appDir, requestedAppName) : rootDir;
}

function getBuildInput() {
  const requestedAppName = process.env.APP_NAME;

  if (!requestedAppName) {
    return path.resolve(rootDir, "index.html");
  }

  const requestedEntry = path.resolve(appDir, requestedAppName, "index.html");
  if (!fs.existsSync(requestedEntry)) {
    throw new Error(`Unknown app: ${requestedAppName}`);
  }

  return requestedEntry;
}

function getOutDir() {
  const requestedAppName = process.env.APP_NAME;
  return requestedAppName
    ? path.resolve(rootDir, "dist", "app", requestedAppName)
    : path.resolve(rootDir, "dist");
}

export default defineConfig({
  root: getConfigRoot(),
  base: "./",
  resolve: {
    alias: {
      "react": "preact/compat",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
  plugins: [react(), tailwindcss(), viteSingleFile({ useRecommendedBuildConfig: false })],
  build: {
    target: "es2022",
    outDir: getOutDir(),
    emptyOutDir: process.env.APP_NAME ? false : true,
    assetsDir: "",
    cssCodeSplit: false,
    chunkSizeWarningLimit: 100000000,
    assetsInlineLimit: () => true,
    rollupOptions: {
      input: getBuildInput(),
    },
  },
});

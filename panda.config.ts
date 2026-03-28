import { defineConfig } from "@pandacss/dev";
import { buttonRecipe } from "./panda/recipes/button.recipe";
import { chipRecipe } from "./panda/recipes/chip.recipe";
import { inputRecipe } from "./panda/recipes/input.recipe";
import { panelRecipe } from "./panda/recipes/panel.recipe";
import { taskRowRecipe } from "./panda/recipes/task-row.recipe";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  exclude: ["./dist/**/*", "./styled-system/**/*", "./node_modules/**/*"],
  jsxFramework: "react",
  outdir: "styled-system",
  conditions: {
    extend: {
      dark: ".dark &",
    },
  },
  globalCss: {
    html: {
      minHeight: "100%",
    },
    body: {
      minHeight: "100vh",
      margin: 0,
    },
  },
  theme: {
    extend: {
      tokens: {
        radii: {
          panel: { value: "24px" },
          control: { value: "18px" },
          pill: { value: "999px" },
        },
        fontSizes: {
          body: { value: "15px" },
          title: { value: "clamp(2rem, 2.4vw, 2.8rem)" },
        },
        shadows: {
          panel: { value: "0 24px 60px rgba(24, 38, 56, 0.08)" },
        },
      },
      semanticTokens: {
        colors: {
          pageStart: { value: "#f6f8fc" },
          pageEnd: { value: "#e9edf6" },
          surface: { value: "rgba(255, 255, 255, 0.94)" },
          surfaceMuted: { value: "#f5f7fb" },
          text: { value: "#1a2433" },
          textMuted: { value: "#5f6b7a" },
          accent: { value: "#0f6d8c" },
          accentSoft: { value: "#e8f6fb" },
          danger: { value: "#ad2e48" },
          border: { value: "#d7dfeb" },
        },
      },
      recipes: {
        button: buttonRecipe,
        chip: chipRecipe,
        input: inputRecipe,
        panel: panelRecipe,
        taskRow: taskRowRecipe,
      },
    },
  },
});

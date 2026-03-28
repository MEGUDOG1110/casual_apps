import { defineRecipe } from "@pandacss/dev";

export const taskRowRecipe = defineRecipe({
  className: "taskRow",
  description: "一覧行のコンテナ。done で完了状態の見た目を切り替える。",
  base: {
    listStyle: "none",
    borderWidth: "1px",
    borderColor: "border",
    borderRadius: "control",
    padding: "4",
    backgroundColor: "white",
  },
  variants: {
    done: {
      true: {
        backgroundColor: "surfaceMuted",
      },
      false: {},
    },
  },
  defaultVariants: {
    done: false,
  },
});

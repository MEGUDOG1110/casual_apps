import { defineRecipe } from "@pandacss/dev";

export const inputRecipe = defineRecipe({
  className: "input",
  description: "テキスト入力欄の共通スタイル。",
  base: {
    width: "100%",
    minWidth: 0,
    borderWidth: "1px",
    borderColor: "border",
    borderRadius: "control",
    backgroundColor: "surfaceMuted",
    color: "text",
    paddingInline: "4",
    paddingBlock: "3.5",
  },
});

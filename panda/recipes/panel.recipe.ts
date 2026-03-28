import { defineRecipe } from "@pandacss/dev";

export const panelRecipe = defineRecipe({
  className: "panel",
  description: "カード・セクション用のパネル。tone で背景トーンを変える。",
  base: {
    borderWidth: "1px",
    borderColor: "border",
    borderRadius: "panel",
    backgroundColor: "surface",
    boxShadow: "panel",
    padding: "6",
  },
  variants: {
    tone: {
      default: {},
      muted: {
        backgroundColor: "surfaceMuted",
      },
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

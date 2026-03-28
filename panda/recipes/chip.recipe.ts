import { defineRecipe } from "@pandacss/dev";

export const chipRecipe = defineRecipe({
  className: "chip",
  description: "フィルター用チップ。active で選択状態を切り替える。",
  base: {
    borderWidth: "1px",
    borderColor: "border",
    borderRadius: "pill",
    paddingInline: "4",
    paddingBlock: "2",
    backgroundColor: "white",
    color: "textMuted",
    fontSize: "sm",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
  },
  variants: {
    active: {
      true: {
        borderColor: "accent",
        backgroundColor: "accentSoft",
        color: "accent",
      },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
  },
});

import { defineRecipe } from "@pandacss/dev";

export const buttonRecipe = defineRecipe({
  className: "button",
  description: "共通ボタン。visual と size のバリアントで使い分ける。",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
    borderWidth: "1px",
    borderColor: "transparent",
    borderRadius: "control",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background-color 0.2s, color 0.2s, border-color 0.2s, opacity 0.2s",
  },
  variants: {
    visual: {
      accent: {
        backgroundColor: "accent",
        borderColor: "accent",
        color: "white",
      },
      ghostDanger: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        color: "danger",
      },
    },
    size: {
      md: {
        paddingInline: "5",
        paddingBlock: "3",
      },
      sm: {
        paddingInline: "3",
        paddingBlock: "2",
        fontSize: "sm",
      },
    },
  },
  defaultVariants: {
    visual: "accent",
    size: "md",
  },
});

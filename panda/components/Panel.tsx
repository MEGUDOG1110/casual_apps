import type { ComponentPropsWithoutRef } from "react";
import type { RecipeVariantProps } from "../../styled-system/css";
import { panel } from "../../styled-system/recipes";

type PanelVariants = NonNullable<RecipeVariantProps<typeof panel>>;

type PanelProps = PanelVariants &
  ComponentPropsWithoutRef<"section"> & {
    as?: "section" | "div" | "article";
  };

export function Panel({ tone, as: Tag = "section", className, ...rest }: PanelProps) {
  return <Tag className={`${panel({ tone })}${className ? ` ${className}` : ""}`} {...rest} />;
}

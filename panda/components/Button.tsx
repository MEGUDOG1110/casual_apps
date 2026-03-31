import type { ComponentPropsWithoutRef } from "react";
import type { RecipeVariantProps } from "../../styled-system/css";
import { button } from "../../styled-system/recipes";

type ButtonVariants = NonNullable<RecipeVariantProps<typeof button>>;

type ButtonProps = ButtonVariants & ComponentPropsWithoutRef<"button">;

export function Button({ visual, size, className, ...rest }: ButtonProps) {
  return (
    <button
      className={`${button({ visual, size })}${className ? ` ${className}` : ""}`}
      {...rest}
    />
  );
}

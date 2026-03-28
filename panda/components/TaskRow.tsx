import type { ComponentPropsWithoutRef } from "react";
import type { RecipeVariantProps } from "../../styled-system/css";
import { taskRow } from "../../styled-system/recipes";

type TaskRowVariants = NonNullable<RecipeVariantProps<typeof taskRow>>;

type TaskRowProps = TaskRowVariants & ComponentPropsWithoutRef<"li">;

export function TaskRow({ done, className, ...rest }: TaskRowProps) {
  return <li className={`${taskRow({ done })}${className ? ` ${className}` : ""}`} {...rest} />;
}

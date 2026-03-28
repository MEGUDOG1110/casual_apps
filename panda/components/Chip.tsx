import type { ComponentPropsWithoutRef } from "react";
import type { RecipeVariantProps } from "../../styled-system/css";
import { chip } from "../../styled-system/recipes";

type ChipVariants = NonNullable<RecipeVariantProps<typeof chip>>;

type ChipProps = ChipVariants & ComponentPropsWithoutRef<"button">;

export function Chip({ active, className, ...rest }: ChipProps) {
  return <button className={`${chip({ active })}${className ? ` ${className}` : ""}`} {...rest} />;
}

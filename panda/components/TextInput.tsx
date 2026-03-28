import type { ComponentPropsWithoutRef } from "react";
import { input } from "../../styled-system/recipes";

type TextInputProps = ComponentPropsWithoutRef<"input">;

export function TextInput({ className, ...rest }: TextInputProps) {
  return <input className={`${input()}${className ? ` ${className}` : ""}`} {...rest} />;
}

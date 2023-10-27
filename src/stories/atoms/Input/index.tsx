import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProperties
  extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: "primary" | "error";
}

const Input = React.forwardRef<HTMLInputElement, InputProperties>(
  ({ className, type, color, ...properties }, reference) => {
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          color === "error" ? "text-destructive" : "text-primary",
        )}
        ref={reference}
        type={type}
        {...properties}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

import React from "react";

import MuiButton, { ButtonProps } from "@mui/material/Button";
// import useMediaQuery from "@mui/material/useMediaQuery";

import { tv } from "tailwind-variants";

const style = tv({
  base: "bg-blue-500 hover:bg-blue-700 rounded text-white text-base w-30",
  variants: {
    size: {
      small: "text-xs w-20",
      medium: "text-base w-30",
      large: "text-lg w-34",
    },
    color: {
      primary: "bg-blue-500 hover:bg-blue-700",
      secondary: "bg-white text-blue-500 hover:bg-blue-500 hover:text-white",
      inherit: "bg-gray-500 hover:bg-gray-700",
      success: "bg-green-500 hover:bg-green-700",
      error: "bg-red-500 hover:bg-red-700",
      info: "bg-blue-500 hover:bg-blue-700",
      warning: "bg-yellow-500 hover:bg-yellow-700",
    },
  },
  defaultVariants: {
    size: "medium",
    color: "primary",
  },
});

export const Button = ({
  size = "medium",
  children,
  color = "primary",
  className,
  ...props
}: ButtonProps) => {
  // const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <MuiButton
      className={`${style({ size, color })} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </MuiButton>
  );
};

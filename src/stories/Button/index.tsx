import React from "react";
import style from "./Button.module.scss";
// import useMediaQuery from "@mui/material/useMediaQuery";
import MuiButton, { ButtonProps } from "@mui/material/Button";
/**
 * Primary UI component for user interaction
 */
export const Button = ({
	size = "medium",
	children,
	...props
}: ButtonProps) => {
	// const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	return (
		<MuiButton
			className={`bg-blue-500 hover:bg-blue-700 rounded text-white ${
				style["storybookButton"]
			} ${
				size === "small"
					? "text-xs w-20"
					: size === "medium"
					? "text-base w-30"
					: "text-lg w-34"
			}`}
			type="button"
			{...props}
		>
			{children}
		</MuiButton>
	);
};

import React from "react";
import style from "./Button.module.scss";
// import useMediaQuery from "@mui/material/useMediaQuery";
import MuiButton from "@mui/material/Button";
interface ButtonProps {
	size?: "Small" | "Medium" | "Large";
	label: string;
	onClick?: () => void;
}
/**
 * Primary UI component for user interaction
 */
export const Button = ({ size = "Medium", label, ...props }: ButtonProps) => {
	// const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	return (
		<MuiButton
			className={`bg-blue-500 hover:bg-blue-700 rounded text-white ${
				style["storybookButton"]
			} ${
				size === "Small"
					? "text-sm w-20"
					: size === "Medium"
					? "text-base w-24"
					: "text-lg w-28"
			}`}
			type="button"
			{...props}
		>
			{label}
		</MuiButton>
	);
};

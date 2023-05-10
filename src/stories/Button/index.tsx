import React from "react";
import style from "./Button.module.scss";
import MuiButton, { ButtonProps } from "@mui/material/Button";
export const Button = ({
	size = "medium",
	children,
	...props
}: ButtonProps) => {
	return (
		<MuiButton
			className={`rounded-md ${style["storybookButton"]} ${
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

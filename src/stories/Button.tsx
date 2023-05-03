import React from "react";
import style from "@/stories/button.module.scss";

interface ButtonProps {
	/**
	 * Is this the principal call to action on the page?
	 */
	primary?: boolean;
	/**
	 * What background color to use
	 */
	backgroundColor?: string;
	/**
	 * How large should the button be?
	 */
	size?: "Small" | "Medium" | "Large";
	/**
	 * Button contents
	 */
	label: string;
	/**
	 * Optional click handler
	 */
	onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
	primary = false,
	size = "Medium",
	backgroundColor,
	label,
	...props
}: ButtonProps) => {
	const mode = primary ? "storybookButtonPrimary" : "storybookButtonSecondary";
	return (
		// <button
		// 	type="button"
		// 	className={["storybook-button", `storybook-button--${size}`, mode].join(
		// 		" ",
		// 	)}
		// 	{...props}
		// >
		<button
			className={`${style.storybookButton} ${style[`storybookButton${size}`]} ${
				style[mode]
			}`}
			type="button"
			{...props}
		>
			{label}
		</button>
	);
};

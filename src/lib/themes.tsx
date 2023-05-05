import { cyan, pink, blueGrey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: cyan["A200"],
		},
		secondary: {
			main: pink["A400"],
		},
	},
});

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: pink["A200"],
		},
		secondary: {
			main: cyan["A400"],
		},
		background: {
			default: blueGrey["800"],
			paper: blueGrey["700"],
		},
	},
});

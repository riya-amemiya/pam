import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "the-new-css-reset/css/reset.css";
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "@/lib/themes";
function myApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<RecoilRoot>
				<ThemeProvider theme={darkTheme}>
					<Component {...pageProps} />
				</ThemeProvider>
			</RecoilRoot>
		</SessionProvider>
	);
}
export default myApp;

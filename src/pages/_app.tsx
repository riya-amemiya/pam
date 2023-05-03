import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "the-new-css-reset/css/reset.css";
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
function myApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<RecoilRoot>
				<Component {...pageProps} />
			</RecoilRoot>
		</SessionProvider>
	);
}
export default myApp;

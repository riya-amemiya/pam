import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilState } from "recoil";
import "the-new-css-reset/css/reset.css";
import "@/styles/globals.scss";
import "animate.css";
import { SessionProvider, useSession } from "next-auth/react";
import { userState } from "@/atom/userState";
import { fetcherGet } from "@/lib/fetcherGet";
import useSWRMutation from "swr/mutation";
import { GetRoleRes } from "types/prismaType";
import { lightTheme, darkTheme } from "@/lib/themes";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const Wrapper = ({ children }: { children: React.ReactNode }) => {
	const { data: session } = useSession();
	const [user, setUser] = useRecoilState(userState);
	const { trigger, data, isMutating } = useSWRMutation<GetRoleRes>(
		"/api/prisma/getRole",
		fetcherGet,
	);

	if (!user && session) {
		trigger();

		if (!isMutating && data) {
			setUser({
				email: session.user.email || "",
				name: session.user.name || "",
				image: session.user.image || "",
				role: data?.message || "USER",
			});
		}
	}

	return <>{children}</>;
};
function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	return (
		<SessionProvider session={session}>
			<RecoilRoot>
				<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
					<Wrapper>
						<Component {...pageProps} />
					</Wrapper>
				</ThemeProvider>
			</RecoilRoot>
		</SessionProvider>
	);
}
export default App;

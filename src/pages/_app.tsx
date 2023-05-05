import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilState } from "recoil";
import "the-new-css-reset/css/reset.css";
import "@/styles/globals.scss";
import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "@/lib/themes";
import { userState } from "@/atom/userState";
import { fetcherGet } from "@/lib/fetcherGet";
import useSWRMutation from "swr/mutation";
import { GetRoleRes } from "types/prismaType";
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
function myApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<RecoilRoot>
				<ThemeProvider theme={darkTheme}>
					<Wrapper>
						<Component {...pageProps} />
					</Wrapper>
				</ThemeProvider>
			</RecoilRoot>
		</SessionProvider>
	);
}
export default myApp;

import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilState } from "recoil";
import "the-new-css-reset/css/reset.css";
import "@/styles/globals.scss";
import "animate.css";
import { SessionProvider, useSession } from "next-auth/react";
import { userState } from "@/atom/userState";
import { fetcherGet } from "@/lib/fetcherGet";
import useSWRMutation from "swr/mutation";
import { lightTheme, darkTheme } from "@/lib/themes";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GetUserDataRes } from "types/prisma/getUserDataType";
import { ReactNode } from "react";
const Wrapper = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [user, setUser] = useRecoilState(userState);
  const {
    trigger: getUserData,
    data: userData,
    isMutating,
  } = useSWRMutation<GetUserDataRes>("/api/prisma/getUserData", fetcherGet);
  if (!user && session) {
    getUserData();
    console.log("====================================");
    console.log(userData);
    console.log("====================================");
    if (!isMutating && userData) {
      setUser({
        email: session.user.email || "",
        name: session.user.name || "",
        image: session.user.image || "",
        role: userData?.role?.roleName || "USER",
        sns: {
          GitHub: userData.snsAccount?.GitHub || "",
          Twitter: userData.snsAccount?.Twitter || "",
          Facebook: userData.snsAccount?.Facebook || "",
        },
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

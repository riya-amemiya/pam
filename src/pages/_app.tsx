import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "the-new-css-reset/css/reset.css";
import "@/styles/globals.scss";
import "animate.css";
import { SessionProvider } from "next-auth/react";
import { lightTheme, darkTheme } from "@/lib/themes";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
export default App;

"use client";
import "the-new-css-reset/css/reset.css";
import "@/styles/globals.scss";
import "animate.css";
import { darkTheme, lightTheme } from "@/lib/themes";
import { ThemeProvider } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import Header from "./components/Header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <SessionProvider>
      <RecoilRoot>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <html lang="ja">
            <body>
              <Header />
              <div
                style={{
                  marginTop: "50px",
                }}
              >
                {children}
              </div>
            </body>
          </html>
        </ThemeProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

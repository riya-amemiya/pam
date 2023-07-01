"use client";
import { darkTheme, lightTheme } from "@/lib/themes";
import { ThemeProvider } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

export const ClientProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) => {
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          {children}
        </ThemeProvider>
      </RecoilRoot>
    </SessionProvider>
  );
};

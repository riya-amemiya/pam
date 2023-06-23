"use client";

import { darkTheme, lightTheme } from "@/lib/themes";
import { ThemeProvider } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

export const ClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <SessionProvider>
      <RecoilRoot>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          {children}
        </ThemeProvider>
      </RecoilRoot>
    </SessionProvider>
  );
};

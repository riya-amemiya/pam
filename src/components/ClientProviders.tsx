"use client";
import { darkTheme, lightTheme } from "@/lib/themes";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { RecoilRoot } from "recoil";

export const ClientProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <RecoilRoot>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <div className="font-sans" id="__next">
          {children}
        </div>
      </ThemeProvider>
    </RecoilRoot>
  );
};

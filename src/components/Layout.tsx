import { ReactNode } from "react";
import { Loading } from "$/loading";
import { Box } from "@kuma-ui/core";

const Layout = ({
  children,
  looding,
  className,
}: {
  children: ReactNode;
  looding?: boolean;
  className?: string;
}) => {
  return (
    <Box height="100%" width="100%">
      <Box className={`${looding ? "hidden" : ""}`} height="100%" width="100%">
        <Box
          as="main"
          className={`${className || ""}`}
          height="100%"
          width="100%"
        >
          {children}
        </Box>
      </Box>
      <Box className={`${looding ? "" : "hidden"}`} height="100%" width="100%">
        <Loading />
      </Box>
    </Box>
  );
};

export default Layout;

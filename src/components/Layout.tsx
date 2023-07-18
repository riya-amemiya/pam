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
      <Box height="100%" width="100%" className={`${looding ? "hidden" : ""}`}>
        <Box
          as="main"
          height="100%"
          width="100%"
          className={`${className || ""}`}
        >
          {children}
        </Box>
      </Box>
      <Box height="100%" width="100%" className={`${looding ? "" : "hidden"}`}>
        <Loading />
      </Box>
    </Box>
  );
};

export default Layout;

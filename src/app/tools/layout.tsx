import { Box, Flex } from "@kuma-ui/core";
import dynamic from "next/dynamic";

import { getMetadata } from "@/utils/getMetadata";

const SidebarMenu = dynamic(() => import("@/components/SidebarMenu"), {
  ssr: false,
});

export const metadata = getMetadata({
  title: "Tools",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex>
      <Box width="20%">
        <SidebarMenu />
      </Box>
      <Box width="80%">{children}</Box>
    </Flex>
  );
}

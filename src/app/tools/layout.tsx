// import SidebarMenu from "@/components/SidebarMenu";
import dynamic from "next/dynamic";
const SidebarMenu = dynamic(() => import("@/components/SidebarMenu"), {
  ssr: false,
});
import { getMetadata } from "@/utils/getMetadata";
import { Box, Flex } from "@kuma-ui/core";

export const metadata = getMetadata({
  title: "Tools",
});

export default async function RootLayout({
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

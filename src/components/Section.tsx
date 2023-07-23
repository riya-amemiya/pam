import { Box } from "@kuma-ui/core";

export const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box as="section" mb="1rem">
        {children}
      </Box>
    </>
  );
};

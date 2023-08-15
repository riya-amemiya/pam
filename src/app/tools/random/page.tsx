import { Box } from "@kuma-ui/core";

import ToolsRandomClient from "./client";

export default async function ToolsRandom() {
  return (
    <Box mt="8px">
      <h1>Random</h1>
      <ToolsRandomClient />
    </Box>
  );
}

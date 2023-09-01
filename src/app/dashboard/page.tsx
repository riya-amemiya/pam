import { Box } from "@kuma-ui/core";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { getMetadata } from "@/utils/getMetadata";
import { Database } from "types/supabase";

import { getUserDataService } from "../api/db/service/getUserData.service";

import { DashboardClient } from "./client";
export const metadata = getMetadata({
  title: "Dashboard",
});

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userData = await getUserDataService(supabase);

  return (
    <Box display="flex" justify="center">
      <DashboardClient
        data={{
          user: {
            EDEN_AI_API_KEY: userData.user?.EDEN_AI_API_KEY,
            GitHub: userData.user?.GitHub,
            OPENAI_API_KEY: userData.user?.OPENAI_API_KEY,
            avatar_url: user?.user_metadata.avatar_url,
            name: user?.user_metadata.full_name,
            id: user?.id as string,
          },
        }}
      />
    </Box>
  );
}

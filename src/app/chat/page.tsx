import Layout from "@/components/Layout";
import { getMetadata } from "@/utils/getMetadata";
import ChatClient from "./client";
import { cookies } from "next/headers";
import { getUserDataService } from "%/api/db/service/getUserData.service";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
export const metadata = getMetadata({
  title: "Chat",
});
export const fetchCache = "only-no-store";
export default async function Chat() {
  const supabase = createServerComponentClient({ cookies });
  const userData = await getUserDataService(supabase);
  return (
    <Layout>
      {userData.user.OPENAI_API_KEY && (
        <ChatClient
          EDEN_AI_API_KEY={
            userData.user.EDEN_AI_API_KEY &&
            decodeURIComponent(atob(userData.user.EDEN_AI_API_KEY))
          }
          OPENAI_API_KEY={decodeURIComponent(
            atob(userData.user.OPENAI_API_KEY),
          )}
        />
      )}
    </Layout>
  );
}

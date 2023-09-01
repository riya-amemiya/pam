import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { getUserDataService } from "@/app/api/db/service/getUserData.service";
import { getMetadata } from "@/utils/getMetadata";

import ChatClient from "./client";
export const metadata = getMetadata({
  title: "Chat",
});
export const fetchCache = "only-no-store";
export default async function Chat() {
  const supabase = createServerComponentClient({ cookies });
  const userData = await getUserDataService(supabase);
  return (
    <>
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
    </>
  );
}

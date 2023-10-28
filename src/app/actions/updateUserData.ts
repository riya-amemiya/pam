"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { updateUserDataService } from "@/app/api/db/service/updateUserData.service";
import { Database } from "types/supabase";
export const updateUserData = async (data: {
  id: string;
  GitHub?: string | undefined;
  OPENAI_API_KEY?: string | undefined;
  EDEN_AI_API_KEY?: string | undefined;
}) => {
  const supabase = createServerActionClient<Database>({ cookies });
  return await updateUserDataService(supabase, {
    ...data,
  });
};

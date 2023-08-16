"use server";
import { updateUserDataService } from "@/app/api/db/service/updateUserData.service";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "types/supabase";
import { cookies } from "next/headers";
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

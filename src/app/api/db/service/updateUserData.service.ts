import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "types/supabase";

export const updateUserDataService = async (
  supabase: SupabaseClient<Database>,
  data: {
    id: string;
    GitHub?: string;
    OPENAI_API_KEY?: string;
    EDEN_AI_API_KEY?: string;
  },
) => {
  const { error } = await supabase.from("UserData").upsert({
    ...data,
  });
  if (error) {
    return false;
  }
  return true;
};

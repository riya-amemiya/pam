import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "types/supabase";
export const getUserDataService = async (
  supabase: SupabaseClient<Database>,
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: {
        EDEN_AI_API_KEY: null,
        GitHub: null,
        OPENAI_API_KEY: null,
      },
    };
  }
  const { data: userData } = await supabase
    .from("UserData")
    .select()
    .eq("id", user?.id as string);
  if (!userData) {
    return {
      user: {
        EDEN_AI_API_KEY: null,
        GitHub: null,
        OPENAI_API_KEY: null,
      },
    };
  }
  return {
    user: {
      EDEN_AI_API_KEY: userData[0]?.EDEN_AI_API_KEY || null,
      GitHub: userData[0]?.GitHub || null,
      OPENAI_API_KEY: userData[0]?.OPENAI_API_KEY || null,
    },
  };
};

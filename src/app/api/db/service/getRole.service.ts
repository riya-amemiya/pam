import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "types/supabase";

export const getRoleService = async (supabase: SupabaseClient<Database>) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("UserRoleRelation")
    .select("role_id, Roles(role_name)")
    .eq("id", user?.id as string);
  return data;
};

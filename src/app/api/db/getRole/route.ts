import { getRoleService } from "%/api/db/service/getRole.service";
import { NextResponse } from "next/server";
import { GetRoleRes } from "types/db";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "types/supabase";
export const dynamic = "force-dynamic";
export async function GET() {
  let returnData: GetRoleRes = { statusCode: 401, role: null };
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const role = await getRoleService(supabase);
  returnData = { statusCode: 200, role };
  return NextResponse.json(returnData);
}

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getUserDataService } from "@/app/api/db/service/getUserData.service";
import { GetUserDataRes } from "types/db/getUserDataType";
import { Database } from "types/supabase";
export const dynamic = "force-dynamic";
export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const returnData: GetUserDataRes = {
    ...(await getUserDataService(supabase)),
    statusCode: 200,
  };
  return NextResponse.json(returnData);
}

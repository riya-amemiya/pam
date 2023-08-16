import { getUserDataService } from "@/app/api/db/service/getUserData.service";
import { NextResponse } from "next/server";
import { GetUserDataRes } from "types/db/getUserDataType";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
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

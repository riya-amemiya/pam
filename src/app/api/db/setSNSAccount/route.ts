import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { setSNSAccountService } from "%/api/db/service/setSNSAccount.service";
import type { SetSNSAccountReq, SetSNSAccountRes } from "types/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data: SetSNSAccountReq = await req.json();
  const session = await getServerSession(authOptions);
  let returnData: SetSNSAccountRes = { statusCode: 401 };
  if (session) {
    await setSNSAccountService(session, data);
    returnData = { statusCode: 200 };
  }
  return NextResponse.json(returnData);
}

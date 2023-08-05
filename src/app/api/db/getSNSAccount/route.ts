import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSNSAccountService } from "%/api/db/service/getSNSAccount.service";
import { GetSNSAccountRes } from "types/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  let returnData: GetSNSAccountRes = {
    statusCode: 401,
    snsAccount: null,
  };
  if (session) {
    const { GitHub } = await getSNSAccountService(session);
    returnData = {
      statusCode: 200,
      snsAccount: {
        GitHub,
        Facebook: null,
        Twitter: null,
      },
    };
  }
  return NextResponse.json(returnData);
}

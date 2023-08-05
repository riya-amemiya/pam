import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserDataService } from "%/api/db/service/getUserData.service";
import { GetUserDataRes } from "types/prisma/getUserDataType";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  let returnData: GetUserDataRes = {
    statusCode: 401,
    user: null,
  };
  if (session) {
    returnData = {
      ...(await getUserDataService(session)),
      statusCode: 200,
    };
  }
  return NextResponse.json(returnData);
}

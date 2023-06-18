import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserDataService } from "../service/getUserData.service";
import { GetUserDataRes } from "types/prisma/getUserDataType";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session) {
    const data: GetUserDataRes = {
      ...(await getUserDataService(session)),
      statusCode: 200,
    };
    return NextResponse.json(data);
  }
  return NextResponse.json({ status: 401 });
}

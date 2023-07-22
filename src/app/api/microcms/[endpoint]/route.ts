import { microcmsClient } from "@/lib/microcmsClient";
import { microcmsCardsType } from "@/test/microcmsCardsType";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  _: Request,
  { params }: { params: { endpoint: string } },
) {
  const endpoint = params.endpoint;
  const data: microcmsCardsType = await microcmsClient.get({
    endpoint,
  });
  return NextResponse.json(data);
}

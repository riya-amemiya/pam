import { NextResponse } from "next/server";

import { deepl } from "./deepl";

export async function POST(request: Request) {
  const apiKey = request.headers.get("authorization");
  if (!apiKey) {
    return NextResponse.next();
  }
  const {
    text,
    target_language = "en",
    source_language = null,
  }: {
    apiKey: string;
    text: string;
    target_language?: string;
    source_language?: string | null;
  } = await request.json();
  const response = await deepl({
    apiKey: apiKey,
    text,
    target_language,
    source_language,
  });
  return NextResponse.json(response);
}

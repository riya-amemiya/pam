import { NextResponse } from "next/server";

import { deepl } from "./deepl";

export async function POST(req: Request) {
  const apiKey = req.headers.get("authorization");
  if (!apiKey) {
    return new Error("No API key provided");
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
  } = await req.json();
  const res = await deepl({
    apiKey: apiKey,
    text,
    target_language,
    source_language,
  });
  return NextResponse.json(res);
}

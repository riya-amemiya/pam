import api from "api";

const sdk = api("@eden-ai/v2.0#g16kqv31lki5xzg9");

export const deepl = async ({
  apiKey,
  text,
  target_language = "en",
  source_language = null,
}: {
  apiKey: string;
  text: string;
  target_language?: string;
  source_language?: string | null;
}): Promise<{
  status: "sucess" | "fail";
  text: string;
}> => {
  sdk.auth(apiKey);

  const response = await sdk.translation_automatic_translation_create({
    providers: "deepl",
    text,
    target_language,
    source_language,
  });
  return response.data.deepl;
};

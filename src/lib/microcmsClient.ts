import { createClient } from "microcms-js-sdk";

export const microcmsClient = createClient({
  serviceDomain: "pam",
  apiKey: process.env.MICROCMS_API_KEY as string,
});

export async function getMicrocms<T>(
  endpoint: string,
  queries?: {
    orders?:
      | "-createdAt"
      | "-updatedAt"
      | "createdAt"
      | "updatedAt"
      | "-id"
      | "id";
    q?: string;
    limit?: number;
    offset?: number;
    fields?: string;
    ids?: string;
  },
): Promise<T> {
  const data = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/api/microcms/${endpoint}`,
    {
      method: "POST",
      body: JSON.stringify({ queries }),
    },
  );
  return await data.json();
}

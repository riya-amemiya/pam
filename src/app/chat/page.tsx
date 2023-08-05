import Layout from "@/components/Layout";
import { getMetadata } from "@/utils/getMetadata";
import ChatClient from "./client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "%/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { kysely } from "@/kysely";
import { User } from "@prisma/client";
export const metadata = getMetadata({
  title: "Chat",
});
export const fetchCache = "only-no-store";
export default async function Chat() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user = (
    await kysely
      .selectFrom("User")
      .where("email", "=", session.user?.email as string)
      .selectAll()
      .limit(1)
      .execute()
  )[0] as User;
  return (
    <Layout>
      {user.OPENAI_API_KEY && (
        <ChatClient
          EDEN_AI_API_KEY={
            user.EDEN_AI_API_KEY &&
            decodeURIComponent(atob(user.EDEN_AI_API_KEY))
          }
          OPENAI_API_KEY={decodeURIComponent(atob(user.OPENAI_API_KEY))}
        />
      )}
    </Layout>
  );
}

import Layout from "@/components/Layout";
import { getMetadata } from "@/utils/getMetadata";
import ChatClient from "./client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "%/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
export const metadata = getMetadata({
  title: "Chat",
});
export const fetchCache = "only-no-store";
export default async function Chat() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: session.user?.email,
    },
  });
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

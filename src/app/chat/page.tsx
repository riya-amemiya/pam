import Layout from "@/components/Layout";
import { generateMetadata } from "@/utils/generateMetadata";
import ChatClient from "./client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "%/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
export const metadata = generateMetadata({
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
        <ChatClient apiKey={decodeURIComponent(atob(user.OPENAI_API_KEY))} />
      )}
    </Layout>
  );
}

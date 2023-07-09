import Layout from "@/components/Layout";
import { generateMetadata } from "@/utils/generateMetadata";
import ChatClient from "./client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "%/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
export const metadata = generateMetadata({
  title: "Chat",
});
export default async function Chat() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <Layout>
      <ChatClient />
    </Layout>
  );
}

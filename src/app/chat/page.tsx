import Layout from "@/components/Layout";
import { generateMetadata } from "@/utils/generateMetadata";
import ChatClient from "./client";
export const metadata = generateMetadata({
  title: "Chat",
});
export default function Chat() {
  return (
    <Layout>
      <ChatClient />
    </Layout>
  );
}

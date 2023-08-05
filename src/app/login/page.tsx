import { getProviders } from "next-auth/react";
import { LoginClient } from "./client";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "%/api/auth/[...nextauth]/route";
import { getMetadata } from "@/utils/getMetadata";
export const metadata = getMetadata({
  title: "Login",
});
export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  const providers = await getProviders();
  if (!providers) {
    notFound();
  }
  return <LoginClient providers={providers} />;
}

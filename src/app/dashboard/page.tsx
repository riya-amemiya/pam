import Layout from "@/components/Layout";
import { GetUserDataRes } from "types/prisma/getUserDataType";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { DashboardClient } from "./client";
import { generateMetadata } from "@/utils/generateMetadata";
import { redirect } from "next/navigation";

export const metadata = generateMetadata({
  title: "Dashboard",
});

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  let userData: GetUserDataRes = {
    statusCode: 401,
    user: null,
  };
  if (session) {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email: session.user?.email,
      },
      include: {
        Post: true,
        UserRelationRole: true,
      },
    });
    userData = {
      ...{
        user: {
          ...user,
          role: user.UserRelationRole,
          post: user.Post,
        },
      },
      statusCode: 200,
    };
  } else {
    redirect("/login");
  }
  return (
    <Layout>
      <div className="flex justify-center">
        <DashboardClient data={userData} />
      </div>
    </Layout>
  );
}

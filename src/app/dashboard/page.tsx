import Layout from "@/components/Layout";
import { GetUserDataRes } from "types/prisma/getUserDataType";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DashboardClient } from "./client";
import { getMetadata } from "@/utils/getMetadata";
import { redirect } from "next/navigation";
import { Box } from "@kuma-ui/core";
import { getUserDataService } from "../api/db/service/getUserData.service";

export const metadata = getMetadata({
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
    userData = {
      ...(await getUserDataService(session)),
      statusCode: 200,
    };
  } else {
    redirect("/login");
  }
  return (
    <Layout>
      <Box display="flex" justify="center">
        <DashboardClient data={userData} />
      </Box>
    </Layout>
  );
}

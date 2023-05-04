import { getServerSession } from "next-auth/next";
import type { GetServerSidePropsContext, NextPage } from "next/types";
import { authOptions } from "./api/auth/[...nextauth]";
import { type Session } from "next-auth";
import Layout from "@/components/Layout";

const Dashboard: NextPage<{ data: { session: Session } }> = ({ data }) => {
	const { session } = data;
	console.log("====================================");
	console.log(session);
	console.log("Hello");
	console.log("====================================");
	return (
		<Layout title="ダッシュボード">
			<h1>Dashboard</h1>
			<p>ようこそ, {session ? session?.user?.email : ""}</p>
		</Layout>
	);
};

export default Dashboard;
export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);
	if (!session) {
		return { redirect: { destination: "/login" } };
	}
	return {
		props: { data: { session } },
	};
}

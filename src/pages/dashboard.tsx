import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { type NextPage } from "next/types";
const Dashboard: NextPage = () => {
	const { data: session } = useSession();
	return (
		<Layout title="ダッシュボード">
			<h1>Dashboard</h1>
			<p>ようこそ, {session ? session?.user?.email : ""}</p>
		</Layout>
	);
};

export default Dashboard;

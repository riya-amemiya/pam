import Layout from "@/components/Layout";
import { GetRoleRes, NewPostReq } from "types/prismaType";
import { useSession } from "next-auth/react";
import { type NextPage } from "next/types";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import Button from "@mui/material/Button";
import { fetcherPost } from "@/lib/fetcherPost";
const Dashboard: NextPage = () => {
	const { data: session } = useSession();
	const { trigger: newPost } = useSWRMutation(
		"/api/prisma/newPost",
		fetcherPost<NewPostReq>,
	);
	const { data: data2 }: { data: GetRoleRes } = useSWR(
		"/api/prisma/getRole",
		(url) => fetch(url).then((res) => res.json()),
	);
	const [count, setCount] = useState(0);
	return (
		<Layout title="ダッシュボード">
			<h1>Dashboard</h1>
			<p>ようこそ, {session ? session?.user?.email : ""}</p>
			<Button
				onClick={() => {
					setCount(count + 1);
					newPost({ title: "Test", content: "Test" });
				}}
				className="text-blue-500"
			>
				newPost
			</Button>
			<p>カウント: {count}</p>
			<p>ロール: {data2?.message}</p>
		</Layout>
	);
};

export default Dashboard;

import Layout from "@/components/Layout";
import { NewPost } from "@/types/prismaType";
import { useSession } from "next-auth/react";
import { type NextPage } from "next/types";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
const Dashboard: NextPage = () => {
	const { data: session } = useSession();
	const { trigger, data } = useSWRMutation(
		"/api/prisma/newPost",
		(
			url,
			{
				arg,
			}: {
				arg: NewPost;
			},
		) =>
			fetch(url, { method: "POST", body: JSON.stringify(arg) }).then((res) =>
				res.json(),
			),
	);
	const { data: data2 } = useSWR("/api/prisma/getRole", (url) =>
		fetch(url).then((res) => res.json()),
	);
	const [count, setCount] = useState(0);
	console.log("====================================");
	console.log(data);
	console.log(data2);
	console.log("====================================");
	return (
		<Layout title="ダッシュボード">
			<h1>Dashboard</h1>
			<p>ようこそ, {session ? session?.user?.email : ""}</p>
			<button
				type="button"
				onClick={() => {
					setCount(count + 1);
					trigger({ title: "Test", content: "Test" });
				}}
			>
				アクション
			</button>
			<p>カウント: {count}</p>
		</Layout>
	);
};

export default Dashboard;

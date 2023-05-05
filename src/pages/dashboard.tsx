import Layout from "@/components/Layout";
import { GetRoleRes, NewPostReq } from "types/prismaType";
import { useSession } from "next-auth/react";
import { type NextPage } from "next/types";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
const Dashboard: NextPage = () => {
	const { data: session } = useSession();
	const { trigger } = useSWRMutation(
		"/api/prisma/newPost",
		(
			url,
			{
				arg,
			}: {
				arg: NewPostReq;
			},
		) =>
			fetch(url, { method: "POST", body: JSON.stringify(arg) }).then((res) =>
				res.json(),
			),
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
			<button
				onClick={() => {
					setCount(count + 1);
					trigger({ title: "Test", content: "Test" });
				}}
				type="button"
			>
				アクション
			</button>
			<p>カウント: {count}</p>
			<p>ロール: {data2?.message}</p>
		</Layout>
	);
};

export default Dashboard;
